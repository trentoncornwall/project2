var db = require("../models");

module.exports = function (app) {
	//* USER SERVICES *//
	//*****************/

	// creating user
	app.post("/api/user", (req, res) => {
		console.log(`post request!: ${req.body}`);
		db.User.create({
			email: req.body.email,
			password: req.body.password
		}).then(data => {
			if (data) {
				res.sendStatus("200");
			}
		});
	});

	// locating SINGLE user
	// app.get("/api/user/:email", (req, res) => {
	//   db.User.findOne({
	//     where: {
	//       email: req.params.email
	//     }
	//   }).then(data => {
	//     // if found user
	//     if (data) {
	//       res.render('home', {
	//         email: req.params.email
	//       });
	//     }
	//     // if no user
	//     else {
	//       db.User.create({
	//         email: req.body.email,
	//         password: req.body.password
	//       }).then(data => {
	//         if (data) {
	//           res.redirect(200);
	//         }
	//       });
	//     }
	//   });
	// });

	// get ALL users for troubleshooting RETURNS AN ARRAY with objects inside
	app.get("/api/user/all", (req, res) => {
		db.User.findAll({}).then(data => {
			if (data) {
				res.json(data);
			} else {
				res.sendStatus(404);
			}
		});
	});

	//* UTILS SERVICES *//
	//*****************/

	// retrieving all Utilites
	app.get("/api/utils/all", (req, res) => {
		db.Util.findAll({}).then(data => {
			if (data) {
				console.log(data);
				res.json(data);
			} else {
				res.sendStatus(400);
			}
		});
	});

	// retreiving one utility
	app.get("/api/utils/:utility", (req, res) => {
		let utility = req.params.utility;
		db.Util.findOne({
			where: {
				name: utility
			}
		}).then(data => {
			if (data) {
				console.log(`get request for ${utility}: ${data}`);
				res.json(data);
			} else {
				res.sendStatus(404);
			}
		});
	});

	// Creating a Utility, !!NOT customer facing!!, need a hook to create these
	// When creating a new Utility send a POST request JSON body in the format below, type, name, url logo
	// {
	// 	"type": "Electric",
	// 	"name": "Xcel Energy",
	// 	"url": "https://www.xcelenergy.com/billing_and_payment",
	// 	"logo": "https://www.xcelenergy.com/staticfiles/xe-responsive/assets/images/logo.png"
	// }

	app.post("/api/utils/", (req, res) => {
		db.Util.create({
			type: req.body.type,
			name: req.body.name,
			url: req.body.url,
			logo: req.body.logo
		}).then(err => {
			if (err) {
				res.sendStatus(400);
				throw err;
			} else {
				res.sendStatus(201);
			}
		});
	});

	//* BILLS SERVICES *//
	//*****************/

	// creating a new bill
	app.post("/api/bill/", (req, res) => {
		console.log(req.body);
		db.Bill.create({
			UserId: req.body.UserId,
			UtilId: req.body.UtilId,
			amount: req.body.amount,
			dueDate: req.body.dueDate
		}).then(data => {
			res.sendStatus(201);
		});
	});

	// getting all bills for user
	app.get("/api/bill/:userID", (req, res) => {
		const user_id = req.params.userID;
		db.Bill.findAll({
			where: {
				UserId: user_id
			}
		}).then(data => {
			res.json(data);
		});
	});

	app.post("/api/load/bills", (req, res) => {
		db.Bill.destroy({
			where: {}
		}).then(() => {
			db.Bill.bulkCreate([{
				UserId: 1,
				UtilId: 1,
				amount: 100,
				dueDate: "2019-12-31"
			}]).then(success => {
				if (success) {
					res.sendStatus(200);
				}
			});
		});
	});

	app.post("/api/remove/:billid", (req, res) => {
		db.Bill.destroy({
			where: {
				id: req.params.billid
			}
		}).then(success => {
			success ? res.sendStatus(200) : sendStatus(404);
		})
	})

	app.post("/api/load/users", (req, res) => {
		db.User.destroy({
			where: {}
		}).then(() => {
			db.User.bulkCreate([{
					email: "test1",
					password: "test1"
				},
				{
					email: "test2",
					password: "test2"
				},
				{
					email: "test3",
					password: "test3"
				}
			]).then(success => {
				if (success) {
					res.sendStatus(200);
				}
			});
		});
	});

	app.post("/api/load/utils", (req, res) => {
		db.Util.destroy({
			where: {}
		}).then(() => {
			db.Util.bulkCreate([{
					type: "Electric",
					name: "Xcel Energy",
					url: "https://www.xcelenergy.com/billing_and_payment",
					logo: "https://www.xcelenergy.com/staticfiles/xe-responsive/assets/images/logo.png"
				},
				{
					type: "Water",
					name: "Den Water",
					url: "https://www.denverwater.org/pay-my-bill",
					logo: "https://www.denverwater.org/sites/default/files/DW-Horizontal.png"
				}
			]).then(success => {
				res.sendStatus(200);
			});
		});
	});
};