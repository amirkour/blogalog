define(["jquery", "backbone", "handlebars", "text!templates/error.html"], function($, Backbone, Handlebars, strHtml){
	return Backbone.View.extend({
		initialize: function(options){
			this.$el = $("div#pageBody");
			this.templateFn = Handlebars.compile(strHtml);
		},
		render: function(){
			var pModel=this.model ? this.model.attributes : {error: 'No error details available'};
			this.$el.html(this.templateFn(pModel));
			return this;
		}
	})
});