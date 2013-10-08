define([
	"views/error",
	"views/home",
	"views/about",
	"views/tagcollection",
	"views/tagview"
],
function(ErrorView,
		 HomeView,
		 AboutView,
		 TagCollectionView,
		 TagView){
	return {
		ErrorView: ErrorView,
		HomeView: HomeView,
		AboutView: AboutView,
		TagCollectionView: TagCollectionView,
		TagView: TagView
	};
});