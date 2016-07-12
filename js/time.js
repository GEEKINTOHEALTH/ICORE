var template = $('#one_item_template').html();
items = new vis.DataSet({});
timeline = new vis.Timeline(document.getElementById('visualization'), items, options);

timeline.on('select', function(properties) {
	if (properties.items && properties.items[0] && properties.items[0] != lastSelection) {
		lastSelection = properties.items[0];
		var selection = timeline.getSelection();
		timeline.focus(selection, {
			animation : {
				duration : 1000,
				easingFunction : "easeInOutQuart"
			}
		});
		var targetItem = items.get(selection[0]);
		items.update(targetItem);
	} else {
		//alert("Duplicate or something..");
	}
});

function renderadd(obj) {
	var temp;
	if (obj.file != "") {
		temp = '<img src="' + obj.file.substring(2) + '" width="150">';
	} else {
		temp = "";
	}
	items.add({
		id : obj._id,
		start : obj.date,
		content : obj.title,
		file : temp
	});
	timeline.focus(obj._id, {
		animation : {
			duration : 1000,
			easingFunction : "easeInOutQuart"
		}
	});
}

function renderedit(obj) {
	var temp;
	if (obj.file != "") {
		temp = '<img src="' + obj.file.substring(2) + '" width="150">';
	} else {
		temp = "";
	}
	items.update({
		id : obj._id,
		start : obj.date,
		content : obj.title,
		file : temp
	});
	timeline.focus(obj._id, {
		animation : {
			duration : 1000,
			easingFunction : "easeInOutQuart"
		}
	});
}