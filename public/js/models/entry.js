define(['backbone','handlebars'], function(Backbone,Handlebars){
	return Backbone.Model.extend({
		defaults: {
			title: null,		// title of blog entry
			bodySections: null,	// list of hashes with :type and :text keys
			id: null,			// mongo bson
			created_at: null,	// iso8601 formatted date, UTC
			tags: null			// a list of strings
		},
		urlRoot: "/entries"
	});
});