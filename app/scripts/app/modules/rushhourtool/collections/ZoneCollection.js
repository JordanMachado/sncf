define(['backbone'],function(Backbone){
	'use strict;'
	var ZoneModel = Backbone.Model.extend({

	});

	var ZoneCollection = Backbone.Collection.extend({
		model: ZoneModel
	});

	return ZoneCollection;
});