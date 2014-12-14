define([
	'app/App',
	'app/utils/DataManager'

], function(App, DataManager) {
	'use strict';

	/*
	 *	RushHourTool Module
	 */
	var RushHourTool = App.module('RushHourTool', function(RushHourTool, App) {
		RushHourTool.startWithParent = false;

		RushHourTool.addInitializer(function(options) {

		});

		RushHourTool.on('start', function(options) {

		});

		var controller = {
			/*
			 * RushHourTool Lines View
			 */
			displayIndex:function(options) {
				console.log('index')
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
			},
			/*
			 * RushHourTool Zones View
			 */
			displayZones: function(options) {
				require([
					'app/modules/rushhourtool/collections/ZoneCollection',
					'app/modules/rushhourtool/views/ZonesView'
				], function(ZoneCollection, ZonesView) {

					// zoneCollection
					var zoneCollection = new ZoneCollection();

					
			
					// get All zone for the currentLine
					var zones = DataManager.getZonesByLine(options.lineId);
					console.log(zones);

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

			},
			/*
			 * RushHourTool Gares View
			 */
			displayGares: function(options) {
				require([
					'app/modules/rushhourtool/collections/GareCollection',
					'app/modules/rushhourtool/views/GaresView'
				], function(GareCollection, GaresView) {
					
					
					var gareCollection = new GareCollection(DataManager.getGareByLineIdAndZoneId(options.lineId,options.zoneId));
					var garesView = new GaresView({
						collection:gareCollection,
						lineId:options.lineId,
						zoneId:options.zoneId
					});
					// show the gareView
					App.rushHourToolRegion.show(garesView);
				});

			},
			/*
			 * RushHourTool Tool View
			 */
			displayTool:function(options) {
				require([
					'app/modules/rushhourtool/collections/ToolModel',
					'app/modules/rushhourtool/views/ToolView'
				], function(ToolModel,ToolView) {
					var toolView = new ToolView({
						lineId:options.lineId,
						zoneId:options.zoneId,
						gareId:options.gareId
					});
					// show the gareView
					App.rushHourToolRegion.show(toolView);
				});

			}

		};

		RushHourTool.listenTo(App,'display:lines', controller.displayIndex);
		RushHourTool.listenTo(App,'display:zones', controller.displayZones);
		RushHourTool.listenTo(App,'display:gares', controller.displayGares);
		RushHourTool.listenTo(App,'display:tool', controller.displayTool);
		

	});

	return RushHourTool;

});