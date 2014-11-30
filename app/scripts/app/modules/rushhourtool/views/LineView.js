define([
	'marionette',
	'text!../templates/LineViewTemplate.tpl'
],function(Marionette, template){
	var LineView = Backbone.Marionette.ItemView.extend({
		tagName:'li',
		className:function() {
			return 'line';
		},
		template:_.template(template),
		ui:{
			content:'.content'
		},
		triggers: {
				'click': 'click',
				'mouseenter':'mouseenter',
				'mouseleave':'mouseleave'
		},
		initialize:function(options) {
			this.$el.css('width',$(window).width()/options.numberOfLine+'px');
			this.$el.css('backgroundColor',options.model.get('color'));
		} 
	}); 

	return LineView;
})