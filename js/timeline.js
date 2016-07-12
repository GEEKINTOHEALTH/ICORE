/**
 * @author swamy kurakula
 */
var timeline = undefined, items = undefined, lastSelection = -1, focusevents = undefined,fitem,
template = $('#one_item_template').html(),
lastEditMenu = undefined,
milestoneBGTemplate = $('#milestone_background_template').html();

var types = [];
types["cognitive"] = {
    title: "Cognitive (learning, thinking, problem-solving)",
    icon: "https://cdn1.iconfinder.com/data/icons/baby-circular-2/90/53-128.png",
    sortOrder: 5
};
types["warnings"] = {
    title: "Warning Signs",
    icon: "https://cdn1.iconfinder.com/data/icons/baby-circular-2/90/69-128.png",
    sortOrder: 4
};
types["social-emotional"] = {
    title: "Social and Emotional",
    icon: "https://cdn1.iconfinder.com/data/icons/baby-circular-2/90/82-128.png",
    sortOrder: 3
};
types["language-communication"] = {
    title: "Language and Communication",
    icon: "https://cdn1.iconfinder.com/data/icons/baby-circular-2/90/76-128.png",
    sortOrder: 2
};
types["movement"] = {
    title: "Movement/Physical Development",
    icon: "https://cdn1.iconfinder.com/data/icons/baby-circular-2/90/89-128.png",
    sortOrder: 1
};
types["cognitive"] = {
    title: "Cognitive (learning, thinking, problem-solving)",
    icon: "https://cdn1.iconfinder.com/data/icons/baby-circular-2/90/53-128.png",
    sortOrder: 0
};

function customOrder(a, b){
    return a.sortOrder - b.sortOrder;
}

// TIMELINE STUFF HERE
var options = {
	height:300,
   // width: "100%",
    //height: "100%",
    //min: LS.get_data('MIN_DATE_RANGE'), // lower limit of visible range
    //max: LS.get_data('MAX_DATE_RANGE'), // upper limit of visible range
    zoomMin: 86400000,
    zoomMax: 1000 * 60 * 60 * 24 * 31 * 4, // about three months in milliseconds
    //editable: true,
    //order: customOrder,
    orientation: {
        axis: "bottom",
        item: "bottom"
    },
    margin: {
        item: 10,
        axis: 20
    },
    showCurrentTime: false,
    // onAdd: function(item, callback){
        // callback(null);
    // },
    // onMove: function(item, callback){
        // callback(null);
    // },
    // onUpdate: function(item, callback){
        // if (item && item.itemType == 'manual') {
            // edit(item.id);
        // }
        // else {
            // callback(null);
        // }
    // },
    // onRemove: function(item, callback){
        // prettyConfirm('Remove item', 'Do you really want to remove item ' + item.title + '?', function(ok){
            // if (ok) {
                // if (LS.get_data('DIRECTION') === 'left') {
                    // movefocus(-1);
                // }
                // else 
                    // if (LS.get_data('DIRECTION') === 'right') {
                        // movefocus(1);
                    // }
                    // else {
                        // movefocus(1);
                    // }
                    // focusevents =focusgrep(item.id);
                    // destroy(item.id);
                    // callback(item);
            // }
        // });
    // },
    // template: function(item){
        // var templateForItem;
                // if (item.zoneLegend) {
                    // templateForItem = Mustache.to_html(milestoneBGTemplate, item);
                // }
                // else {
                    // templateForItem = Mustache.to_html(template, item);
                // }
        // return templateForItem;
    // }
};


/**
 * Zoom the timeline a given percentage in or out
 * @param {Number} percentage   For example 0.1 (zoom out) or -0.1 (zoom in)
 */
function zoom(percentage){
    var range = timeline.getWindow();
    var interval = range.end - range.start;
    
    timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end: range.end.valueOf() + interval * percentage
    });
}

 // moving focus  item to item
function movefocus(click){
	//console.log(1);
    if (focusevents.length) {
    	//console.log(2);
        focusevents.sort(function(item1, item2){
            return new Date(item1.start).getTime() - new Date(item2.start).getTime();
        });
       // console.log(3);
        if (LS.get_data('TARGETID')) {
        	//console.log(4);
        	hideactionbutton(LS.get_data('TARGETID'));	
            var index = -1;
            for (var item_index in focusevents) {
                if (focusevents[item_index].id == LS.get_data('TARGETID')) {
                    index = Number(item_index);
                    break;
                }
            };
            if ((index + click) < focusevents.length && (index + click) >= 0) {
                fitem = focusevents[index + click].id;
                focusitem(fitem);
            }else{
                  for (var item_index in focusevents) {
                      if (focusevents[item_index].id == LS.get_data('TARGETID')) {
                         focusitem(LS.get_data('TARGETID'));	
                       }
                       else {
                	   	fitem = focusevents[0].id;
                	   	console.log('fitem == ' + fitem);
                        focusitem(fitem);
                        }
                   };	
                }
        }
        else {
        	//console.log(5);
            fitem = focusevents[0].id;
            focusitem(fitem);
        }
    }
}

