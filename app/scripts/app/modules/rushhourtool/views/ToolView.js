define([
	'marionette',
	'./ZoneView',
	'text!../templates/ToolViewTemplate.tpl',
	'app/App',
	'styl',
	'app/utils/DataManager'

], function(Marionette, ZoneView, template, App, styl, DataManager) {
	var ZonesView = Backbone.Marionette.ItemView.extend({
		initialize: function(options) {
			console.log('ToolView template')
			this.$el.addClass(options.lineId);
			console.log(options)
			this.gareId = options.gareId;

		},
		serializeData: function() {
			return {
				gareName: DataManager.getGareNameByGareId(this.gareId)
			};
		},
		onRender: function(view) {
			App.trigger('hide:loader');
			// sorry this is hardcoded
			view.$el.find('.gareName').css({
				top: $(window).height() / 1.4 - 24 - 20 * 2
			});



		},
		onResize:function() {
			console.log('onResize')
				this.$el.find('.gareName').animate({
				top: $(window).height() / 1.4 - 24 - 20 * 2
			},100);
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