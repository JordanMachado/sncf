define([
	'marionette',
	'text!../templates/NavigationViewTemplate.tpl'
], function(Marionette, template) {
	'use strict';

	var NavigationView = Marionette.ItemView.extend({
		className:'content',
		template: _.template(template),
		initialize:function() {
			this.previousStep = -1;
		},
		activeStep:function(stepToactive) {

			var previousStep = this.$el.find('li')[this.previousStep];
			$(previousStep).removeClass('active');

			var elem = this.$el.find('li')[stepToactive];
			$(elem).addClass('active');

			this.previousStep = stepToactive;
		}
	});
	return NavigationView;
})