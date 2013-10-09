define(['backbone','models/entry'], function(Backbone, EntryModel){
	return Backbone.Collection.extend({
		model: EntryModel,
		url: '/entries',
		initialize: function(options){
			var strUrlTagName=options.tag || '';
			this.url='/tags/' + strUrlTagName;
		}
	})
})