angular.module('dashApp.models.drevents', [

  ])
  
	.service('DreventsModel', function ($http, $q) {
		var model = this,
			URLS = {
				FETCH: 'data/drevents.json'
			},
			drevents,
			currentDrevent;

		function extract(result){
			return result.data;
		}

		function cacheDrevents(result){
			categories = extract(result);
			return categories;
		}

		// model.getDrevents = function(){
		// 	return (drevents) ? $q.when(drevents) : $http.get(URLS.FETCH).then(cacheDrevents);
		// };

		// model.setCurrentDrevent = function(dreventDate){
		// 	return model.getDreventByDate(dreventDate)
		// 		.then(function(drevent){
		// 			currentDrevent = category;
		// 		});
		// };

		// model.getCurrentDrevent = function(){
		// 	return currentCategory;
		// };

		// model.getCurrentDreventDate = function(){
		// 	return currentDrevent ? currentDrevent : '' ;
		// };

		model.getDreventByDate = function (dreventDate){
			var deferred = $q.defer();

			// function findDrevent(){
			// 	return
			// }
		}
	})
;