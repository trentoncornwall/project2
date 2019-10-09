var db = require("../models");

module.exports = function(app) {

 
    app.get("/api/total/user", (req, res) => {
        db.Bill.sum("amount").then(data => {

            console.log(`get request for total: ${data}`);
            res.json(data);
        })
            
    });




};








