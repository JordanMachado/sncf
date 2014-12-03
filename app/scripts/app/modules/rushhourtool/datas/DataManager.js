define([
	'text!LinesData',
	'text!GaresData'

], function(LinesData, GaresData) {

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
			return  _.chain(garesData)
					.filter(function(gare){ return gare[lineId] == 1 && gare.zone_navigo == zoneId;})
					.value();

		},

		/*
		 * Zones methods
		 */
		getZonesByLine: function(lineId) {

			return  _.chain(garesData)
			.filter(function(gare){ return gare[lineId] == 1;})
			.pluck('zone_navigo')
			.uniq()
			.sortBy(function(num){ return Math.min(num); })
			.value();
		}
	}

	return DataManager;

});