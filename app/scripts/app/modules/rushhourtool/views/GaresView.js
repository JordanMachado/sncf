define([
	'marionette',
	'./GareView',
	'text!../templates/GaresViewTemplate.tpl',
	'app/App',
	'TweenMax'

], function(Marionette, GareView, template, App, TweenMax) {
	'use strict';

	var ZonesView = Backbone.Marionette.CompositeView.extend({

		initialize: function(options) {
			console.log(options);
			this.zone = options.zoneId;
			this.line = options.lineId;
			console.log('GaresView template');
			this.$el.addClass(options.lineId);
		},
		onRender: function(view) {
			App.trigger('hide:loader');
			_.delay(function() {

				var offsetTopLastChild = view.children.last().$el.offset().top;

				if(view.$el.find('.gareContainer').height() < offsetTopLastChild) {
					console.log('should display arrow');
				} else {
					console.log(view.$el.find('.gareContainer .gare'));
					var finalHeight = 0;
					view.$el.find('.gareContainer .gare').each(function() {
						finalHeight += $(this).outerHeight();
					});
					view.$el.find('.gareContainer').css({
						top:'45%',
						marginTop:-finalHeight/2,
						height:finalHeight
					})
				}

			}, 10);
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
			'click': 'onClickGare',
			'mouseenter': 'onMouseEnterGare',
			'mouseleave': 'onMouseLeaveGare'
		},
		onClickGare: function(childView) {
			console.log(childView.model);
			console.log('click gare');
			App.navigate('station/' + this.line + '/' + this.zone + '/' + childView.model.get('code_uic'), {
				trigger: true
			});
		},
		onMouseEnterGare: function(childView) {
			TweenLite.to(childView.$el.find('p'), .2, {
				scale: 1.5
			})
		},
		onMouseLeaveGare: function(childView) {
			TweenLite.to(childView.$el.find('p'), .2, {
				scale: 1
			})
		}
	});

	return ZonesView;
});