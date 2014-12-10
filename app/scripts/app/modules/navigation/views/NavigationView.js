define([
	'marionette',
	'text!../templates/NavigationViewTemplate.tpl'
], function(Marionette, template) {
	'use strict';

	var NavigationView = Marionette.ItemView.extend({
		className:'content',
		template: _.template(template),
		activeStep:function(stepToactive) {
			var elem = this.$el.find('li')[stepToactive];
			$(elem).addClass('active');
			// this.$el.find('li')[stepToactive].addClass('active');
			console.log(this.$el.find('li')[stepToactive]);
		}
	});
	return NavigationView;
})