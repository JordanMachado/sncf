'use strict';

var fs = require('fs'),
    readline = require('readline'),
    jf = require('jsonfile');

var gares = jf.readFileSync('sncfOriginalData/gare.json');
var zonedGares = jf.readFileSync('sncfOriginalData/gareWithZone.json');

gares.forEach(function(gare) {

	var zone = zonedGares.filter(function(zonedGare) {
		return zonedGare.fields.code_uic == gare.fields.code_uic;
	})[0]['fields']['zone_navigo'];

	// var pointDarret = zonedGares.filter(function(zonedGare) {
	// 	return zonedGare.fields.code_uic == gare.fields.code_uic;
	// })[0]['fields']['libelle_point_d_arret'];
	// gare.pointDarret = pointDarret;

	gare.zone_navigo = zone;

	delete gare.datasetid;
	delete gare.recordid;
	delete gare.record_timestamp;

	var fields = gare.fields;
    for(var field in fields){
    	gare[field] = gare.fields[field];
	}

    delete gare.fields;

});

jf.writeFileSync('gares.json', gares);

