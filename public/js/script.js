function feedData() {
  $.ajax({
    url: '/feedData',
    type: 'POST',
    success: function (data, status) {
      console.log("Success message", data);
    },
    error: function (status, msg) {
      console.log("Error message", msg, status);
    }
  });
}

function compareDB() {
  $.ajax({
    url: '/compareDB',
    type: 'POST',
    success: function (data, status) {
      // console.log("Success message", data);
      var finalResults = data.resultTable;

      Object.keys(finalResults).map(function (eachdb) {
        $('.modal-body #results').append('<h3 class="' + eachdb + '"> Tablename : ' + eachdb + '</h3>');
        if (Object.keys(finalResults[eachdb]).length == 2) {
          $('.modal-body #results').append('<h5> Schema Changes of both Database as follow </h5>');
          Object.keys(finalResults[eachdb]).map(function (eachtable) {
            var tabledata = JSON.parse(finalResults[eachdb][eachtable]);
            if (tabledata.length > 0) {
              $('.modal-body #results').append('<br>');
              $('.modal-body #results').append('<tr><th> Column Name </th><th> Data type </th> </tr>');
              tabledata.map(function (eachrow) {
                $('.modal-body #results').append('<tr><td> ' + eachrow.column_name + ' </td><td> ' + eachrow.data_type + ' </td> </tr>');
              });
            }
          })
        }
        else if (Object.keys(finalResults[eachdb]).length == 4) {
          $('.modal-body #results').append('<h5> Data Changes of both Database as follow </h5>');
          console.log(finalResults[eachdb]);

          if (finalResults[eachdb].dbOneInsertedData != "[]") {
            $('.modal-body #results').append('<h6> Newly inserted data from Database One </h6>');
            var tableres = JSON.parse(finalResults[eachdb].dbOneInsertedData);
            var columnNames = Object.keys(tableres[0]);
            var count = Math.floor(columnNames.length / 2);
            var columnNamesFirstHalf = columnNames.slice(0, count);
            var columnNamesSecondHalf = columnNames.slice(count, columnNames.length);
            console.log(Object.keys(tableres[0]))
            $('.modal-body #results').append('<tr>');
            columnNamesFirstHalf.map(function (cols) {
              $('.modal-body #results').append('<th> ' + cols + '</th></tr>');
            });
            tableres.map(function (eachrow) {
              $('.modal-body #results').append('<tr>');
              columnNamesFirstHalf.map(function (cols) {
                $('.modal-body #results').append('<td> ' + eachrow[cols] + '</td></tr>');
              });
            })
          }

          if (finalResults[eachdb].dbTwoInsertedData != "[]") {
            $('.modal-body #results').append('<h6> Newly inserted data from Database Two </h6>');
            var tableres = JSON.parse(finalResults[eachdb].dbTwoInsertedData);
            var columnNames = Object.keys(tableres[0]);
            var count = Math.floor(columnNames.length / 2);
            var columnNamesFirstHalf = columnNames.slice(0, count);
            var columnNamesSecondHalf = columnNames.slice(count, columnNames.length);
            $('.modal-body #results').append('<tr>');
            columnNamesFirstHalf.map(function (cols) {
              $('.modal-body #results').append('<th> ' + cols + '</th></tr>');
            });
            tableres.map(function (eachrow) {
              $('.modal-body #results').append('<tr>');
              columnNamesFirstHalf.map(function (cols) {
                $('.modal-body #results').append('<td> ' + eachrow[cols] + '</td></tr>');
              });
            });
          }

          if (finalResults[eachdb].dbOneModifiedData != "[]") {
            $('.modal-body #results').append('<h6> Modified data from Database One </h6>');
            var tableres = JSON.parse(finalResults[eachdb].dbOneModifiedData);
            Object.keys(tableres).map(function (eachrow) {
              $('.modal-body #results').append('<tr>');
              Object.keys(tableres[eachrow].map(function (eachcol, index) {
                $('.modal-body #results').append('<td> ' + tableres[eachrow][index] + '</td></tr>');
              }));
            });

          }

          if (finalResults[eachdb].dbTwoModifiedData != "[]") {
            $('.modal-body #results').append('<h6> Modified data from Database Two </h6>');
            var tableres = JSON.parse(finalResults[eachdb].dbTwoModifiedData);
            Object.keys(tableres).map(function (eachrow) {
              $('.modal-body #results').append('<tr>');
              Object.keys(tableres[eachrow].map(function (eachcol, index) {
                $('.modal-body #results').append('<td> ' + tableres[eachrow][index] + '</td></tr>');
              }));
            });
          }

        }
      });
      $('#result-model').modal('show');
    },
    error: function (status, msg) {
      console.log("Error message", msg, status);
    }
  });
}


