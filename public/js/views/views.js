define([
	"views/error",
	"views/home",
	"views/about",
	"views/tagcollection"
],
function(ErrorView,
		 HomeView,
		 AboutView,
		 TagCollectionView){
	return {
		ErrorView: ErrorView,
		HomeView: HomeView,
		AboutView: AboutView,
		TagCollectionView: TagCollectionView
	};
});