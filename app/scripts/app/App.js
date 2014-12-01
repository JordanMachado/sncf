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
		rushHourToolRegion: '#rushHourTool'
	});
	App.on('start', function(options) {
		console.log('app initialized')
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
			"line/:id": "line"
		}
	});
	App.routeur = new AppRouter();

	App.routeur.on('route:index', function() {

		console.log('Routeur index');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			RushHourTool.start();
		});
	});

	App.routeur.on('route:line', function(id) {
		console.log('Routeur ligne');
		console.log(id);
	});

	return App;
});