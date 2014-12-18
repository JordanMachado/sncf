define([
	'marionette',
	'./GareView',
	'text!../templates/GaresViewTemplate.tpl',
	'app/App',
	'TimeLineLite',

], function(Marionette, GareView, template, App, TimeLineLite) {
	'use strict';

	var GaresView = Backbone.Marionette.CompositeView.extend({

		initialize: function(options) {
			this.zone = options.zoneId;
			this.line = options.lineId;
			console.log('GaresView template');
			this.$el.addClass(options.lineId);
			
		},
		onShow:function() {
			
			App.trigger('hide:loader');
			var offsetTopLastChild = this.children.last().$el.offset().top;

				if (this.$el.find('.gareContainer').height() < offsetTopLastChild) {
					this.arrowIsShown = true;
					console.log('should display arrow');
					this.$el.find('.arrowScroll').fadeIn();
					$('.gareContainer').scroll(this.onScrollGareContainer);

				} else {
					this.contentFit = true;
					console.log(this.$el.find('.gareContainer .gare'));
					var finalHeight = 0;
					this.$el.find('.gareContainer .gare').each(function() {
						finalHeight += $(this).outerHeight();
					});
					this.$el.find('.gareContainer').css({
						top: '45%',
						marginTop: -finalHeight / 2,
						height: finalHeight
					});
				}

		},
		onScrollGareContainer: function() {
			TweenLite.to($('.arrowScroll'),0.5,{autoAlpha:false});
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

			tl.to(childView.$el, 0.5, {
				y: -childView.$el.offset().top + $(window).height() * 0.6 + 20
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

	return GaresView;
});