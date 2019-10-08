var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/home/", function(req, res) {
    const allUtils = db.Util.findAll({});
    Promise.all([allUtils]).then(responses => {
      res.render("home");
      console.log(responses[0]);
    });
  });

  // AUTH User with GMAIL account
  app.get("/user/:email", (req, res) => {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    }).then(data => {
      // if found user
      if (data) {
        console.log(`~~~~FOUND USER: `, data);
        res.render("home", { email: data });
        console.log("data sent sync");
      }
      // if no user
      else {
        db.User.create({
          email: req.params.email,
          password: "googleAuth"
        }).then(data => {
          console.log(`~~~~CREATERD USER: `, data);
          if (data) {
            res.render("home", {
              email: data
            });
          }
        });
      }
    });
  });
};
