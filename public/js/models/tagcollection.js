define(['backbone', 'models/tag'], function(Backbone, TagModel){
	return Backbone.Collection.extend({
		model: TagModel,
		url: '/tags'
	})
})