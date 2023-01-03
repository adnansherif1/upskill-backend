(function ($) {

	"use strict";

})(jQuery);

//applicationInfo = {"row1": {"count": "1", "company": "Apple", "role":"SWE", "contact":"9496565878", "link":"Google.com", "description": "Java","status": "Applied"}};
window.addEventListener("load", initTable);

function initTable() {
	data_loader('table_data', fillTable)
	$('#save').click(function () {
		console.log($("#addOneRow").prev().prop("tagName"));
		var numRows = -1;
		if ($("#addOneRow").prev().prop("tagName") == undefined) {
			numRows = 0;
		} else {
			console.log($("#addOneRow").prev().attr("id"));
			numRows = (parseInt($("#addOneRow").prev().attr("id").slice(-1)));
		}
		console.log(numRows);
		data = {}
		for (var i = 1; i < numRows + 1; i++) {
			row = {}
			var rowID = "#row" + i;
			console.log(rowID);
			$(rowID).children().each(function () {
				if ($(this).attr('class') === "company") {
					row[$(this).attr('class')] = $(this).find("input").val();
				} else if ($(this).attr('class') === "role") {
					row[$(this).attr('class')] = $(this).find("input").val();
				} else if ($(this).attr('class') === "contact") {
					row[$(this).attr('class')] = $(this).find("input").val();
				} else if ($(this).attr('class') === "link") {
					row[$(this).attr('class')] = $(this).children("a").attr("href");
				} else if ($(this).attr('class') === "status") {
					row[$(this).attr('class')] = $(this).children("a").text();
				}
			});
			data[rowID] = row;
		}
		console.log(data);
		data_saver(data, 'table_data')

	});
}

$("#addOneRow").click(function () {
	addRow()
});


$(document).on('click', '.deleteRow', function () {
	$(this).parent().parent().next().remove();
	$(this).parent().parent().remove()
})


function addRow() {
	console.log($("#addOneRow").prev().prop("tagName"));
	if ($("#addOneRow").prev().prop("tagName") == undefined) {
		var rowIndex = 1;
	} else {
		console.log($("#addOneRow").prev().attr("id"));
		console.log(($("#addOneRow").prev().attr("id")));
		console.log(typeof ((parseInt($("#addOneRow").prev().attr("id").slice(3)))));
		var rowIndex = (parseInt($("#addOneRow").prev().attr("id").slice(11)) + 1);
	}
	var rowID = "row" + rowIndex;
	var descriptionID = "description" + rowIndex;
	console.log(rowID);
	var row = '<tr id = ' + rowID + ' data-toggle="collapse" data-target=#' + descriptionID + ' aria-expanded="true" aria-controls=' + descriptionID + '>' +
		'<th Class = "count" scope="row">' + rowIndex +
		'</th>' +
		'<td Class = "company"><input class = "smallBox"></input></td>' +
		'<td Class = "role"><input class = "smallBox"></input></td>' +
		'<td Class = "link"><a href="#" class="btn btn-info">Link</a></td>' +
		'<td Class = "status">' +
		'<select name="status" id="status">' +
		'<option value="waiting">Waiting to Apply</option>' +
		'<option value="applied">Applied</option>' +
		'<option value="interview1">QA</option>' +
		'<option value="interview2">Interview Round One</option>' +
		'<option value="interview3">Interview Round Two</option>' +
		'<option value="accept">Accept</option>' +
		'<option value="reject">Reject</option>' +
		'</select></td>' +
		'<td Class = "Note"><textarea class = "largeBox"></textarea></td>' +
		'<td Class = "contact"><input></input></td>' +
		'<td Class = "delete"><button class = "deleteRow"><i class="fas fa-times"></i></button></td>' +
		'</tr>' +
		'<tr class="collapse" id=' +
		descriptionID +
		' class="collapse show acc" data-parent="#accordion">' +
		'<td colspan="6">' +
		'<p >stuff</p>' +
		'</td>' +
		'</tr>'

	$(row).insertBefore($("#addOneRow"));
}

function fillTable(applicationInfo) {
	console.log("hi");
	var numRows = Object.keys(applicationInfo).length;
	console.log(numRows);
	for (var i = 1; i < numRows + 1; i++) {
		var rowID = "#row" + i;
		console.log(rowID);
		if (i > 1) {
			addRow();
		}
		$(rowID).children().each(function () {
			console.log(this);
			if ($(this).attr('class') === "count") {
				$(this).text(i);
			} else if ($(this).attr('class') === "company") {
				//console.log(applicationInfo[rowID]["company"]);
				$(this).find("input").val(applicationInfo[rowID]["company"]);
			} else if ($(this).attr('class') === "role") {
				//console.log(applicationInfo["row1"]["role"]);
				$(this).find("input").val(applicationInfo[rowID]["role"]);
			} else if ($(this).attr('class') === "contact") {
				//console.log(applicationInfo["row1"]["contact"]);
				$(this).find("input").val(applicationInfo[rowID]["contact"]);
			} else if ($(this).attr('class') === "link") {
				//console.log(applicationInfo["row1"]["link"]);
				$(this).children("a").attr("href", applicationInfo[rowID]["link"]);
			} else if ($(this).attr('class') === "status") {
				//console.log(applicationInfo["row1"]["status"]);
				$(this).children("a").text(applicationInfo[rowID]["status"]);
			}
		})
	}
}