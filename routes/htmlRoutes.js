var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (youtils_db) {
      res.render("index");
    });
  });

  app.get("/home/", function (req, res) {
    const allUtils = db.Util.findAll({});
    Promise.all([allUtils]).then(responses => {
      res.render("home");
      console.log(responses[0])
    });

  });

  app.get("/user/:email", (req, res) => {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    }).then(data => {
      // if found user
      if (data) {
        res.render("home", {
          email: req.params.email
        });
      }
      // if no user
      else {
        db.User.create({
          email: req.body.email,
          password: req.body.password
        }).then(data => {
          if (data) {
            res.render("home", {
              email: req.params.email
            });
          }
        });
      }
    });
  });



  // Render 404 page for any unmatched routes
  //   app.get("*", function(req, res) {
  //     res.render("404");
  //   });
};