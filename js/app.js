( function($) {
		$.fn.extend({
			triggerAll : function(events, params) {
				var el = this,
				    i,
				    evts = events.split(' ');
				for ( i = 0; i < evts.length; i += 1) {
					el.trigger(evts[i], params);
				}
				return el;
			}
		});
	}(jQuery));

function prepareHtml(summaryTemplateId) {
	summaryTemplate = $('#' + summaryTemplateId).html();
	return function(templateData) {
		return Mustache.to_html(summaryTemplate, {
			rows : templateData
		});
	};
}

function fixScrolling() {
	var stuff = {};
	$('#center-body').on('touchstart', stuff, function(e) {
		e.data.max = this.scrollHeight - this.offsetHeight;
		e.data.y = e.originalEvent.pageY;
	}).on('touchmove', stuff, function(e) {
		var dy = e.data.y - e.originalEvent.pageY;
		// if scrolling up and at the top, or down and at the bottom
		if ((dy < 0 && this.scrollTop < 1) || (dy > 0 && this.scrollTop >= e.data.max)) {
			e.preventDefault();
		};
	});
}


$(document).ajaxStart(function() {
	NProgress.start();
});

$(document).ajaxStop(function() {
	NProgress.done();
});

function showFullScreen() {
	$('#fullscreenElement').addClass('open');
};

$('.close').on('click', function(event) {
	$('#fullscreenElement').removeClass('open');
	$('#fullscreen_stage').empty();
});

function closeFullScreen() {
	$('#fullscreenElement').removeClass('open');
	$('#fullscreen_stage').empty();
}


$('#back').on('click', function(event) {
	$('#fullscreenElement').removeClass('topmargin70 open fadeInRight animated');
	$(this).removeClass('fadeInRight animated').hide();
	$('#searchitem').removeClass('fadeInRight animated').hide().val('');
	$('.search-hide').show();
});

function showSearchScreen() {
	$('#fullscreen_stage').empty();
	$('#fullscreenElement').addClass('topmargin70 open fadeInRight animated');
}

function logout() {
	//$.getJSON(base + '/logout/' + LS.get_data('SESSION_TOKEN'), function(response){
	//if (response.ack == 'success') {
	LS.remove_data('SESSION_TOKEN');
	LS.remove_data('EDIT_DATA');
	LS.remove_data('MINDOB');
	LS.remove_data('MAXDOB');
	LS.remove_data('MILESTONE-DATA');
	LS.remove_data('PROFILE_INFO');
	LS.remove_data('PROFILE_DOB');
	LS.remove_data('MAX_DATE_RANGE');
	LS.remove_data('MIN_DATE_RANGE');
	LS.remove_data('TARGETID');
	LS.remove_data('DIRECTION');
	// }
	// else {
	//alert('no session found..redirecting to login page');
	// }
	$('body').trigger('login-screen');
	//});
}


$('body').bind('logged_out', function(e, data) {
	logout();
});

$('body').bind('search-by-string', function(e, data) {
	$.ajax({
		type : 'GET',
		url : base + '/search/patient/' + data,
		success : function(response) {
			if (response.ack == "success") {
				$('#fullscreenElement').removeClass('open');
				localStorage.PATIENT_DATA = JSON.stringify(response.data[0]);
				window.location.href = "#/new_patient_profile";
			} else {
				$('#error').text('no patient info found..');
			}
		},
		error : function(failure) {
			console.log(failure);
		}
	});
});

var firstWait1 = true;
var firstWait2 = true;

// Rendering Menu Items
var menuObject = {
	'bioinformatician' : [{menuItems : ['Work List', 'Studies', 'Research Reports', 'Data Sets', 'REST API Explorer', 'Tools', 'Archives'], 
						   eventItems : ['bio-work-list', '', 'research-report-form', '', '', '', ''],
						   iconItems : []
						 }],
	'director' : [{menuItems : [], eventItems : [], iconItems : []}],
	'patient' : [{menuItems : ['My Schedule','My Timeline', 'My Response', 'My Documents', 'My Treatments', 'My Images', 'My Care Team','History'],
				  eventItems : ['patient-schedule', 'patient-timeline', 'patient-response', 'patient-documents', 'patient-medication', 'patient-images', 'patient-careteam', 'patient-history'],
				  iconItems : ['fa fa-calendar-check-o', 'fa fa-calendar', 'fa fa-file-text-o', 'fa fa-file', 'fa fa-file-text', 'fa fa-picture-o', 'fa fa-user-md', 'fa fa-book']
				}],
	'researcher' : [{menuItems : ['Studies', 'Research Requests', 'Research Reports', 'Data Sets', 'REST API Explorer', 'Tools', 'Research Templates', 'Regulatory', 'Archives'], 
				     eventItems : ['studies-screen', 'research-requests-screen', '', '', '', '', 'research-templates-screen', '', ''],
				     iconItems : []}]
};

function getMenuInfo(loggedInUser){
	
	if($.inArray(loggedInUser, ['bioinformatician', 'director', 'patient', 'researcher']) !== -1)
		loggedInUser = menuObject[loggedInUser];
	
	var menu = [], currentMenu = loggedInUser[0];
	
	//console.log('menuItems.length = ' + currentMenu.menuItems.length + 'eventItems.length = ' + currentMenu.eventItems.length);
	
	for(var i=0; i < currentMenu.menuItems.length; i++){
		var Obj = {};
		Obj.eventItem = currentMenu.eventItems[i];
		Obj.menuItem = currentMenu.menuItems[i];
		menu.push(Obj);
	}
	return menu;
}



// SIDE NAV STUFF
// ------------------- EVENTS ON ELEMENTS -------------------------------

$(document.body).on('click', '.list-group-item', function() {
	var api_event = $(this).attr("data-api-event");
	//console.log('api_event = ' + api_event);
	if(api_event) $('body').trigger(api_event);
	$('body').trigger('hide-side-nav');
	//currentDataURL = api_url;
});

function showSideNav() {
	//$("#side").css("left", "0px");
	//$("#center-body").css("left", "250px");
	//$("#header").css("left", "250px");
	

	$("#center-body, #header").velocity({
		left : "250px",
	}, {
		duration : 100,
		easing : "easeInSine",
		sequenceQueue : false,
	});
	
	$("#side").velocity({
		left : "0px",
	}, {
		duration : 100,
		easing : "easeInSine"
	});
	

	flag = true;
}

function hideSideNav() {
	//$("#side").css("left", "-255px");
	//$("#center-body").css("left", "0px");
	//$("#header").css("left", "0px");

	$("#side").velocity({
		left : "-250px",
	}, {
		duration : 100,
		easing : "easeOutQuad"
	});

	$("#center-body, #header").velocity({
		left : "0px",
	}, {
		duration : 100,
		easing : "easeOutQuad",
		sequenceQueue : false,
	});

	flag = false;
}

function toggleNav() {
	flag = !flag;
	if (flag) {
		showSideNav();
		//$("#tog").html("<");
	} else {
		hideSideNav();
		//$("#tog").html(">");
	}
}


$('body').bind('hide-side-nav', function(e, data) {
	hideSideNav();
});
$('body').bind('show-side-nav', function(e, data) {
	showSideNav();
});

