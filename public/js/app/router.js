define([ 'backbone', 'views/views', 'models/models', 'module'],
	function(Backbone,  Views, Models, module){

		var BlogalogRouter = Backbone.Router.extend({
			routes:{
				"": "rootRoute",
				"about": "aboutRoute"
			},

			rootRoute: function(){

			},

			aboutRoute: function(){
				var view=new Views.AboutView();
				view.render();
			}
		});

		return function(){
			var router=new BlogalogRouter();
			Backbone.history.start();
		};
	}
);
