define([
	'marionette',
	'./ZoneView',
	'text!../templates/ZonesViewTemplate.tpl',
	'app/App',
	'TweenMax',
	'TimeLineLite',


], function(Marionette, ZoneView, template, App, TweenMax, TimeLineLite) {
	var ZonesView = Backbone.Marionette.CompositeView.extend({

		initialize: function(options) {
			console.log('ZonesView template');
			this.line = options.lineId;
			this.$el.addClass(options.lineId);

		},
		serializeData: function() {
			return {
				line: this.line
			};
		},

		template: _.template(template),

		className: 'zonesView',

		childView: ZoneView,
		childViewEventPrefix: "zone:event",

		childViewContainer: function() {
			return ".zoneContainer"
		},
		childViewOptions: function(model,index) {
			return {
				numberOfZone: this.collection.length,
				childIndex:index
			}
		},
		childEvents: {
			'click': 'onClickZone',
			'mouseenter': 'onMouseEnter',
			'mouseleave': 'onMouseLeave',
		},
		onMouseEnter: function(childView) {
			TweenLite.to(childView.$el.find('p'), .2, {
				scale: 2
			});
		},
		onMouseLeave: function(childView) {
			TweenLite.to(childView.$el.find('p'), .2, {
				scale: 1
			});
		},
		onClickZone: function(childView) {
			var that = this;

			var tl = new TimeLineLite();
			this.children.each(function(view) {
				//if(view == childView) return;
				//give a random effect
				var duration = Math.random() * 0.2 + 1;
				tl.to(view.$el, duration, {
					y: -800
				}, '-=' + duration);
			});
			tl.eventCallback("onComplete", function() {
				console.log('complete')
				App.navigate('stations/' + that.line + '/' + childView.model.get('id'), {
					trigger: true
				});
			});
			//TODO should animate the ligne logo 
			//tl.to(this.$el.find('Logoclass'),Math.random()+1,{y:-300});
		}
	});

	return ZonesView;
})