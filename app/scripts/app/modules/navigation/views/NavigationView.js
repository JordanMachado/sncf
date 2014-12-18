define([
	'marionette',
	'text!../templates/NavigationViewTemplate.tpl',
	'TweenLite',
	'app/utils/DataManager',
	'TweenMax'
], function(Marionette, template, TweenLite, DataManager, TweenMax) {
	'use strict';

	var NavigationView = Marionette.ItemView.extend({
		className: 'content',
		template: _.template(template),
		initialize: function() {
			this.previousStep = -1;
		},
		events: {
			'mouseenter .steps': 'onMouseEnterSteps',
			'mouseleave .steps': 'onMouseLeaveSteps'
		},
		onShow:function() {
			TweenLite.from(this.$el,0.5,{y:+100})
		},
		onMouseEnterSteps: function(e) {
			var message = DataManager.getMessageByStep(e.currentTarget.dataset.id);
			TweenLite.to($('.message'),0.5,{autoAlpha:1});
			$('.message').html(message);
		},
		onMouseLeaveSteps: function() {
			TweenLite.to($('.message'),0.5,{autoAlpha:0,onComplete:function(){
				$('.message').html('');	
			}});
		},
		activeStep: function(stepToactive) {

			var previousStep = this.$el.find('li')[this.previousStep];
			$(previousStep).removeClass('active');

			var elem = this.$el.find('li')[stepToactive];
			$(elem).addClass('active');

			this.previousStep = stepToactive;
		}
	});
	return NavigationView;
})