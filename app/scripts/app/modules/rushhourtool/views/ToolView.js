define([
	'marionette',
	'./ZoneView',
	'text!../templates/ToolViewTemplate.tpl',
	'app/App',
	'styl'

], function(Marionette, ZoneView, template, App, styl) {
	var ZonesView = Backbone.Marionette.ItemView.extend({
		initialize: function(options) {
			console.log('ToolView template')
			this.$el.addClass(options.lineId);

		},
		onRender: function() {
			App.trigger('hide:loader');
		},
		className: 'toolView',
		template: _.template(template),
		events: {
			'mousemove .slider': 'onValueChange'
		},
		/*
		 * Litle trick with mousemove for getting the value while user change
		 */
		onValueChange: function(e) {
			// console.log(e.currentTarget.value);
			// this.$el.find('.hours').html(e.currentTarget.value);
			// console.log('tool click')
			styl.inject('input[type=range]:focus::-webkit-slider-thumb:after, input[type=range]:focus::-ms-thumb:after, input[type=range]:focus::-moz-range-thumb:after', {
					content: "'" + e.currentTarget.value + "'"
				}).apply();
		}
	});

	return ZonesView;
});