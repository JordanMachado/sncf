define([
	'marionette',
	'text!../templates/ZoneViewTemplate.tpl',
	'TweenMax',
	
],function(Marionette, template, TweenMax){

	var ZoneView = Backbone.Marionette.ItemView.extend({
		tagName:'li',

		className:'zone',

		template:_.template(template),

		triggers:{
			'click': 'click',
		},

		initialize:function(options) {
			console.log('zoneItem')
		},
		onRender:function(view) {

			var startFrom = $(window).width() - view.$el.offset().top;
			TweenLite.from(view.$el,this.model.get('position')*.5+1,{y:startFrom})
		}
	}); 

	return ZoneView;
})