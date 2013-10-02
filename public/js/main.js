// baseUrl will be /js/ b/c data-main=js/main
requirejs.config({

	// gotta ditch this when you go to prod
	urlArgs: 'bust=' + (new Date()).getTime(),

	// define path aliases for the shim libraries
	paths: {
		"jquery": "lib/jquery",
		"underscore": "lib/underscore",
		"backbone": "lib/backbone",
		"bootstrap": "lib/bootstrap",
		"handlebars": "lib/handlebars",
		"text": "lib/text",
		"domReady": "lib/domReady"
	},
	shim: {
		// this is the ID of the module - this is what you 'depend' on
		'jquery':{
			exports: '$' // has to match the global export, per "shim" pattern
		},
		'underscore':{
			exports: '_'
		},
		'backbone':{
			deps: ['jquery','underscore'],
			exports: 'Backbone'
		},
		'bootstrap': ['jquery'],
		'handlebars':{
			deps: [],
			exports: 'Handlebars'
		}
	}
});

require(['bootstrap', 'domReady', 'app/router'], function(undefined, domReady, AppStartFunction){
	domReady(function(){
		AppStartFunction.call();
	})
});
