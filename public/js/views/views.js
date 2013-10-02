define([
	"views/home",
	"views/about"
],
function(HomeView,
		 AboutView){
	return {
		HomeView: HomeView,
		AboutView: AboutView
	};
});