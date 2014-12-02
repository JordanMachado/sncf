define([
	'marionette',
	'text!../templates/LineViewTemplate.tpl'
	
],function(Marionette, template){
	var LineView = Backbone.Marionette.ItemView.extend({
		tagName:'li',

		className:'line',

		template:_.template(template),

		// serializeData: function() {
		// 	return _.extend(this.model.toJSON(), {
		// 		//create method getZoneByLine
		// 		zones: ['a','b','c']
		// 	})
		// },

		triggers: {
				'click': 'click',
				'mouseenter':'mouseenter',
				'mouseleave':'mouseleave',
		},
		initialize:function(options) {
			var ww = $(window).width();
			this.$el.css('width',ww/options.numberOfLine+'px');
			this.$el.css('backgroundColor',options.model.get('color'));
		}
	}); 

	return LineView;
})