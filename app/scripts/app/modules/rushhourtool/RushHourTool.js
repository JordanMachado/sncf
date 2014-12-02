define([
	'app/App',
	'./datas/DataManager'

], function(App, DataManager) {
	'use strict';

	/*
	 *	RushHourTool Module
	 */
	var RushHourTool = App.module('RushHourTool', function(RushHourTool, App) {
		RushHourTool.startWithParent = true;

		RushHourTool.addInitializer(function(options) {

		});

		RushHourTool.on('start', function(options) {

		});

		/*
		 * RushHourTool Lines View
		 */
		RushHourTool.on('index', function(options) {
			require([
				'app/modules/rushhourtool/collections/LineCollection',
				'app/modules/rushhourtool/views/LinesView'
			], function(LineCollection, LinesView) {

				var lineCollection = new LineCollection(DataManager.getLines());
				var linesView = new LinesView({
					collection: lineCollection
				});
				App.rushHourToolRegion.show(linesView);
			});
		});

		/*
		 * RushHourTool Zones View
		 */
		RushHourTool.on('line', function(options) {
			require([
				'app/modules/rushhourtool/collections/ZoneCollection',
				'app/modules/rushhourtool/views/ZonesView'
			], function(ZoneCollection, ZonesView) {

				// zoneCollection
				var zoneCollection = new ZoneCollection();

				// get All zone for the currentLine
				var zones = DataManager.getZonesByLine(options.lineId);
				

				// iterrate on the zones array for create a simple zoneModel and add it to the zoneCollection
				for(var i=0, ln=zones.length;i<ln;i++) {
					zoneCollection.push({id:zones[i]});
				}

				// create the zoneView
				var zonesView = new ZonesView({
				 	collection: zoneCollection,
				 	lineId:options.lineId
				});

				// show the zoneView
				App.rushHourToolRegion.show(zonesView);
			});

		});

	});

	return RushHourTool;

});