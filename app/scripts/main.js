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
		'rangeslider': {
			deps:['jquery'],
			exports: 'window.rangeslider'
		},
		'backbone': {
			deps: ['underscore', 'jquery','text'],
			exports: 'Backbone'
		},
		'marionette': {
			deps: ['backbone', 'backbone.view.resize'],
			exports: 'Backbone.Marionette'
		},
	},
	paths: {
		//custom
		'asEvents':'app/utils/asEvents',
		'backbone.view.resize': 'app/utils/Backbone.View.Resize',

		// datas
		'LinesData': '../datas/lignes.json',
		'GaresData': '../datas/gares.json',
		
		//vendor 
		'styl': '../vendor/styl.min', 
		'text': '../bower_components/text/text',
		'underscore': '../bower_components/underscore/underscore',
		'jquery': '../bower_components/jquery/dist/jquery',
		'jplayer':'../bower_components/jplayer/dist/jplayer/jquery.jplayer',
		'backbone': '../bower_components/backbone/backbone',
		'marionette': '../bower_components/marionette/lib/core/backbone.marionette',
		'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		'TimeLineLite': '../bower_components/gsap/src/uncompressed/TimelineLite',
		'TweenLite': '../bower_components/gsap/src/uncompressed/TweenLite',
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
			App.start({container:'#AppContainer',loader:'#loaderContainer'});
		}
	}
	main.intialize();

});