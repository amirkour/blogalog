define([
	"views/error",
	"views/home",
	"views/about"
],
function(ErrorView,
		 HomeView,
		 AboutView){
	return {
		ErrorView: ErrorView,
		HomeView: HomeView,
		AboutView: AboutView
	};
});