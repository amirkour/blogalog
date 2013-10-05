define([ 'backbone', 'views/views', 'models/models', 'module'],
	function(Backbone,  Views, Models, module){

		var BlogalogRouter = Backbone.Router.extend({
			routes:{
				"": "homeRoute",
				"/": "homeRoute",
				"about": "aboutRoute",
				"tags": "tagsHomeRoute",
				"tags/:name": "tagsSpecificRoute"
			},

			homeRoute: function(){
				var pageConfig=module.config() || {};
				var initialModelJSON=pageConfig.initialEntry || {title: "no entries detected!?", body: "phooey ..."};
				var model=new Models.EntryModel(initialModelJSON);
				var view=new Views.HomeView({model: model});
				view.render();
			},

			aboutRoute: function(){
				var view=new Views.AboutView();
				view.render();
			},

			tagsHomeRoute: function(){
				alert("tags landing page");
			},

			tagsSpecificRoute: function(name){
				alert("tags details page for " + name);
			}
		});

		return function(){
			var router=new BlogalogRouter();
			Backbone.history.start();
		};
	}
);
