define([
	'marionette',
	'text!../templates/ZoneViewTemplate.tpl',
	'TweenMax',
	'app/App'

], function(Marionette, template, TweenMax, App) {

	var ZoneView = Backbone.Marionette.ItemView.extend({
		initialize: function(options) {
			console.log('zoneItem')
			this.childIndex = options.childIndex;
			this.$el.css('width', 100 / options.numberOfZone + '%');
		},
		onRender: function(view) {
			var startFrom = $(window).width() - view.$el.offset().top;
			TweenLite.from(view.$el, this.childIndex * .1 + 1, {
				y: startFrom
			});
		},

		tagName: 'li',
		className: 'zone',
		template: _.template(template),

		triggers: {
			'click': 'click',
			'mouseenter': 'mouseenter',
			'mouseleave': 'mouseleave'
		}
	});

	return ZoneView;
});