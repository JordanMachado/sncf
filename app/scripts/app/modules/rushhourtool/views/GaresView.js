define([
	'marionette',
	'./GareView',
	'text!../templates/GaresViewTemplate.tpl',
	'app/App'

], function(Marionette, GareView, template, App) {
	'use strict';

	var ZonesView = Backbone.Marionette.CompositeView.extend({

		initialize: function(options) {
			console.log(options);
			this.zone = options.zoneId;
			this.line = options.lineId;
			console.log('GaresView template');
			this.$el.addClass(options.lineId);
		},
		onRender:function() {
        	App.trigger('hide:loader');
		},
		template: _.template(template),
		className: 'garesView',

		// Child
		childView: GareView,
		childViewEventPrefix: "gare:event",

		childViewContainer: function() {
			return ".gareContainer";
		},
		childViewOptions: function(model, index) {
			return {
				childIndex: index,
				numberOfGares: this.collection.length
			}
		},
		childEvents: {
			'click': 'onClickGare'
		},
		onClickGare: function(childView) {
			console.log(childView.model);
			console.log('click gare');
			App.navigate('station/' + this.line + '/' + this.zone + '/' + childView.model.get('code_uic'), {
				trigger: true
			});
		}
	});

	return ZonesView;
});