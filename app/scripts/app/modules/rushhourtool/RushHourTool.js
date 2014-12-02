define([
	'app/App',
	'text!../../../../datas/lignes.json',
	'text!../../../../datas/gares.json'

], function(App, LinesData, GareData) {
	'use strict';

	// datas 
	var linesData = {};
	var gareData = {};
	
	/*
	 *	RushHourModule
	 */
	var RushHourTool = App.module('RushHourTool', function(RushHourTool, App) {
		RushHourTool.startWithParent = true;

		// controller RushHour


		RushHourTool.addInitializer(function(options) {
			linesData = JSON.parse(LinesData);
			RushHourTool.numberOfLine = linesData.length;
			gareData = JSON.parse(GareData);
		});

		RushHourTool.on('start', function(options) {
			require([
				'app/modules/rushhourtool/collections/LineCollection',
				'app/modules/rushhourtool/views/LinesView'
			], function(LineCollection, LinesView) {
				var lineCollection = new LineCollection(linesData);
				var linesView = new LinesView({
					collection: lineCollection
				});
				App.rushHourToolRegion.show(linesView);
			});
		});

		RushHourTool.on('line', function(options) {
			console.log('trigger line')
			console.log(options)
			require([
				'app/modules/rushhourtool/collections/LineCollection',
				'app/modules/rushhourtool/views/LinesView'
			], function(LineCollection, LinesView) {
				var lineCollection = new LineCollection(linesData);
				var linesView = new LinesView({
					collection: lineCollection
				});
				App.rushHourToolRegion.show(linesView);
			});
		});
		
		//RushHourTool.listenTo(RushHourTool, 'line:click', controller.onLineClick);

	});

	return RushHourTool;

});