var db = require("../models");

module.exports = function(app) {
  // Get all
  app.get("/api/utils", function(req, res) {
    db.utilities.findAll({}).then(function(utils_db) {
      res.json(utils_db);
    });
  });
};