function focusitem(fitemid){
	var focus = document.getElementById('focus');
    timeline.setSelection(fitemid, {
        focus: focus.checked
    });
    LS.set_data('TARGETID', fitemid);
}

// $("#moveLeft").click(function(){
	// console.log(0);
    // LS.set_data('DIRECTION', 'left');
    // movefocus(-1);
// });
// $("#moveRight").click(function(){
	// console.log(-1);
    // LS.set_data('DIRECTION', 'right');
    // movefocus(1);
// });
$("#zoomIn").click(function(){
    zoom(-0.5);
});
$("#zoomOut").click(function(){
    zoom(0.5);
});

function prettyConfirm(title, text, callback){
    swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55"
    }, callback);
}

function render_timeline(items, container){
    focusevents = [];
    items.forEach(function(item){
    	focusevents.push(item);
    });
    timeline = new vis.Timeline(container, items, options);
    //attachTimeEvents();
}

//render_timeline();

//generating end range for milestones
function get_end_range_date(range){
    if (range && !isNaN(range)) {
        var range_date = Date.parse(LS.get_data('MIN_DATE_RANGE').substring(0, 19)).add({
            months: range
        });
        return range_date.toISOString();
    }
}

//adding milestones
// function add_milestone(){
    // var MILETONES_DATA = '', VACCINATION_DATA = '';
    // if (LS.get_data('MILETONES_JSON')) {
        // MILETONES_DATA = JSON.parse(LS.get_data('MILETONES_JSON'));
    // }
    // $.each(MILETONES_DATA, function(index1, ms_obj){
        // var item = {
            // id: ms_obj.milestone_name.trim(),
            // title: ms_obj.milestone_name.trim(),
            // type: 'background',
            // style: 'background:transparent;border-left:2px solid #0088CC;',
            // editable: false,
            // zoneLegend: true
        // };
        // if (item.id) {
            // switch (item.id) {
                // case "2m":
                    // item.start = LS.get_data('MIN_DATE_RANGE');
                    // item.end = get_end_range_date(2);
                    // break;
                // case "4m":
                    // item.start = get_end_range_date(2);
                    // item.end = get_end_range_date(4);
                    // break;
                // case "6m":
                    // item.start = get_end_range_date(4);
                    // item.end = get_end_range_date(6);
                    // break;
                // case "9m":
                    // item.start = get_end_range_date(6);
                    // item.end = get_end_range_date(9);
                    // break;
                // case "12m":
                    // item.start = get_end_range_date(9);
                    // item.end = get_end_range_date(12);
                    // break;
                // case "18m":
                    // item.start = get_end_range_date(12);
                    // item.end = get_end_range_date(18);
                    // break;
                // case "24m":
                    // item.start = get_end_range_date(18);
                    // item.end = get_end_range_date(24);
                    // break;
                // case "36m":
                    // item.start = get_end_range_date(24);
                    // item.end = get_end_range_date(36);
                    // break;
                // case "48m":
                    // item.start = get_end_range_date(36);
                    // item.end = get_end_range_date(48);
                    // break;
                // case "60m":
                    // item.start = get_end_range_date(48);
                    // item.end = get_end_range_date(60);
                    // break;
            // }
        // }
        // items.add(item);
        // LS.set_data('MS_ITEMS', JSON.stringify(items));
//         
    // });
// };

// //reading profile
// function get_profile(){
    // $.ajax({
        // type: 'GET',
        // url: base + '/profile/' + LS.get_data('SESSION_TOKEN'),
        // success: function(response){
            // if (response.ack == "success") {
                // LS.set_data('PROFILE_INFO', response.data[0]);
                // LS.set_data('PROFILE_DOB', response.data[0].dob);
                // LS.set_data('MIN_DATE_RANGE', LS.get_data('PROFILE_DOB'));
                // var MAX_DATE_RANGE = Date.parse(LS.get_data('MIN_DATE_RANGE').substring(0, 19)).add({
                    // months: 60
                // });
                // LS.set_data('MAX_DATE_RANGE', MAX_DATE_RANGE.toISOString());
                // window.location.reload();
            // }
            // else 
                // if (response.ack == "empty") {
                    // console.log('no profiles found');
                // }
                // else {
                    // alert('please login to continue..');
                    // logout();
                // }
        // }
    // });
// }

