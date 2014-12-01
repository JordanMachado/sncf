define([
	'marionette',
	'./ZonesView',
	'text!../templates/LineViewTemplate.tpl'
	
],function(Marionette, ZonesView, template){
	var LineView = Backbone.Marionette.ItemView.extend({
		tagName:'li',

		childView: ZonesView,
		childViewOptions: function(line){
    		return {
    			//
    			collection: new Backbone.Collection([{id: 1,name:'1'},{id: 2,name:'2'},{id: 3,name:'3'}])
    		}
  		},

		childViewContainer: function(){
   			return ".zonesContainer";
 		},
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
			var ww = $(window).width();
			this.$el.css('width',ww/options.numberOfLine+'px');
			this.$el.css('backgroundColor',options.model.get('color'));
		},

		onRender: function(){
			//console.log(this.collection);
		} 
	}); 

	return LineView;
})