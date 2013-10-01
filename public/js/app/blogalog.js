define([    'jquery', 'underscore', 'backbone', 'bootstrap'], //bootstrap doesn't export anything!
	function($,        _,            bb){
		return {
			start: function(){
				alert('hi there from blogalog.js!');
			}
		}
	}
);
