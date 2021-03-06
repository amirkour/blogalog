define(['backbone'], function(Backbone){
	var TagModelForCollection = Backbone.Model.extend({
		idAttribute: "_id"
	});

	return Backbone.Collection.extend({
		model: TagModelForCollection,
		url: '/tags'
	})
})