define(["jquery", "backbone", "handlebars", "text!templates/tagcollection.html"], function($, Backbone, Handlebars, strHtml){
	return Backbone.View.extend({
		el: "div#pageBody",
		template: Handlebars.compile(strHtml),
		render: function(){
			this.$el.html(this.template(this.collection.toJSON()));
			return this;
		}
	})
});
