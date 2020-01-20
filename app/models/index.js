const fs = require('fs');
var database = JSON.parse(fs.readFileSync("config/database.json", "utf8"));
const { Client } = require("pg");

// Create connection for both database
var connectionStringDBOne = "postgres://" +
  database["development"]["username"] +
  ":" +
  database["development"]["password"] +
  "@" +
  database["development"]["host"] +
  ":" +
  database["development"]["port"] +
  "/db1";
var connectionStringDBTwo = "postgres://" +
  database["development"]["username"] +
  ":" +
  database["development"]["password"] +
  "@" +
  database["development"]["host"] +
  ":" +
  database["development"]["port"] +
  "/db2";;

const clientOne = new Client({
  connectionString: connectionStringDBOne
});

const clientTwo = new Client({
  connectionString: connectionStringDBTwo
});

clientOne.connect();
clientTwo.connect();

module.exports = {
  clientOne: clientOne,
  clientTwo: clientTwo
}