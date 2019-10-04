var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (youtils_db) {
      res.render("index");
    });
  });

  app.get("/home", function (req, res) {
    const allUtils = db.Util.findAll({});
    Promise.all([allUtils]).then(responses => {
      res.render("home");
      console.log(responses[0])
    });

  });




  // Render 404 page for any unmatched routes
  //   app.get("*", function(req, res) {
  //     res.render("404");
  //   });
};