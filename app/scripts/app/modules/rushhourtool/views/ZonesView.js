define([
	'marionette',
	'../RushHourTool',
	'./ZoneView',
	'text!../templates/ZoneViewTemplate.tpl',
], function(Marionette, RushHourTool, ZoneView, template) {
	
	var ZonesView = Marionette.CompositeView.extend({
		className:'zones',
		tagName: 'ul',
		childView:ZoneView,
		template:_.template(template), 
		initialize:function(options) {
			console.log('zones')
			console.log(options)
		}

	});

	return ZonesView;
});