//Reading events (histories)
// function get_history(){
    // $.getJSON(base + '/history/' + LS.get_data('SESSION_TOKEN'), function(res){
        // if (res.ack == 'success') {
            // result = JSON.parse(JSON.stringify(res.data));
            // $.each(result, function(i, row){
                // var tl_history_item = {
                    // "id": row._id,
                    // "title": row.title,
                    // "notes": row.notes,
                    // "itemType": "manual",
                    // "image": "https://placeimg.com/200/150/nature",
                    // "start": row.date,
                    // "file": row.file
                // };
                // if (row.file) {
                    // tl_history_item["image"] = base + row.file;
                // }
                // items.add(tl_history_item);
                // focusevents.push(tl_history_item);
            // });
        // }
        // else 
            // if (ack = "empty") {
                // console.log("no timeline items found");
            // }
            // else {
                // alert('please login to continue..');
                // logout();
            // }
    // });
// }


function hideactionbutton(fitemid){
	var actionButtons = "#" + fitemid + "-item-actions";
    $(actionButtons).hide();
}


function attachTimeEvents(){
    timeline.on('select', function(properties){
        if (properties.items && properties.items[0] && properties.items[0] != lastSelection) {
            lastSelection = properties.items[0];
            var selection = timeline.getSelection();
            timeline.focus(selection, {
                animation: {
                    duration: 1000,
                    easingFunction: "easeInOutQuart"
                }
            });
            var targetItem = items.get(selection[0]);
            
            if (LS.get_data('TARGETID')) {
            	hideactionbutton(LS.get_data('TARGETID'));	 
            }
            LS.set_data('TARGETID', targetItem.id);
            items.update(targetItem);
            var actionButtons = "#" + targetItem.id + "-item-actions";
            $(actionButtons).show();
            if (lastEditMenu) {
                $(lastEditMenu).hide();
            }
            lastEditMenu = actionButtons;
            $(actionButtons).show();  
        }
        else {
             selectitem =timeline.getSelection();
			 if (selectitem.length) {
				 var focus = document.getElementById('focus');
                 timeline.setSelection(selectitem[0], {
                 focus: focus.checked
                  });
                  var actionButtons = "#" + selectitem[0] + "-item-actions";
                  $(actionButtons).show();
			  }
			  else {
				   hideactionbutton(LS.get_data('TARGETID'));				
			     }
          }
    });  
}

//attachTimeEvents();

function focusgrep(id){
      var fevent=$.grep(focusevents, function(event, event_index){
         return event.id != id;
       });
    return fevent;
}

// function renderedit(obj){
    // var tl_history_item = {
        // id: obj._id,
        // start: obj.date,
        // title: obj.title,
        // image: obj.file != '' ? base + '/' + obj.file : 'https://placeimg.com/100/100/nature',
        // notes: obj.notes,
        // itemType: 'manual',
        // file: obj.file
    // };
    // items.update(tl_history_item);
    // focusevents =focusgrep(obj._id);
    // focusevents.push(tl_history_item);
    // timeline.focus(tl_history_item.id, {
        // animation: {
            // duration: 1000,
            // easingFunction: "easeInOutQuart"
        // }
    // });
// }
// 
// function renderadd(obj){
    // var tl_history_item = {
        // id: obj._id,
        // start: obj.date,
        // title: obj.title,
        // image: obj.file != '' ? base + '/' + obj.file : 'https://cdn4.iconfinder.com/data/icons/twitter-ui-set/128/Camera-128.png',
        // notes: obj.notes,
        // itemType: 'manual',
        // file: obj.file
    // };
    // items.add(tl_history_item);
    // focusevents =focusgrep(obj._id);
    // focusevents.push(tl_history_item);
    // timeline.focus(tl_history_item.id, {
        // animation: {
            // duration: 1000,
            // easingFunction: "easeInOutQuart"
        // }
    // });
// }

// function milestoneview(id){
    // $.each(MILETONES_JSON, function(index1, ms_obj){
        // var isFound = false;
        // $.each(ms_obj.category, function(index2, category_obj){
            // var item_id = ms_obj.milestone_name + '-' + category_obj.category_name;
            // if (item_id == id) {
                // LS.set_data('MILESTONE-DATA', JSON.stringify(ms_obj));
                // LS.set_data('SELECT-ID', id);
                // $("#fullscreen_stage").load("screens/view.html");
                // showFullScreen();
                // isFound = true;
                // return false;
            // }
        // });
        // if (isFound) {
            // return false;
        // }
    // });
// };

