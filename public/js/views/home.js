define(["jquery", "backbone", "handlebars", "text!templates/home.html"], function($, Backbone, Handlebars, strHtml){
	return Backbone.View.extend({
		initialize: function(options){
			this.$el = $("div#pageBody");
			this.templateFn = Handlebars.compile(strHtml);
		},
		render: function(){
			this.$el.html(this.templateFn(this.model.attributes));
			return this;
		}
	})
});
