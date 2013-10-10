define(["jquery", "backbone", "handlebars", "text!templates/home.html", "helpers/bodyrendering"], function($, Backbone, Handlebars, strHtml, BodyRenderingHelper){
	return Backbone.View.extend({
		initialize: function(options){
			this.$el = $("div#pageBody");
			this.templateFn = Handlebars.compile(strHtml);
		},
		render: function(){
			var pModelAttributes=this.model.attributes;

			// compile the body, delegating to rendering helper for templates
			var strBodyHtml='';
			if(pModelAttributes.bodySections){
				for(var i = 0, iLen=pModelAttributes.bodySections.length; i < iLen; i++){
					var bodySection=pModelAttributes.bodySections[i];
					var renderer = BodyRenderingHelper.getRenderingFunctionForBodyType(bodySection.type);
					strBodyHtml += renderer(bodySection);
				}
			}

			this.$el.html(this.templateFn({
				title: pModelAttributes.title,
				body: strBodyHtml,
				tags: pModelAttributes.tags
			}));
			return this;
		}
	})
});
