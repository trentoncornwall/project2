var db = require("../models");

module.exports = function(app) {
  // Get all
  app.get("/api/utils", function(req, res) {
    db.Util.findAll({}).then(function(data) {
      console.log(data);
      res.json(data);
    });
  });
};
