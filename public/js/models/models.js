define([
	'models/entry',
	'models/tag',
	'models/tagcollection'
],
function(EntryModel,
		 TagModel,
		 TagCollection){
	return {
		EntryModel: EntryModel,
		TagModel: TagModel,
		TagCollection: TagCollection
	};
});
