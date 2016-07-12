Path.map("#/bio-work-list").to(function() {
	$("#title_text").html("WORKLIST");
	$("#stage").load("screens/bioinformatician_worklist.html");
});

Path.map("#/patient-history").to(function() {
	$("#title_text").html("HISTORY");
	$("#stage").load("screens/patient_history.html");
});

Path.map("#/patient-careteam").to(function() {
	$("#title_text").html("CARE TEAM");
	$("#stage").load("screens/patient_careteam.html");
});

Path.map("#/patient-images").to(function() {
	$("#title_text").html("IMAGES");
	$("#stage").load("screens/patient_images.html");
});

Path.map("#/patient-medication").to(function() {
	$("#title_text").html("TREATMENTS");
	$("#stage").load("screens/patient_medication.html");
});

Path.map("#/patient-documents").to(function() {
	$("#title_text").html("DOCUMENTS");
	$("#stage").load("screens/patient_documents.html");
});

Path.map("#/patient-response").to(function() {
	$("#title_text").html("RESPONSE");
	$("#stage").load("screens/patient_response.html");
});

Path.map("#/patient-timeline").to(function() {
	$("#title_text").html("TIMELINE");
	$("#stage").load("screens/patient_timeline.html");
});

Path.map("#/patient-schedule").to(function() {
	$("#title_text").html("SCHEDULE");
	$("#stage").load("screens/patient_schedule.html");
});

Path.map("#/research-report-form").to(function() {
	$("#title_text").html("RESEARCH REPORTS");
	$("#stage").load("screens/bio_research_report_form.html");
});

Path.map("#/research-reports").to(function() {
	$("#title_text").html("RESEARCH REPORTS");
	$("#stage").load("screens/bio_research_reports.html");
});

Path.map("#/single-patient-view").to(function() {
	$("#title_text").html("SINGLE PATIENT VIEW");
	$("#stage").load("screens/single_patient_full_view.html");
});

Path.map("#/signup").to(function() {
	$("#title_text").html("SIGNUP");
	$("#stage").load("screens/signup.html");
});

Path.map("#/forgot-password").to(function() {
	$("#title_text").html("FORGOT PASSWORD");
	$("#stage").load("screens/forgot_password.html");
});

Path.map("#/cytokine-details").to(function() {
	$("#title_text").html("CYTOKINE");
	$("#stage").load("screens/cytokine_screen.html");
});

Path.map("#/ihc-details").to(function() {
	$("#title_text").html("IHC");
	$("#stage").load("screens/ihc_screen.html");
});

Path.map("#/flow-cytometry-details").to(function() {
	$("#title_text").html("FLOW CYTOMETRY");
	$("#stage").load("screens/flow_cytometry_screen.html");
});

Path.map("#/account").to(function() {
	$("#title_text").html("ACCOUNT");
	$("#stage").load("screens/account_details.html");
});

Path.map("#/login").to(function() {
	$("#title_text").html("LOGIN");
	$("#stage").load("screens/login.html");
});

Path.map("#/patient-home").to(function() {
	$("#title_text").html("PATIENT HOME");
	$("#stage").load("screens/patient_home.html");
});

Path.map("#/bioinformatician-home").to(function() {
	$("#title_text").html("BIOINFORMATICIAN HOME");
	//$("#stage").load("screens/bioinformatician_home1.html");
	$("#stage").load("screens/bioinformatician_worklist.html");
});

Path.map("#/researcher-home").to(function() {
	$("#title_text").html("RESEARCHER HOME");
	//$("#stage").load("screens/researcher_home.html");
	$("#stage").load("screens/researcher_studies_screen.html");
});

Path.map("#/director-home").to(function() {
	$("#title_text").html("DIRECTOR HOME");
	$("#stage").load("screens/director_home.html");
});

Path.map("#/study-view").to(function() {
	$("#title_text").html("SINGLE STUDY VIEW");
	$("#stage").load("screens/full_study_view.html");
});

Path.map("#/research-studies").to(function() {
	$("#title_text").html("STUDIES");
	$("#stage").load("screens/researcher_studies_screen.html");
});
Path.map("#/research-requests").to(function() {
	$("#title_text").html("REQUESTS");
	$("#stage").load("screens/create_researcher_request.html");
});
Path.map("#/research-reports").to(function() {
	$("#title_text").html("REPORTS");
	$("#stage").load("screens/researcher_summary.html");
});
Path.map("#/research-templates").to(function() {
	$("#title_text").html("TEMPLATES");
	$("#stage").load("screens/researcher_templates.html");
});

Path.root("#/login");
Path.listen();

