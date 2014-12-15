define([
	'text!LinesData',
	'text!GaresData'

], function(LinesData, GaresData) {
	'use strict';

	var linesData = JSON.parse(LinesData);
	var garesData = JSON.parse(GaresData);

	/*
	 * DataManager
	 */
	var DataManager = {

		/*
		 * Lines methods
		 */
		getLines: function() {
			return linesData;
		},
		getNumberOfLines: function() {
			return linesData.length;
		},

		/*
		 * Gares methods
		 */
		getGares: function() {
			return garesData;
		},
		getGareByLineIdAndZoneId: function(lineId, zoneId) {

			// transform lineId due to the wonderfull sncf's datas
			var id = lineId.split('-')[1];
			return  _.chain(garesData)
					.filter(function(gare){ return gare[id] == 1 && gare.zone_navigo == zoneId; })
					.value();

		},
		getGareNameByGareId: function(gareId) {

			return _.chain(garesData)
			.filter(function(gare){ return gare.id == gareId})
			.pluck('libelle_point_arret')
			.value();

		},

		/*
		 * Zones methods
		 */
		getZonesByLine: function(lineId) {
			// transform lineId due to the wonderfull sncf's datas
			var id = lineId.split('-')[1];

			return  _.chain(garesData)
			.filter(function(gare){ return gare[id] == 1;})
			.pluck('zone_navigo')
			.uniq()
			.sortBy(function(num){ return Math.min(num); })
			.value();
		}
	}

	return DataManager;

});