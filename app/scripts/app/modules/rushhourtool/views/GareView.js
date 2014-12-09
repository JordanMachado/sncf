define([
	'marionette',
	'text!../templates/GareViewTemplate.tpl',
	'TweenMax',
	
],function(Marionette, template, TweenMax){

	var ZoneView = Backbone.Marionette.ItemView.extend({
		tagName:'li',

		className:'gare',

		template:_.template(template),

		triggers:{
			'click':'click'
		},
		initialize:function(options) {
			console.log('gareItem');
			console.log(options)
			this.childIndex = options.childIndex;
		},
		onRender:function(view) {

			TweenLite.set(view.$el,{opacity:0,y:+20,scale:0})

			_.delay(function(){
				TweenLite.to(view.$el,.4,{opacity:1,scale:1,y:-10})
			},400*this.childIndex);
			
			
		}
	}); 

	return ZoneView;
})