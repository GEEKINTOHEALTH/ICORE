/**
 * @author swamyk
 */


//Researcher Templates page relevant bindings

$('body').bind('show-template', function(e, data){
	$("#fullscreen_stage").load("screens/researcher_template_view.html");
	showFullScreen();
});

//----------------------------------------------------

$('body').bind('patient-history', function(e, data) {
	window.location.href = "#/patient-history";
});

$('body').bind('patient-careteam', function(e, data) {
	window.location.href = "#/patient-careteam";
});

$('body').bind('patient-images', function(e, data) {
	window.location.href = "#/patient-images";
});

$('body').bind('patient-medication', function(e, data) {
	window.location.href = "#/patient-medication";
});

$('body').bind('patient-documents', function(e, data) {
	window.location.href = "#/patient-documents";
});

$('body').bind('patient-response', function(e, data) {
	window.location.href = "#/patient-response";
});

$('body').bind('patient-timeline', function(e, data) {
	window.location.href = "#/patient-timeline";
});

$('body').bind('patient-schedule', function(e, data) {
	window.location.href = "#/patient-schedule";
});

$('body').bind('bio-work-list', function(e, data) {
	window.location.href = "#/bio-work-list";
});

$('body').bind('close-screen', function(e, data) {
	closeFullScreen();
});

$('body').bind('research-report-form', function(e, data) {
	window.location.href = "#/research-report-form";
});

$('body').bind('research-reports', function(e, data) {
	window.location.href = "#/research-reports";
});

$('body').bind('show-menu', function(e, data) {
	$("#fullscreen_stage").load("screens/" + LS.get_data('LOGGEDINUSER') + "_menu.html");
	showFullScreen();
});

$('body').bind('single-patient-view', function(e, data) {
	window.location.href = "#/single-patient-view";
});

$('body').bind('login-screen', function(e, data) {
	window.location.href = "#/login";
});

$('body').bind('register-screen', function(e, data) {
	window.location.href = "#/signup";
});

$('body').bind('director-home', function(e, data) {
	window.location.href = "#/director-home";
});

$('body').bind('bio-research-req-view', function(e, data) {
	$("#restapi-explorer-id").removeClass('disabled');
	$("#bio-research-req-id").addClass('disabled');
	$("#bio-research-request").load("screens/bio_view_research_requests.html");
});

$('body').bind('rest-api-explorer', function(e, data) {
	$("#restapi-explorer-id").addClass('disabled');
	$("#bio-research-req-id").removeClass('disabled');
	$("#bio-research-request").load("screens/restapi_explorer.html");
});

$('body').bind('view-research-requests', function(e, data) {
	$("#create-request-id").removeClass('disabled');
	$("#view-request-id").addClass('disabled');
	$("#research-request").load("screens/view_research_requests.html");
});

$('body').bind('create-new-request', function(e, data) {
	$("#create-request-id").addClass('disabled');
	$("#view-request-id").removeClass('disabled');
	$("#research-request").load("screens/create_new_request_form.html");
});

$('body').bind('full-study-view', function(e, data) {
	var studyId = data;
	console.log('study id is == ' + studyId);
	LS.set_data('STUDYID', studyId);
	window.location.href = "#/study-view";
});

/*
 $('body').bind('home-screen', function(e, data) {
 localStorage.setItem('activePage','home-screen');
 $("#title_text").html("CLINICAL TRIAL DASHBOARD");
 $("#stage").load("screens/home.html");
 });*/

$('body').bind('adverse-screen', function(e, data) {
	localStorage.setItem('activePage', 'adverse-screen');
	$("#title_text").html("ADVERSE EVENTS");
	$("#stage").load("screens/adverse_screen.html");
});

$('body').bind('treatments-screen', function(e, data) {
	localStorage.setItem('activePage', 'treatments-screen');
	$("#title_text").html("TREATMENTS");
	$("#stage").load("screens/treatment_screen.html");
});

$('body').bind('collection-screen', function(e, data) {
	localStorage.setItem('activePage', 'collection-screen');
	$("#title_text").html("COLLECTIONS");
	$("#stage").load("screens/collection_screen.html");
});

