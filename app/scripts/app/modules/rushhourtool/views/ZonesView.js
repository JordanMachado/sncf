define([
	'marionette',
	'./ZoneView',
	'text!../templates/ZonesViewTemplate.tpl',
	'app/App',
	'TweenMax',
	'TimeLineLite',


], function(Marionette, ZoneView, template, App , TweenMax,TimeLineLite) {
	var ZonesView = Backbone.Marionette.CompositeView.extend({

		className: 'zonesView',

		childView: ZoneView,
		childViewEventPrefix: "zone:event",

		childViewContainer: function() {
			return ".zoneContainer"
		},
		childViewOptions: function(line){
    		return {
    			numberOfZone: this.collection.length,
    		}
  		},
		childEvents: {
			'click': 'onClickZone',
		},
		onClickZone: function(childView) {
			console.log(this.children);
			this.children.each(function(view){

				console.log(view)
				 if(view == childView) return;

				 TweenLite.to(view.$el,Math.random()+1,{y:-800})
			})
			var that = this;
			// console.log(childView.model.get('id'))
			// console.log('zone was clicked');
			// var tl = new TimeLineLite();
			// tl.set(childView.$el,{position:'absolute'});
			// tl.to(childView.$el,.6,{left:'0px',width:$(window).width()+'px'});
			// tl.to(childView.$el.find('p'),.5,{y:-childView.$el.find('p').offset().top/2+$('header').height(),onComplete:function(){
			// 	App.navigate('stations/' + that.line + '/' + childView.model.get('id'), {
			// 	trigger: true
			// });
			// }});
			
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
			this.$el.addClass(options.lineId);

		}
	});

	return ZonesView;
})