define(['backbone'],function(Backbone){
	'use strict;'
	var LineModel = Backbone.Model.extend({

	});

	var LineCollection = Backbone.Collection.extend({
		model: LineModel
	});

	return LineCollection;
});