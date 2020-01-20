var controllers = require("./app/controllers/");

module.exports = function (app) {
  // Landing page
  app.get("/", controllers.home.landingRoute);

  // To insert data
  app.post("/feedData", controllers.home.feedData);

  // To compare data
  app.post("/compareDB", controllers.home.compareDB);

  // To upload database dump
  app.post('/upload', controllers.fileUpload.fileToUpload);

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {},
      title: "error"
    });
  });
}