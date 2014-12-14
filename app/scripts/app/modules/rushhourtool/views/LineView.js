define([
	'marionette',
	'text!../templates/LineViewTemplate.tpl'

], function(Marionette, template) {
	var LineView = Backbone.Marionette.ItemView.extend({

		initialize: function(options) {
			var ww = $(window).width();
			this.$el.css('width', 100 / options.numberOfLine + '%');
			this.$el.addClass(options.model.get('id'));
		},

		tagName: 'li',
		className: 'line',
		template: _.template(template),

		triggers: {
			'click': 'click',
			'mouseenter': 'mouseenter',
			'mouseleave': 'mouseleave',
		}
	});

	return LineView;
});