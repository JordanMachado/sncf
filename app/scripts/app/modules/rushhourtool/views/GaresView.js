define([
	'marionette',
	'./GareView',
	'text!../templates/GaresViewTemplate.tpl',
	'app/App'

], function(Marionette, GareView, template, App) {
	var ZonesView = Backbone.Marionette.CompositeView.extend({

		className: 'garesView',

		childView: GareView,
		childViewEventPrefix: "gare:event",

		childViewContainer: function() {
			return ".gareContainer"
		},
		// serializeData: function() {
		// 	return {
		// 		line: this.line
		// 	};
		// },
		childEvents: {
			'click':'onClickGare'
		},
		onClickGare:function(childView) {
			console.log(childView.model)
			console.log('click gare');
			App.navigate('station/' + childView.model.get('code_uic'), {
				trigger: true
			})
		},

		template: _.template(template),

		initialize: function(options) {

			console.log('GaresView template')
			this.$el.addClass(options.lineId.toUpperCase());
		}
	});

	return ZonesView;
})