define([
	'marionette',
	'text!../templates/ZoneViewTemplate.tpl',
	'TweenMax',

], function(Marionette, template, TweenMax) {

	var ZoneView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',

		className: 'zone',

		template: _.template(template),

		triggers: {
			'click': 'click',
			'mouseenter': 'mouseenter',
			'mouseleave': 'mouseleave'
		},

		initialize: function(options) {
			console.log('zoneItem')
			this.childIndex = options.childIndex;
			var ww = window.innerWidth;
			this.$el.css('width', ww / options.numberOfZone + 'px');
		},
		onRender: function(view) {
			var startFrom = $(window).width() - view.$el.offset().top;
			TweenLite.from(view.$el, this.childIndex * .1 + 1, {
				y: startFrom
			})
		}
	});

	return ZoneView;
})