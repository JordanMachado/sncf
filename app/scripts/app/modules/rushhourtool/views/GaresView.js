define([
	'marionette',
	'./GareView',
	'text!../templates/GaresViewTemplate.tpl',
	'app/App',
	'TimeLineLite',

], function(Marionette, GareView, template, App, TimeLineLite) {
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
			var that = this;
			_.delay(function() {

				var offsetTopLastChild = view.children.last().$el.offset().top;

				if (view.$el.find('.gareContainer').height() < offsetTopLastChild) {
					that.arrowIsShown = true;
					console.log('should display arrow');
					view.$el.find('.arrowScroll').fadeIn();

				} else {
					that.contentFit = true;
					console.log(view.$el.find('.gareContainer .gare'));
					var finalHeight = 0;
					view.$el.find('.gareContainer .gare').each(function() {
						finalHeight += $(this).outerHeight();
					});
					view.$el.find('.gareContainer').css({
						top: '45%',
						marginTop: -finalHeight / 2,
						height: finalHeight
					});
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
			this.stopListening();
			var currentChildIndex = childView.childIndex;
			var that = this;
			var duration = .4;
			var tl = new TimeLineLite();
			tl.set(childView.$el.find('p'), {
				scale: 1.5
			});
			if (this.arrowIsShown) {

				tl.to(this.$el.find('.arrowScroll'), duration, {
					autoAlpha: false
				});
			}
			this.children.each(function(view) {
				if (view == childView) return;

				var direction = (currentChildIndex > view.childIndex) ? '-' : '+';

				tl.to(view.$el, duration, {
					opacity: 0,
					scale: .6,
					y: direction + 40
				}, '-=' + duration);
			});
			if (this.contentFit) {
				tl.set(this.$el.find('.gareContainer'), {
					overflow: 'visible'
				});
			}

			tl.to(childView.$el, duration, {
				y: -childView.$el.offset().top + $(window).height() / 1.4
			});
			tl.eventCallback("onComplete", function() {

				App.navigate('station/' + that.line + '/' + that.zone + '/' + childView.model.get('code_uic'), {
					trigger: true
				});

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