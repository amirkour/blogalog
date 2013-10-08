define(["jquery", "backbone", "handlebars", "text!templates/tagcollection.html"], function($, Backbone, Handlebars, strHtml){
	return Backbone.View.extend({
		initialize: function(options){
			this.$el = $("div#pageBody");
			this.templateFn = Handlebars.compile(strHtml);
		},
		render: function(){
			this.$el.html(this.templateFn(this.collection.toJSON()));
			return this;
		}
	})
});
