angular.module('dashApp.models.online', [

])
	.service('OnlineModel', function ($http, $q) {
		var model = this,
			URLS = {
				FETCH: '/data/enrollment/online'+'.json',
			},
			online;

			function extract(result){
					return result.data;
			}

			function cacheOnline(result){
				online = extract(result);
				return online;
			}

			model.getOnline = function(params){
				return (online) ? $q.when(online) : $http.get(URLS.FETCH, params, {cache:true}).then(cacheOnline);
			}
	})

;