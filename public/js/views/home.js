define(["jquery", "backbone", "handlebars", "text!templates/home.html", "helpers/bodyrendering"], function($, Backbone, Handlebars, strHtml, BodyRenderingHelper){
	return Backbone.View.extend({
		el: "div#pageBody",
		template: Handlebars.compile(strHtml),
		render: function(){

			var pModelAttributes=this.model;
			if(!pModelAttributes) return;
			if(!pModelAttributes.blogEntry) return;

			var blogEntry = pModelAttributes.blogEntry;
			var loggedInUser = pModelAttributes.loggedInUser;

			// compile the body, delegating to rendering helper for templates
			var strBodyHtml='';
			if(blogEntry.bodySections){
				for(var i = 0, iLen=blogEntry.bodySections.length; i < iLen; i++){
					var bodySection=blogEntry.bodySections[i];
					var renderer = BodyRenderingHelper.getRenderingFunctionForBodyType(bodySection.type);
					strBodyHtml += renderer(bodySection);
				}
			}

			this.$el.html(this.template({
				title: blogEntry.title,
				body: strBodyHtml,
				tags: blogEntry.tags,
				user: loggedInUser
			}));
			return this;
		}
	})
});
