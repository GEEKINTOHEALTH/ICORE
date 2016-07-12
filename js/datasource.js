/**
 * @author vamsik&swamyk
 */
var public_spreadsheet_url = "1rDjfUn5OS_Ivg6WCOH4lBUYv-49S85MKHFQlzK8Uy2o", db = '';

if (!localStorage.getItem('DATASOURCE')) {
    console.log("-------- NO DATASOURCE FOUND. CREATING FULL DS....");
    init();
} else {
    console.log("-------- EXISTING DATASOURCE FOUND -----");
    createDB();
}

function init(){
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: setTop10Data
    });
}

function setTop10Data(data, tabletop){
    localStorage.setItem('DATASOURCE', JSON.stringify({
        'CYTOKINE': tabletop.sheets('Cytokine').all(),
        'IHC': tabletop.sheets('IHC').all(),
        'FLOW_CYTOMETRY': tabletop.sheets('Flow Cytometry').all(),
        'CLINICAL_LABS': tabletop.sheets('CLINICAL-LABS(v1.1)').all(),
        'COLLECTION': tabletop.sheets('Collection(v1.1)').all(),
        'TREATMENT': tabletop.sheets('Treatment(v1.1)').all(),
        'ADVERSEVENT': tabletop.sheets('Adverse-Event(v1.1)').all(),
        'SINGULAR_EVENT': tabletop.sheets('Singular Event (v1.1)').all()
    }));
    
    createDB();
}

function createDB(){

    var DATASOURCE = JSON.parse(localStorage.getItem('DATASOURCE'));
    
    db = new loki('pici.json');
    
    //ADVERSE EVENT
    //db collection for ADVERSE EVENT
    var DB_ADVERSEVENT = db.addCollection('ADVERSE');
    
    //inserting records into db collection
    DATASOURCE.ADVERSEVENT.forEach(function(adverse_obj){
        DB_ADVERSEVENT.insert(adverse_obj);
    });
    
    //TREATMENT
    //db collection for TREATMENT
    var DB_TREATMENT = db.addCollection('TREATMENT');
    
    //inserting records into db collection
    DATASOURCE.TREATMENT.forEach(function(treatment_obj){
        DB_TREATMENT.insert(treatment_obj);
    });
    
    //COLLECTION
    //db collection for COLLECTION
    var DB_COLLECTION = db.addCollection('COLLECTION');
    
    //inserting records into db collection
    DATASOURCE.COLLECTION.forEach(function(collection_obj){
        DB_COLLECTION.insert(collection_obj);
    });
    
    //CYTOKINE
    //db collection for CYTOKINE
    var DB_CYTOKINE = db.addCollection('CYTOKINE');
    
    //inserting records into db collection
    DATASOURCE.CYTOKINE.forEach(function(cytokine_obj){
        DB_CYTOKINE.insert(cytokine_obj);
    });
    
    //IHC
    //db collection for clinical IHC
    var DB_IHC = db.addCollection('IHC');
    
    //inserting records into db collection
    DATASOURCE.IHC.forEach(function(ihc_obj){
        DB_IHC.insert(ihc_obj);
    });
    
    //FLOW_CYTOMETRY
    //db collection for clinical FLOW_CYTOMETRY
    var DB_FLOW_CYTOMETRY = db.addCollection('FLOW_CYTOMETRY');
    
    //inserting records into db collection
    DATASOURCE.FLOW_CYTOMETRY.forEach(function(cytometry_obj){
        DB_FLOW_CYTOMETRY.insert(cytometry_obj);
    });
    
    //CLINICAL LABS
    //db collection for clinical labs
    var DB_CLINICAL_LABS = db.addCollection('CLINICAL_LABS');
    
    //inserting records into db collection
    DATASOURCE.CLINICAL_LABS.forEach(function(lab_obj){
        DB_CLINICAL_LABS.insert(lab_obj);
    });
    
    //PATIENT
    //db collection for PATIENT
    var DB_SINGULAR_EVENT = db.addCollection('SINGULAR_EVENT');
    
    //inserting records into db collection
    DATASOURCE.SINGULAR_EVENT.forEach(function(singular_obj){
        DB_SINGULAR_EVENT.insert(singular_obj);
    });
}