// function checklistview(id){
    // var id1 = Number(id.substring(0, id.length - 1));
    // if (3 >= id1) {
        // id2 = '3m';
    // }
    // else 
        // if (3 < id1 && 6 >= id1) {
            // id2 = '6m';
        // }
        // else 
            // if (6 < id1 && 9 >= id1) {
                // id2 = '9m';
            // }
            // else 
                // if (9 < id1 && 12 >= id1) {
                    // id2 = '12m';
                // }
                // else 
                    // if (12 < id1 && 18 >= id1) {
                        // id2 = '18m';
                    // }
                    // else 
                        // if (18 < id1 && 24 >= id1) {
                            // id2 = '24m';
                        // }
                        // else 
                            // if (24 < id1 && 36 >= id1) {
                                // id2 = '36m';
                            // }
                            // else 
                                // if (36 < id1 && 72 >= id1) {
                                    // id2 = '72m';
                                // }
                                // else {
                                    // id2 = 'Above 72m';
                                // }
    // $.each(CHECKLIST_JSON, function(index1, checklist_obj){
        // if (checklist_obj.checklist_period == id2) {
            // LS.set_data('CHECKLIST-DATA', JSON.stringify(checklist_obj));
            // $("#fullscreen_stage").load("screens/checklistview.html");
            // showFullScreen();
            // return false;
        // }
    // });
// };
// 
// function vaccinationView(id){
    // $.each(VACCINATION_JSON, function(index1, vaccination_obj){
        // if (vaccination_obj.vaccination_period == id) {
            // LS.set_data('VACCINATION-DATA', JSON.stringify(vaccination_obj));
            // $("#fullscreen_stage").load("screens/vaccineview.html");
            // showFullScreen();
            // return false;
        // }
    // });
// };

// $('body').bind('edit-item', function(e, id){
    // var updating_item = items.get(id);
    // if (updating_item) {
        // updating_item._id = updating_item.id;
        // updating_item.date = updating_item.start;
        // LS.set_data('EDIT_DATA', JSON.stringify(updating_item));
        // $("#fullscreen_stage").load("screens/history_form.html");
        // showFullScreen();
    // }
    // else {
        // edit(id);
    // }
// });
// 
// $('body').bind('delete-item', function(e, id){
    // var selection = timeline.getSelection();
    // var targetItem = items.get(selection[0]);
    // prettyConfirm('Remove item', 'Do you really want to remove item ' + targetItem.title + '?', function(ok){
        // if (ok) {
            // if (LS.get_data('DIRECTION') === 'left') {
                // movefocus(-1);
            // }
            // else 
                // if (LS.get_data('DIRECTION') === 'right') {
                    // movefocus(1);
                // }
                // else {
                    // movefocus(1);
                // }
                // focusevents =focusgrep(targetItem.id);
            // items.remove(targetItem);
            // destroy(id);
        // }
    // });
// });

// //edit history item
// function edit(id){
    // $.ajax({
        // type: 'GET',
        // url: base + '/timelineedit/' + id,
        // success: function(response){
            // if (response.ack == "success") {
                // LS.set_data('EDIT_DATA', JSON.stringify(response.data));
                // $("#fullscreen_stage").load("screens/history_form.html");
                // showFullScreen();
            // }
        // }
    // });
// };
// //delete history item
// function destroy(id){
    // $.ajax({
        // type: 'DELETE',
        // url: base + '/timelinedelete/' + id,
        // success: function(response){
            // if (response.ack == 'success') {
                // console.log('history deleted successfully');
            // }
        // }
    // });
// };
// function display_current_tl_items(current){
    // var data_items = current.getAttribute('data-item').split('-');
    // if (data_items[1] == 'vaccination') {
        // vaccinationView(data_items[0]);
    // }
    // else 
        // if (data_items[1] == 'checklist') {
            // checklistview(data_items[0]);
        // }
        // else {
            // milestoneview(current.getAttribute('data-item'));
        // }
// }

// $('body').bind('vertical-history', function(e, data){
    // LS.set_data('HISTORY_ITEMS', JSON.stringify(focusevents));
    // $("#fullscreen_stage").load("screens/vertical_history.html");
    // $('.close').show();
    // showFullScreen();
// });

function searchitem(value) {
	var searcharr = [], str = value.toLowerCase();
	searchString(str, focusevents);
	function searchString(str, events) {
		for (var j = 0; j < events.length; j++) {
			if (events[j].title.toLowerCase().match(str) || events[j].notes.toLowerCase().match(str)) {
				if (events[j].file) {
					events[j].file = base + events[j].file;
				} else {
					events[j].file = "https://placeimg.com/200/150/nature";
				}
				searcharr.push(events[j]);
			}
		}
		if (searcharr.length) {
			$('#searchevent').popover('hide');
			$('#fullscreenElement').removeClass('open');
			focusitem(searcharr[0].id);
		} else {
			$('#alert').addClass("alert alert-danger").html('no matched items');
		}
	};
}
