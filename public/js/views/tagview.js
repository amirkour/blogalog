define(['jquery', 'backbone', 'handlebars', 'models/entrycollection', 'text!templates/tag.html'], function($, Backbone, Handlebars, EntryCollection, strHtml){
	return Backbone.View.extend({
		el: "div#pageBody",
		template: Handlebars.compile(strHtml),
		render: function(){
			var pViewModel = {
				tag: this.model.attributes,
				entries: this.collection.toJSON()
			};
			this.$el.html(this.template(pViewModel));
			return this;
		}
	});
});
