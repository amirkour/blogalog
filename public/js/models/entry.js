define(['backbone','handlebars'], function(Backbone,Handlebars){
	var EntryModel = Backbone.Model.extend({
		defaults:{
			title: "No Title",
			body: ""
		},

		url: "entries",

		initialize: function(){
			
		}
	});

	return EntryModel;
});