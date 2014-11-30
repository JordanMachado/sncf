define([
	'backbone',
	'marionette',
], function(Backbone, Marionette) {
	var App = new Marionette.Application();

	App.addRegions({
		rushHourToolRegion:'#rushHourTool'
	});


	App.on('start', function(options) {


		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			RushHourTool.start();
		});


	});
	App.on('start', function(options) {
		console.log('app initialized')
	});

	return App;
});