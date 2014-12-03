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
			console.log('gareItem')
		},
		onRender:function(view) {
		}
	}); 

	return ZoneView;
})