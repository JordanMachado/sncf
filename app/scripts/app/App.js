define([
	'backbone',
	'marionette',
], function(Backbone, Marionette) {

	/*
	 * APPLICATION
	 */
	var App = new Marionette.Application({

		getCurrentRoute: function() {
			return Backbone.history.fragment || null;
		},

		navigate: function(route, options) {
			options || (options = {});
			return Backbone.history.navigate(route, options);
		}
	});

	App.addRegions({
		rushHourToolRegion: '#rushHourTool',
	});
	App.on('start', function(options) {
		if (Backbone.history) {
			Backbone.history.start();
		}
	});

	/*
	 * APPLICATION Routeur
	 */
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"line/:lid": "zones",
			"stations/:lid/:zid": "gares",
			"station/:lid/:zid/:gid": "tool",
		}
	});
	App.routeur = new AppRouter();

	App.routeur.on('route:index', function() {

		console.log('Routeur Lines');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			RushHourTool.trigger('index');
		});
	});

	App.routeur.on('route:zones', function(lineId) {
		console.log('Routeur Zones');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			RushHourTool.trigger('zones',{lineId:lineId});
		});
		
	});

	App.routeur.on('route:gares', function(lineId,zoneId) {
		console.log('Routeur Gares');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			RushHourTool.trigger('gares',{
				lineId:lineId,
				zoneId:zoneId
			});
		});
		
	});
	App.routeur.on('route:tool', function(lineId, zoneId, gareId) {
		console.log('Routeur Tool');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			RushHourTool.trigger('tool',{
				lineId:lineId,
				zoneId:zoneId,
				gareId:gareId
			});
		});
		
	});

	return App;
});