define(['backbone','handlebars'], function(Backbone,Handlebars){
	var EntryModel = Backbone.Model.extend({
		urlRoot: "/entries"
	});

	return EntryModel;
});