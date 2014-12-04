define([
	'marionette',
	'./ZoneView',
	'text!../templates/ToolViewTemplate.tpl',
	'app/App',

], function(Marionette, ZoneView, template, App) {
	var ZonesView = Backbone.Marionette.ItemView.extend({

		className: 'toolView',



		// serializeData: function() {
		// 	return {
		// 		line: this.line
		// 	};
		// },
		events:{
			'click':'onClick'
		},
		onClick:function() {
			console.log('tool click')
		},

		template: _.template(template),

		initialize: function(options) {
			console.log('ToolView template')
			console.log(options)

		}
	});

	return ZonesView;
})