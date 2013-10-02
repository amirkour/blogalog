define([    'jquery', 'underscore', 'backbone', 'module', 'bootstrap'], //bootstrap doesn't export anything!
	function($,        _,            Backbone,  module){

		// TODO - routers and backbone.history.start
		function dostuff(){
			var i = module.config();
			var j=123;
		}

		return {
			start: function(){
				dostuff();
			}
		}
	}
);
