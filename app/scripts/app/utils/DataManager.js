define([
	'text!LinesData',
	'text!GaresData',
	'text!FakeDay'

], function(LinesData, GaresData, FakeDay) {
	'use strict';

	var linesData = JSON.parse(LinesData);
	var garesData = JSON.parse(GaresData);
	var fakeDayData = JSON.parse(FakeDay);
	var stepMessages = [
		'Choisis ta ligne',
		'Indiques-nous ta zone de départ',
		'Sélectionnes ta gare',
		'Fais varier tes horraires'
	];

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
		getLineColor: function(lineId) {
			return _.chain(linesData)
				.filter(function(gare) {
					return gare.id == lineId;
				})
				.pluck('color')
				.value();
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
			return _.chain(garesData)
				.filter(function(gare) {
					return gare[id] == 1 && gare.zone_navigo == zoneId;
				})
				.value();

		},
		getGareNameByGareId: function(gareId) {

			return _.chain(garesData)
				.filter(function(gare) {
					return gare.id == gareId
				})
				.pluck('libelle_point_arret')
				.value();

		},

		/*
		 * Zones methods
		 */
		getZonesByLine: function(lineId) {
			// transform lineId due to the wonderfull sncf's datas
			var id = lineId.split('-')[1];

			return _.chain(garesData)
				.filter(function(gare) {
					return gare[id] == 1;
				})
				.pluck('zone_navigo')
				.uniq()
				.sortBy(function(num) {
					return Math.min(num);
				})
				.value();
		},
		/*
		 * ToolView
		 */
		getMaxCrowdValue: function(gareId) {
			var maxVal = 0;
			for (var i = 0, ln = fakeDayData.length; i < ln; i++) {
				if (fakeDayData[i].crowd > maxVal) {
					maxVal = fakeDayData[i].crowd;
				}
			}
			return maxVal;
		},
		getCrowdValueByTime: function(time) {
			return _.chain(fakeDayData)
				.filter(function(fake) {
					return fake.time == time;
				})
				.value();
		},
		getCrowdInfos: function(time, gareId, lineId) {
			// var color = DataManager.getLineColor(lineId)[0];
			// color = color.replace(/hsla\(|\)|\%/g,'');
			// var channels = color.split(',')
			// var channelsObj = _.object(['h', 's', 'l','a'], channels);
			var crowdForTime = DataManager.getCrowdValueByTime(time)[0].crowd;
			var maxVal = DataManager.getMaxCrowdValue(gareId);
			var crowd = (crowdForTime / maxVal);

			return {
				color: 'rgba(0,0,0,' + crowd + ')',
				crowdCount: crowdForTime.toFixed(0)
			};
		},
		/*
		 *	Navigation
		 */
		getMessageByStep: function(stepId) {
			return stepMessages[stepId];
		}

	}

	return DataManager;

});