define([
	'models/entry',
	'models/tagcollection'
],
function(EntryModel,
		 TagCollection){
	return {
		EntryModel: EntryModel,
		TagCollection: TagCollection
	};
});
