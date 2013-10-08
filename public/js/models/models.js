define([
	'models/entry',
	'models/entrycollection',
	'models/tagcollection'
],
function(EntryModel,
		 EntryCollection,
		 TagCollection){
	return {
		EntryModel: EntryModel,
		EntryCollection: EntryCollection,
		TagCollection: TagCollection
	};
});