$('body').bind('clinical-labs-screen', function(e, data) {
	localStorage.setItem('activePage', 'clinical-labs-screen');
	$("#title_text").html("CLINICAL LABS");
	$("#stage").load("screens/clinical_labs_screen.html");
});

$('body').bind('clinical-history-screen', function(e, data) {
	localStorage.setItem('activePage', 'clinical-history-screen');
	$("#title_text").html("CLINICAL HISTORY");
	$("#stage").load("screens/clinical_history_screen.html");
});

$('body').bind('ihc-screen', function(e, data) {
	localStorage.setItem('activePage', 'ihc-screen');
	window.location.href = "#/ihc-details";
});
$('body').bind('cytokine-screen', function(e, data) {
	localStorage.setItem('activePage', 'cytokine-screen');
	window.location.href = "#/cytokine-details";
});

$('body').bind('microrna-screen', function(e, data) {
	localStorage.setItem('activePage', 'microrna-screen');
	window.location.href = "#/login";
	$("#title_text").html("MICRO RNA");
	$("#stage").load("screens/microrna_screen.html");
});

$('body').bind('flowcytometry-screen', function(e, data) {
	localStorage.setItem('activePage', 'flowcytometry-screen');
	window.location.href = "#/flow-cytometry-details";
});

$('body').bind('search-screen', function(e, data) {
	$("#fullscreen_stage").load("screens/search_form2.html");
	showFullScreen();
});

$('body').bind('home-screen', function(e, data) {
	$("#fullscreen_stage").load("screens/researcher_menu.html");
	showFullScreen();
});

//DETAILS SCREENS
$('body').bind('add-patient-to-study', function(e, data) {
	$("#fullscreen_stage").load("screens/create_patient_form.html");
	showFullScreen();
});

$('body').bind('patient-details1', function(e, data) {
	$("#fullscreen_stage").load("screens/patient_details1.html");
	showFullScreen();
});

$('body').bind('patient-details', function(e, data) {
	$("#fullscreen_stage").load("screens/patient_details.html");
	showFullScreen();
});

$('body').bind('study-details', function(e, data) {
	$("#fullscreen_stage").load("screens/study_details.html");
	showFullScreen();
});

$('body').bind('pathology-view', function(e, data) {
	$("#fullscreen_stage").load("screens/pathology_view.html");
	showFullScreen();
});

$('body').bind('cytokine-trend-screen', function(e, data) {
	$("#fullscreen_stage").load("screens/cytokine_trend_screen.html");
	showFullScreen();
});

//Flip screens
$('body').bind('flow-flip', function(e, data) {
	$("#fullscreen_stage").load("screens/flow_flip.html");
	showFullScreen();
});

$('body').bind('ihc-flip', function(e, data) {
	$("#fullscreen_stage").load("screens/ihc_flip.html");
	showFullScreen();
});
$('body').bind('cyto-flip', function(e, data) {
	$("#fullscreen_stage").load("screens/cyto_flip.html");
	showFullScreen();
});

// Researcher screens

$('body').bind('studies-screen', function(e, data) {
	window.location.href = "#/research-studies";
});

$('body').bind('research-requests-screen', function(e, data) {
	window.location.href = "#/research-requests";
});

$('body').bind('research-reports-screen', function(e, data) {
	window.location.href = "#/research-reports";
});

$('body').bind('research-templates-screen', function(e, data) {
	window.location.href = "#/research-templates";
});

$('body').bind('dataset-screen', function(e, data) {
	$("#title_text").html("DATA SET");
	$("#stage").load("screens/researcher_studies_screen.html");
});
$('body').bind('rest-api-screen', function(e, data) {
	$("#title_text").html("REST API EXPLORER");
	$("#stage").load("screens/researcher_studies_screen.html");
});
$('body').bind('tools-screen', function(e, data) {
	$("#title_text").html("TOOLS");
	$("#stage").load("screens/researcher_studies_screen.html");
});
$('body').bind('regulatory-screen', function(e, data) {
	$("#title_text").html("REGULATORY");
	$("#stage").load("screens/researcher_studies_screen.html");
});
$('body').bind('archives-screen', function(e, data) {
	$("#title_text").html("ARCHIVES");
	$("#stage").load("screens/researcher_studies_screen.html");
});
