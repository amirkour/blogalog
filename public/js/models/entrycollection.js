define(['backbone','models/entry'], function(Backbone, EntryModel){
	return Backbone.Collection.extend({
		model: EntryModel,
		initialize: function(options){
			var strUrlTagName=options.tag || '';
			this.url='/tags/' + strUrlTagName;
		}
	})
})