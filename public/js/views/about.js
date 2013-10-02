define(["jquery", "backbone", "handlebars", "text!templates/about.html"], function($, Backbone, Handlebars, strHtml){
	return Backbone.View.extend({
		
		initialize: function(options){
			this.$el = $("div#pageBody");
			this.templateFn = Handlebars.compile(strHtml);
		},
		render: function(){
			this.$el.html(this.templateFn({foo:"bar"}));
			return this;
		}
	})
});