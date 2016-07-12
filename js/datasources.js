/**
 * @author swamyk
 */
//old data sheet url == 1Ia9UqS3_MhAHaeGEIsnYyY3b0p71axAX28losHmIPbI 1gjdFwQDmYN6pb7y43E0RqdV70vdfX1ot4h_tanObOJA  
var public_spreadsheet_url2 = "1-TwNqvlY5ita1iJlISu98TkwYh9qxg2GpQ7zZWOxke8",
    db2 = ''; 
 
(function() {
	if (!localStorage.getItem('DATASOURCES')) {
		console.log("-------- NO DATASOURCE FOUND. CREATING FULL DS....");
		initS();
		return;
	}
	createDBS();
}());

function initS() {
	Tabletop.init({
		key : public_spreadsheet_url2,
		callback : readData
	});
}

function readData(data, tabletop) {

	var cytokines = tabletop.sheets('Cytokine').all().slice(0, 2000),
	    flowcytometries = tabletop.sheets('Flow Cytometry').all().slice(0, 2000),
	    ihcs = tabletop.sheets('IHC').all().slice(0, 2000);

	localStorage.setItem('DATASOURCES', JSON.stringify({
		'CTORG' : tabletop.sheets('CT.org').all(),
		'STUDIES' : tabletop.sheets('Studies').all(),
		'STUDYDETAILS' : tabletop.sheets('Study details').all(),
		'PATIENTS' : tabletop.sheets('Patients').all(),
		'SPECIMEN' : tabletop.sheets('Specimen').all(),
		'TREATMENT' : tabletop.sheets('Treatment').all(),
		'ADVERSEVENT' : tabletop.sheets('Adverse Events').all(),
		'STEROID' : tabletop.sheets('Steroid').all(),
		'COMPARE' : tabletop.sheets('Comparison').all(),
		'CLINICALLABS' : tabletop.sheets('Clinical lab').all(),
		'CYTOKINE' : cytokines,
		'FLOWCYTOMETRY' : flowcytometries,
		'IHC' : ihcs
	}));

	createDBS();
}

function createDBS() {

	var DATASOURCE = JSON.parse(localStorage.getItem('DATASOURCES'));

	/* for (var key in DATASOURCE) {
	 console.log('key is ' + key);
	 var arrayElement = DATASOURCE[key] || [];
	 console.log('length is' + arrayElement.length);
	 var i = arrayElement.length;
	 while (i--) {
	 console.log(JSON.stringify(arrayElement[i], null, 2) + '\n');
	 }
	 } */

	db2 = new loki('pici2.json');

	//db collection for CTORG
	var DB_CTORG = db2.addCollection('CTORG');
	DATASOURCE.CTORG.forEach(function(ctorg_obj) {
		DB_CTORG.insert(ctorg_obj);
	});

	//db collection for STUDIES
	var DB_STUDIES = db2.addCollection('STUDIES');
	DATASOURCE.STUDIES.forEach(function(study_obj) {
		DB_STUDIES.insert(study_obj);
	});

	//db collection for STUDYDETAILS
	var DB_STUDYDETAILS = db2.addCollection('STUDYDETAILS');
	DATASOURCE.STUDYDETAILS.forEach(function(study_details_obj) {
		DB_STUDYDETAILS.insert(study_details_obj);
	});

	//db collection for PATIENTS
	var DB_PATIENTS = db2.addCollection('PATIENTS');
	DATASOURCE.PATIENTS.forEach(function(patient_obj) {
		DB_PATIENTS.insert(patient_obj);
	});

	//db collection for SPECIMEN
	var DB_SPECIMEN = db2.addCollection('SPECIMEN');
	DATASOURCE.SPECIMEN.forEach(function(specimen_obj) {
		DB_SPECIMEN.insert(specimen_obj);
	});

	//db collection for TREATMENT
	var DB_TREATMENT = db2.addCollection('TREATMENT');
	DATASOURCE.TREATMENT.forEach(function(treatment_obj) {
		DB_TREATMENT.insert(treatment_obj);
	});

	//db collection for ADVERSEVENT
	var DB_ADVERSEVENT = db2.addCollection('ADVERSEVENT');
	DATASOURCE.ADVERSEVENT.forEach(function(adverse_event_obj) {
		DB_ADVERSEVENT.insert(adverse_event_obj);
	});

	//db collection for STEROID
	var DB_STEROID = db2.addCollection('STEROID');
	DATASOURCE.STEROID.forEach(function(steroid_obj) {
		DB_STEROID.insert(steroid_obj);
	});

	//db collection for CLINICAL LABS
	var DB_CLINICALLABS = db2.addCollection('CLINICALLABS');
	DATASOURCE.CLINICALLABS.forEach(function(Clab_obj) {
		DB_CLINICALLABS.insert(Clab_obj);
	});

	//db collection for CYTOKINE
	var DB_CYTOKINE = db2.addCollection('CYTOKINE');
	DATASOURCE.CYTOKINE.forEach(function(cytokine_obj) {
		DB_CYTOKINE.insert(cytokine_obj);
	});

	//db collection for IHC
	var DB_IHC = db2.addCollection('IHC');
	DATASOURCE.IHC.forEach(function(ihc_obj) {
		DB_IHC.insert(ihc_obj);
	});

	//db collection for FLOWCYTOMETRY
	var DB_FLOWCYTOMETRY = db2.addCollection('FLOWCYTOMETRY');
	DATASOURCE.FLOWCYTOMETRY.forEach(function(flowcytometry_obj) {
		DB_FLOWCYTOMETRY.insert(flowcytometry_obj);
	});
	
	//db collection for FLOWCYTOMETRY
	// var DB_FLOWCYTOMETRY = db2.addCollection('COMPARE');
	// DATASOURCE.COMPARE.forEach(function(compare_obj) {
		// DB_FLOWCYTOMETRY.insert(compare_obj);
	// });
}