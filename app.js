const express = require('express');
const config = require('./config/config');
const app = express();
module.exports = require('./config/express')(app, config);
require("./routes")(app);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

