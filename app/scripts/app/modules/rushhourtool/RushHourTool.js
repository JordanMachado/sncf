define([
	'app/App',
	'text!../../../../datas/lignes.json',
	'text!../../../../datas/gares.json'

], function(App, LinesData, GareData) {
	'use strict';

	// datas 
	var linesData = {};
	var gareData = {};

	var RushHourTool = App.module('RushHourTool', function(RushHourTool, App) {
		RushHourTool.startWithParent = false;

		// controller RushHour
		var controller = {
			onLineClick: function(args) {
				var gareFilteredByLine = _.filter(gareData, function(gare) {
					return gare.fields[args.lineId] == 1;
				});
				//console.log(gareFilteredByLine);
				//$('body').css('background-color','rgb(66, 125, 189)');
				//App.rushHourToolRegion.reset();
			}
		};

		RushHourTool.addInitializer(function(options) {
			linesData = JSON.parse(LinesData);
			RushHourTool.numberOfLine = linesData.length;
			gareData = JSON.parse(GareData);
		});

		RushHourTool.on('start', function(options) {

			require([
				'app/modules/rushhourtool/collections/LineCollection',
				'app/modules/rushhourtool/views/LinesView',
				'app/modules/rushhourtool/views/ZonesView'
			], function(LineCollection, LinesView, ZonesView) {
				var lineCollection = new LineCollection(linesData);
				var linesView = new LinesView({
					collection: lineCollection
				});
				App.rushHourToolRegion.show(linesView);
			});
		});

		RushHourTool.listenTo(RushHourTool, 'line:click', controller.onLineClick);

	});

	return RushHourTool;

});


//get all code couleur sncf and line
//http://ressources.data.sncf.com/api/records/1.0/search?dataset=codes-couleur-des-lignes-transilien