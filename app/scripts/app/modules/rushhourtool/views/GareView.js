define([
	'marionette',
	'text!../templates/GareViewTemplate.tpl',
	'TweenMax',
	
],function(Marionette, template, TweenMax){

	// duration in ms
	var AnimationDuration = 1500;

	var ZoneView = Backbone.Marionette.ItemView.extend({

		initialize:function(options) {
			this.childIndex = options.childIndex;
			this.numberOfGares = options.numberOfGares;
		},
		onRender:function(view) {
			console.log(this.numberOfGares);
			var duration = (AnimationDuration/this.numberOfGares) * this.childIndex;
			
			TweenLite.set(view.$el,{opacity:0,y:-40,scale:0})

			_.delay(function(){
				TweenLite.to(view.$el,.4,{opacity:1,scale:1,y:0})
			},duration);
		},

		tagName:'li',
		className:'gare',
		template:_.template(template),

		triggers:{
			'click':'click',
			'mouseenter':'mouseenter',
			'mouseleave':'mouseleave'
		}
		
	}); 

	return ZoneView;
})