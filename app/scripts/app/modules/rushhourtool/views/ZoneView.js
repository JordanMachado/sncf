define([
	'marionette',
	'text!../templates/ZoneViewTemplate.tpl'
	
],function(Marionette, template){
	var ZoneView = Backbone.Marionette.ItemView.extend({
		tagName:'li',

		className:'zone',

		template:_.template(template),

		triggers:{
			'click': 'click',
		},

		initialize:function(options) {
			console.log('zoneItem')
		}
	}); 

	return ZoneView;
})