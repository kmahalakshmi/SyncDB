var config = require("../../config/config");
var path = require("path");
var fs = require("fs");

module.exports = {
  // To upload sql files
  fileToUpload: function (req, res, next) {
    var uploaded_file = req.files.filename;
    var uploaded_filename = uploaded_file.name;
    var dir = path.join(__dirname, '../../data-dump/');
    console.log();
    if (fs.existsSync(path.join(dir + uploaded_filename))) {
      console.log("file exist");
      fs.unlinkSync(path.join(dir + uploaded_filename));
    }
    uploaded_file.mv(path.join(dir + uploaded_filename), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Database" + uploaded_filename + " Uploaded");
        res.redirect("/");
      }
    });
  }
};