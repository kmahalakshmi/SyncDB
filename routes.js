var controllers = require("./app/controllers/");

module.exports = function (app) {

  app.get("/", controllers.home.landingRoute);
  app.post("/feedData", controllers.home.feedData);
  app.post("/compareDB", controllers.home.compareDB);
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