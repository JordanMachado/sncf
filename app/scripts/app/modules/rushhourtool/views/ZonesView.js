define([
	'marionette',
	'./ZoneView',
	'text!../templates/ZonesViewTemplate.tpl',
	'app/App',

], function(Marionette, ZoneView, template, App) {
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
		onClickZone: function(childView) {
			console.log(childView.model.get('id'))
			console.log('zone was clicked');
			App.navigate('stations/' + this.line + '/' + childView.model.get('id'), {
				trigger: true
			});
		},
		serializeData: function() {
			return {
				line: this.line
			};
		},


		template: _.template(template),

		initialize: function(options) {
			console.log('ZonesView template')
			this.line = options.lineId;
			this.$el.addClass(options.lineId.toUpperCase());
		}
	});

	return ZonesView;
})