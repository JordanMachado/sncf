define([
	'backbone',
	'underscore',
	'asEvents'
]
, function(Backbone, _,asEvents){

	Backbone.View.prototype._resize = function(){

		if(this.onResize) this.onResize.apply(this, arguments);
		this.trigger('resize', arguments);
	};

	Backbone.View.prototype.onResize = function(){};

	var delegateEvents = Backbone.View.prototype.delegateEvents;

	Backbone.View.prototype.delegateEvents = function(events){
		this.listenTo(asEvents(window), 'resize', _.debounce(this._resize.bind(this), 100));
		return delegateEvents.apply(this, arguments);
	}
});