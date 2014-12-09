define([
	'marionette',
	'text!../templates/StorytellingTemplate.tpl',
	'jplayer'

], function(Marionette, template, jPlayer) {
	'use strict';

	var StorytellingView = Marionette.ItemView.extend({
		template: _.template(template),
		ui: {
			player: '.video'
		},
		serializeData: function() {
			// video links
			return '';
		},
		initialize: function() {
			this.assets = {
				ogv: "/videos/big_buck_bunny_1080p_stereo.ogg",
				poster:'tamere.png'
			}
		},
		onRender: function() {
			this.setPlayer();
		},
		setPlayer: function() {

			this.ui.player.jPlayer({

				ready: this.onPlayerReady.bind(this),
				ended: this.onPlayerEnded.bind(this),
				// play: this.onPlayerStart.bind(this),
				// progress: this.onPlayerProgress.bind(this),
				// timeupdate: this.onPlayerTimeUpdate.bind(this),
				solution: 'html',
				
				supplied: 'webmv, m4v, ogv',
				// // preload: 'metadata',
				preload: "auto",
				muted: true,
				// errorAlerts: false,
				// warningAlerts: false,
				// loop:this.config.loop,
				size: {
					width: '100%',
					height: '100%'
				}
			});

			this.setMedia();

			

		},
		setMedia: function() {
			 this.ui.player.jPlayer("setMedia",this.assets); 
		},
		onPlayerReady: function() {
			console.log('yop')
			
			this.ui.player.jPlayer("play", 0);

		},
		onPlayerEnded: function() {
			console.log('player ended');
		}
	});

	return StorytellingView;
});