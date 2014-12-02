require.config({
	urlArgs: 'cacheBuster=' + (new Date()).getTime(),
	name: 'main',
	shim: {
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: '$'
		},
		'backbone': {
			deps: ['underscore', 'jquery','text'],
			exports: 'Backbone'
		},
		'marionette': {
			deps: ['backbone'],
			exports: 'Backbone.Marionette'
		},
	},
	paths: {

		// datas
		'LinesData': '../datas/lignes.json',
		'GaresData': '../datas/gares.json',
		
		//vendor 
		'text': '../bower_components/text/text',
		'underscore': '../bower_components/underscore/underscore',
		'jquery': '../bower_components/jquery/dist/jquery',
		'backbone': '../bower_components/backbone/backbone',
		'marionette': '../bower_components/marionette/lib/core/backbone.marionette',
		'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		'TimeLineLite': '../bower_components/gsap/src/uncompressed/TimelineLite',
		'TweenMax': '../bower_components/gsap/src/uncompressed/TweenMax',

	}
});
require(['app/App'], function(App) {
	'use strict';
	var main = {
		intialize:function() {
			$(document).ready(main.onReady);
		},
		onReady:function() {
			App.start();
		}
	}
	main.intialize();

});