var db = require("../models");

module.exports = function(app) {
  //* Charting data *//
 
  // locating SINGLE user
  app.get("/api/chart", (req, res) => {
    db.Chart.findOne({
      where: {
        UserId: req.param.UserId,
        amount: req.param.amount,
        UtilId: req.param.UtilId,
        dueDate: req.param.dueDate
      }
    }).then(data => {
      // if found user
      if (data) {
        res.sendStatus(200);
      }

      // if no user
      else {
        res.sendStatus(404);
      }
    });
  });

};
