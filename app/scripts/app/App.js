define([
	'backbone',
	'marionette',
], function(Backbone, Marionette) {
	'use strict';
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

	var StorytellingRegion = Marionette.Region.extend({
		close: function(view) {
			var that = this;
			this.$el.slideUp(400, function() {
				Marionette.Region.prototype.reset.call(that);
			});

		}
	});

	App.addRegions({
		navigationRegion: '#navigationInfo',
		rushHourToolRegion: '#rushHourTool',
		storytellingRegion: {
			regionClass: StorytellingRegion,
			selector: '#storytelling'
		}
	});
	App.on('start', function(options) {
		App.container = options.container;
		App.loader = options.loader;
		App.loaderIsShown = true;
		App.trigger('resize');
		if (Backbone.history) {
			Backbone.history.start();
		}
	});

	App.on('hide:loader', function() {
		if (App.loaderIsShown) {
			$(App.loader).fadeOut();
			App.loaderIsShown = false;
		}

	});

	App.on('resize', function() {
		var windowHeight = $(window).height();
		var headerHeight = $('header').outerHeight();
		var headerHeightPct = (headerHeight / windowHeight) * 100;
		$(App.container).css({
			'top': $('header').outerHeight(),
			'height': 100 - headerHeightPct + '%'
		});

	});



	/*
	 * APPLICATION Routeur
	 */
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'index',
			'line/:lid': 'zones',
			'stations/:lid/:zid': 'gares',
			'station/:lid/:zid/:gid': 'tool',
		}
	});
	App.routeur = new AppRouter();

	App.routeur.on('route:index', function() {

		console.log('Routeur Lines');
		require([
			'app/modules/navigation/Navigation',
			'app/modules/storytelling/Storytelling',
			'app/modules/rushhourtool/RushHourTool'
		], function(Navigation, Storytelling, RushHourTool) {
			//Navigation.start()
			//Storytelling.start();
			//App.trigger('change:step',{currentStep:0});
			App.trigger('display:lines');

		});
	});

	App.routeur.on('route:zones', function(lineId) {
		console.log('Routeur Zones');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			//RushHourTool.trigger('zones',{lineId:lineId});
			App.trigger('display:zones', {
				lineId: lineId
			});
		});

	});

	App.routeur.on('route:gares', function(lineId, zoneId) {
		console.log('Routeur Gares');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			App.trigger('display:gares', {
				lineId: lineId,
				zoneId: zoneId
			});
		});

	});
	App.routeur.on('route:tool', function(lineId, zoneId, gareId) {
		console.log('Routeur Tool');
		require([
			'app/modules/rushhourtool/RushHourTool'
		], function(RushHourTool) {
			App.trigger('display:tool', {
				lineId: lineId,
				zoneId: zoneId,
				gareId: gareId
			});
		});

	});

	$(window).resize(_.throttle(onResize, 100));

	function onResize() {
		App.trigger('resize');
	}

	return App;
});