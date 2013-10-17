define(["jquery", "backbone", "handlebars", "text!templates/about.html"], function($, Backbone, Handlebars, strHtml){
	return Backbone.View.extend({
		el: "div#pageBody",
		template: Handlebars.compile(strHtml),
		render: function(){
			this.$el.html(this.template());
			return this;
		}
	})
});