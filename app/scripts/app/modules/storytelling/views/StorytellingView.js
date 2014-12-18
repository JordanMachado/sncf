define([
	'marionette',
	'text!../templates/StorytellingTemplate.tpl',
	'jplayer',
	'app/App'

], function(Marionette, template, jPlayer, App) {
	'use strict';

	var StorytellingView = Marionette.ItemView.extend({

		initialize: function() {
			this.assets = {
				ogv: "videos/motion-sncf.ogv",
				mp3: "videos/motion-sncf.mp3",
			}
		},
		className:'storytellingView',
		template: _.template(template),

		ui: {
			player: '.video',
			close: '.close'
		},
		events: {
			 'click @ui.close': 'onClickClose'
		},
		onRender: function() {
			this.setPlayer();
		},
		onClickClose: function() {
			App.trigger('close:storytelling');
		},
		onClose:function() {
			console.log('onclose')
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
				fullWindow:true,
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
			this.ui.player.jPlayer("setMedia", this.assets);
		},
		onPlayerReady: function() {
			this.ui.player.jPlayer("play", 0);
		},
		onPlayerEnded: function() {
			console.log('player ended');
			App.storytellingRegion.close();
			App.trigger('close:storytelling');
		}
	});

	return StorytellingView;
});