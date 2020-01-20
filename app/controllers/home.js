var fs = require('fs');
var path = require("path");
const { Client } = require("pg");

// Create connection for both database
var connectionStringDBOne = `postgres://postgres:postgres@localhost:5432/db1`;
var connectionStringDBTwo = `postgres://postgres:postgres@localhost:5432/db2`;

const clientOne = new Client({
  connectionString: connectionStringDBOne
});

const clientTwo = new Client({
  connectionString: connectionStringDBTwo
});

clientOne.connect();
clientTwo.connect();

module.exports = {
  // Landing page
  landingRoute: function (req, res, next) {
    res.render('index', {
      title: 'DreamLabs'
    });
  },

  // To feed data into database
  feedData: function (req, res, next) {
    Promise.all([
      // Check for dblink
      clientOne.query("SELECT * FROM pg_catalog.pg_proc WHERE prosrc ILIKE '%dblink%';", function (err, result) {
        if (result.rows.length > 0) {
          console.log("dblink already exist");
        }
        else {
          console.log("create dblink");
          // Create link between database
          clientOne.query("create extension dblink;", function (err, result) {
            if (err)
              console.log(err);
          });
        }
      }),
      clientTwo.query("SELECT * FROM  pg_catalog.pg_proc WHERE prosrc ILIKE '%dblink%';", function (err, result) {
        if (result.rows.length > 0) {
          console.log("dblink already exist");
        }
        else {
          console.log("create dblink");
          // Create link between database
          clientTwo.query("create extension dblink;", function (err, result) {
            if (err)
              console.log(err);
          });
        }
      })
    ]).then(() => {
      var fileNames = [];
      fs.readdir(path.join(__dirname, '../../data-dump/'), (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
        }
        else {
          fileNames = data;
          fileNames.map(function (filename, index) {
            console.log(filename);
            // Read the uploaded datase dump and insert into the database
            fs.readFile(path.join(__dirname, '../../data-dump/' + filename), function (err, content) {
              if (err) {
                console.log("Error in read sql file", err);
              }
              else {
                var sql = content.toString();
                if (index == 0) {
                  console.log("first");
                  clientOne.query(sql, function (err, result) {
                    if (err) {
                      console.log(err);
                    }
                    else {
                      console.log("Database One data inserted");
                    }
                  });
                }
                else {
                  clientTwo.query(sql, function (err, result) {
                    if (err) {
                      console.log(err);
                    }
                    else {
                      console.log("Database Two data inserted");
                      res.send("Inserted");
                    }
                  });
                }
              }
            });
          });
        }
      });
    })
      .catch(e => {
        console.log(e);
        res.send("Inserted");
      });
  },

  // To compare database
  compareDB: function (req, res, next) {
    console.log("Compare Data of two different database");
    global.tables = {}, global.resultTable = {}, global.dbOneModifiedData = {}, global.dbTwoModifiedData = {}, global.completed = 0;;
    Promise.all([
      clientOne.query("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN('pg_catalog', 'information_schema'); ", function (err, result) {
        if (err)
          console.log(err);
      }),
      clientOne.query("select table_name,column_name,data_type from information_schema.columns where table_schema not in ('information_schema', 'pg_catalog');", function (err, result) {
        if (err)
          console.log(err);
      })
    ]).then((schemaData) => {
      var tableNames = schemaData[0].rows;
      var columnNames = schemaData[1].rows;
      var columns = [], datatypes = [], tableOne, tableTwo, dbOneInsertedData = [], dbTwoInsertedData = [];
      tableNames.map(function (eachField) {
        columnNames.map(function (eachColumn) {
          if (eachField.table_name == eachColumn.table_name) {
            columns.push(eachColumn.column_name);
            datatypes.push(eachColumn.data_type);
          }
        });
        tables[eachField.table_name] = columns;
        tables[eachField.table_name].push(datatypes);
        columns = [];
        datatypes = [];
      });

      Object.keys(tables).map(function (eachTable) {
        var datatypes = tables[eachTable].pop();
        var secondDBCols = tables[eachTable].map(col => "secondDB" + col);
        var columnwithtype = secondDBCols.map((col, ind) => col + " " + datatypes[ind]);
        var firstDBCol = tables[eachTable].join();

        tableComparison(eachTable, firstDBCol, columnwithtype, function (result) {
          resultTable[eachTable] = result;
          if (completed == (Object.keys(tables).length - 1)) {
            console.log("Final Results", resultTable);
            res.send({
              resultTable: resultTable
            });
          }
          else {
            completed++;
          }
        });
      });


      function tableComparison(tableName, columns, coltypes, callback) {
        Promise.all([
          // To get schema
          clientOne.query("SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '" + tableName + "' ", function (err, result) {
            if (err) {
              console.log(err);
            }
          }),
          clientTwo.query("SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '" + tableName + "' ", function (err, result) {
            if (err) {
              console.log(err);
            }
          })
        ]).then((dataSchema) => {
          var tableOneSchema = dataSchema[0].rows;
          var tabletwoSchema = dataSchema[1].rows;

          function arrayCompare(otherArray) {
            return function (current) {
              return otherArray.filter(function (other) {
                return other.column_name == current.column_name && other.data_type == current.data_type
              }).length == 0;
            }
          }
          tableOne = tableOneSchema.filter(arrayCompare(tabletwoSchema));
          tableTwo = tabletwoSchema.filter(arrayCompare(tableOneSchema));

          if (tableOne.length > 0 || tableTwo.length > 0) {
            console.log("Schema Changes in Table " + tableName + " from Database One", JSON.stringify(tableOne));
            console.log("Schema Changes in Table " + tableName + " from Database Two", JSON.stringify(tableTwo));
            callback({
              tableOne: JSON.stringify(tableOne),
              tableTwo: JSON.stringify(tableTwo)
            });
          }
          else {
            // Execute only when there schema matches
            var query1 = "SELECT * FROM " + tableName + " tb1 LEFT JOIN(SELECT * FROM  dblink('dbname=db2', 'SELECT " + columns + " FROM " + tableName + "' ) AS tb2(" + coltypes + ")) AS tb2 ON tb2.secondDBid = tb1.id WHERE tb2.secondDBid IS NULL;";
            var query2 = "SELECT * FROM " + tableName + " tb1 LEFT JOIN(SELECT * FROM  dblink('dbname=db1', 'SELECT " + columns + " FROM " + tableName + "') AS tb2(" + coltypes + ")) AS tb2 ON tb2.secondDBid = tb1.id WHERE tb2.secondDBid IS NULL;";
            var query3 = "SELECT * FROM " + tableName + " tb1 INNER JOIN(SELECT * FROM dblink('dbname=db2', 'SELECT " + columns + " FROM " + tableName + "') AS tb2(" + coltypes + ")) AS tb2 ON tb2.secondDBid = tb1.id";
            Promise.all([
              // Query to get new values in database one
              clientOne.query(query1, function (err, result) {
                if (err) {
                  console.log(err);
                }
              }),
              // Query to get new values in database two
              clientTwo.query(query2, function (err, result) {
                if (err) {
                  console.log(err);
                }
              }),
              // Query to get common data in both table
              clientOne.query(query3, function (err, result) {
                if (err) {
                  console.log(err);
                }
              })
            ]).then((insertedData) => {
              var dbCommonData, dbOnemodifiedField = [], dbTwomodifiedField = [];
              if (insertedData[0].rows != "") {
                dbOneInsertedData = insertedData[0].rows;
                console.log("New rows of the table " + tableName + " from Database one", JSON.stringify(dbOneInsertedData));
              }
              if (insertedData[1].rows != "") {
                dbTwoInsertedData = insertedData[1].rows;
                console.log("New rows of the table " + tableName + " from Database Two", JSON.stringify(dbTwoInsertedData));
              }
              if (insertedData[2].rows != "") {
                dbCommonData = insertedData[2].rows;
                var columnNames = Object.keys(dbCommonData[0]);
                var count = Math.floor(columnNames.length / 2);
                var columnNamesFirstHalf = columnNames.slice(0, count);
                var columnNamesSecondHalf = columnNames.slice(count, columnNames.length);
                dbCommonData.map(function (eachData, dataindex) {
                  if (eachData.id == eachData.seconddbid) {
                    columnNamesFirstHalf.map(function (eachColumn, index) {
                      // checking each column
                      if (eachData[columnNamesFirstHalf[index]] != eachData[columnNamesSecondHalf[index]]) {
                        dbOnemodifiedField.push(eachData[columnNamesFirstHalf[index]]);
                        dbTwomodifiedField.push(eachData[columnNamesSecondHalf[index]]);
                      }
                    });
                    if (dbOnemodifiedField.length > 0) {
                      dbOneModifiedData[eachData.id] = dbOnemodifiedField;
                    }
                    if (dbTwomodifiedField.length > 0) {
                      dbTwoModifiedData[eachData.id] = dbTwomodifiedField;
                    }

                    dbOnemodifiedField = [];
                    dbTwomodifiedField = [];
                  }
                });
                console.log("Modified Data in the table " + tableName + " from Database one", JSON.stringify(dbOneModifiedData));
                console.log("Modified Data in the table " + tableName + " from Database Two", JSON.stringify(dbTwoModifiedData));
                callback({
                  dbOneInsertedData: JSON.stringify(dbOneInsertedData),
                  dbTwoInsertedData: JSON.stringify(dbTwoInsertedData),
                  dbOneModifiedData: JSON.stringify(dbOneModifiedData),
                  dbTwoModifiedData: JSON.stringify(dbTwoModifiedData)
                });
              }
            })
              .catch(e => {
                console.log(e);
              });
          }
        })
          .catch(e => {
            console.log(e);
          });
      }
    })
      .catch(e => {
        console.log(e);
        res.send(e);
      });
  }
};

