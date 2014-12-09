define([
	'app/App'
], function(App) {
	'use strict';

	/*
	 * Storytelling Module
	 */

	var Storytelling = App.module('Storytelling', function(Storytelling, App) {
		Storytelling.startWithParent = false;

		Storytelling.on('start', function(options) {
			console.log('Storytelling start');

			require([
				'app/modules/storytelling/views/StorytellingView'
			], function(StorytellingView) {

				var storytellingView = new StorytellingView();
				App.storytellingRegion.show(storytellingView);
			});
		});


	});

	return Storytelling;
});