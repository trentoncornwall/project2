// Get references to page elements

let $userID = $("#user").data("id");
let $amountInput = $("#amount");
let $dateInput = $("#date");
let $utilityInput = $("#utility");

const $createBillButton = $("#createBillButton");

//! API METHODS
var API = {
	getBills: function() {
		return $.ajax({
			url: `/api/bill/${$userID.toString(10)}`,
			type: "GET"
		});
	},

	createBill: function(data) {
		return $.ajax({
			headers: {
				"Content-Type": "application/json"
			},
			url: "/api/bill/",
			type: "POST",
			data: JSON.stringify(data)
		});
	},

	removeBill: function(billid){
		return $.ajax({
			url: `/api/remove/${billid}`,
			type: "POST"
		});
	}
};

//! AFTER CREATING BILL REFRESHBILLS DOES A GET THEN FOR EACH DATA MAPS IT TO A CARD
var refershBills = () => {
	console.log("CREATED TILES");
	API.getBills().then(data => {
		console.log("data", data);
		var newTile = data.map(item => {
			console.log(item)
			console.log(
				`listId: ${item.id} userId: ${item.UserId} UtilId: ${item.UtilId}, Amount: ${item.amount}, DueDate: ${item.dueDate}`
			);
			//* creates basic div
			var card = $("<div class='card horizontal'>");

			//* determins image and link based off of the utility
			switch (item.UtilId) {
				case 1:
					var itemImage =
						"https://www.xcelenergy.com/staticfiles/xe-responsive/assets/images/logo.png";
					var itemUrl = "https://www.xcelenergy.com/billing_and_payment";
					break;

				case 2:
					var itemImage =
						"https://www.denverwater.org/sites/default/files/DW-Horizontal.png";
					var itemUrl = "https://www.denverwater.org/pay-my-bill";
					break;
			}

			// //* image div and image for bill
			var cardImage = $("<div class='card-image'>").append(
				`<img src=${itemImage}>`
			);

			// //* card content
			var cardContent = $("<div card-stacked>").append(
				$("<div class='card-content'>").text(
					`Due: ${item.dueDate} Amount: ${item.amount}`
				),
				$("<div class='card-action'>").append(
					$(`<a href=${itemUrl}>`).text("Pay Now")
				),
				$("<div class='card-action'>").append(
					$(`<a href="#" class="remove-bill" id=${item.id}>`).text("Completed")
					// $(`<a class="waves-effect waves-light btn-small" id=${item.id}><i class="material-icons right">cloud</i>remove</a>`)
				)
			);
			// //* assemble and place
			card.append(cardImage, cardContent);
			return card;
		});
		$("#tiles").empty();
		$("#tiles").append(newTile);
	});
};

//! CREATES BILL THEN SETS UP PROMISE TO LOAD BILLS
var ajaxbill = function(event) {
	event.preventDefault();

	//VALIDATOR, won't to a PUT if missing values

	if (
		!$userID.toString(10) ||
		!$utilityInput.val().trim() ||
		!$amountInput.val().trim() ||
		!$dateInput.val().trim()
	) {
		return false;
	}
	var data = {
		UserId: $userID.toString(10),
		UtilId: $utilityInput.val().trim(),
		amount: $amountInput.val().trim(),
		dueDate: $dateInput.val().trim()
	};
	API.createBill(data).then(() => {
		refershBills();
	});
};

//! CREATE Listener
$createBillButton.on("click", ajaxbill);

//! remove-bill jquery for dynamic button events
$(document).on("click", "a.remove-bill", (event)=>{
	event.preventDefault();

	console.log("clicked");
	var data = {
		UserId: $userID.toString(10),
		UtilId: $utilityInput.val().trim(),
		amount: $amountInput.val().trim(),
		dueDate: $dateInput.val().trim()
	};
	console.log(data);
	API.removeBill(event.target.id).then(()=>{
		refershBills();
	})
})

$(document).ready(function() {
	refershBills();
});
