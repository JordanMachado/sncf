define(['backbone'],function(Backbone){
	'use strict;'
	var GareModel = Backbone.Model.extend({

	});

	var GareCollection = Backbone.Collection.extend({
		model: GareModel,
		comparator: "libelle_point_arret"
	});

	return GareCollection;
});