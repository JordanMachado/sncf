define([
	'marionette',
	'../RushHourTool'
], function(Marionette, RushHourTool) {
	
	var ZoneView = Marionette.ItemView.extend({
		className:'zone',
		tagName: 'li',
		template:_.template("<p><%= name  %> zoneView</p>"),
		initialize:function(options) {
			console.log('init zone view');
		} 

	});

	return ZoneView;
});