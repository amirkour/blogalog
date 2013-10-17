define(["jquery", "backbone", "handlebars", "text!templates/error.html"], function($, Backbone, Handlebars, strHtml){
	return Backbone.View.extend({
		el: "div#pageBody",
		template: Handlebars.compile(strHtml),
		render: function(){
			var pModel=this.model ? this.model.attributes : {error: 'No error details available'};
			this.$el.html(this.template(pModel));
			return this;
		}
	})
});