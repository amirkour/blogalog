define(['jquery', 'backbone', 'handlebars', 'models/entrycollection', 'text!templates/tag.html'], function($, Backbone, Handlebars, EntryCollection, strHtml){
	return Backbone.View.extend({
		initialize: function(options){
			this.$el = $("div#pageBody");
			this.templateFn = Handlebars.compile(strHtml);
		},
		render: function(){
			var pViewModel = {
				tag: this.model.attributes,
				entries: this.collection.toJSON()
			};
			this.$el.html(this.templateFn(pViewModel));
			return this;
		}
	});
});
