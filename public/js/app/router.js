define([ 'backbone', 'views/views', 'models/models', 'module'],
	function(Backbone,  Views, Models, module){

		var BlogalogRouter = Backbone.Router.extend({
			routes:{
				"": "homeRoute",
				"/": "homeRoute",
				"about": "aboutRoute",
				"tags": "tagsHomeRoute",
				"tags/:name": "tagsSpecificRoute",
				"entries/:id": "entryRoute",
				"authorized": "homeRoute"			// is the redirect after logging in succeeds
			},

			homeRoute: function(){

				// blog entry to display, as well as logged-in user info are bootstrapped from layout.haml
				var pageConfig=module.config() || {};
				var blogEntry=pageConfig.initialEntry;
				var loggedInUser=pageConfig.loggedInUser;

				// home page model is just arbitrary json in this case - no an actual BB model
				var model={blogEntry: blogEntry, loggedInUser: loggedInUser};
				var view=new Views.HomeView({model: model});
				view.render();
			},

			aboutRoute: function(){
				var view=new Views.AboutView();
				view.render();
			},

			tagsHomeRoute: function(){
				var tags=new Models.TagCollection();
				tags.fetch({
					success: function(collection,response,options){
						var view=new Views.TagCollectionView({collection: collection});
						view.render();
					},
					error: function(collection,response,options){
						var view=new Views.ErrorView({model: new Backbone.Model(response.responseJSON)});
						view.render();
					}
				})
			},

			tagsSpecificRoute: function(name){
				var tag=new Backbone.Model({tag:name});
				var entries=new Models.EntryCollection({tag:name});
				entries.fetch({
					success: function(collection,response,options){
						var view=new Views.TagView({model:tag, collection:collection});
						view.render();
					},
					error: function(collection,response,options){
						var view=new Views.ErrorView({model: new Backbone.Model(response.responseJSON)});
						view.render();
					}
				})
			},

			entryRoute: function(id){
				var pageConfig=module.config() || {};
				var loggedInUser=pageConfig.loggedInUser;

				var model=new Models.EntryModel({id:id});
				model.fetch({
					success: function(model, response, options){
						var homeViewModel={blogEntry: model.attributes, loggedInUser: loggedInUser};
						var view=new Views.HomeView({model: homeViewModel});
						view.render();
					},
					error: function(model, response, options){
						var view=new Views.ErrorView({model: new Backbone.Model(response.responseJSON)});
						view.render();
					}
				})
			}
		});

		return function(){
			var router=new BlogalogRouter();
			Backbone.history.start();
		};
	}
);
