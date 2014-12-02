define([
	'marionette',
	'./ZoneView',
	'text!../templates/ZonesViewTemplate.tpl'

], function(Marionette, ZoneView, template) {
	var ZonesView = Backbone.Marionette.CompositeView.extend({

		className: 'zonesView',

		childView: ZoneView,
		childViewEventPrefix: "zone:event",

		childViewContainer: function() {
			return ".zoneContainer"
		},
		childEvents: {
			'click': 'onClickZone'
		},
		onClickZone: function() {
			console.log('zone was clicked');
		},
		serializeData: function() {
			return {
				line: this.line
			};
		},


		template: _.template(template),

		initialize: function(options) {
			console.log('ZonesView template')
				//console.log(options)
			this.line = options.lineId;
			this.$el.addClass(options.lineId.toUpperCase());
		}
	});

	return ZonesView;
})