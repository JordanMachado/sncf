define([
	'app/App',
	'app/modules/navigation/views/NavigationView'
], function(App, NavigationView) {
	'use strict';
	var Navigation = App.module('Navigation', function(Navigation, App) {
		Navigation.startWithParent = false;
		var navigationView = null;
		var controller = {
			activeCurrentStep:function(options) {
				console.log(options)
				navigationView.activeStep(options.currentStep);
			}
		}

		Navigation.on('start', function() {
			navigationView = new NavigationView();
			App.navigationRegion.show(navigationView);
		});
		// Navigation.on('show', function() {
		// 	navigationView = new NavigationView();
		// 	App.navigationRegion.show(navigationView);
		// });

		Navigation.listenTo(App,'change:step', controller.activeCurrentStep);


	});

	return Navigation;
});