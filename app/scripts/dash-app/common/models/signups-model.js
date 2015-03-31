angular.module('dashApp.models.signups', [

])

	.service('SignupModel', function ($http, $q) {
		var model = this,
			URLS = {
				FETCH: '/data/enrollment/signup'+'.json',
			},
			signups;

			function extract(result){
					return result.data;
			}

			function cacheSignups(result){
				signups = extract(result);
				return signups;
			}

			model.getSignups = function(params){
				return (signups) ? $q.when(signups) : $http.get(URLS.FETCH, params, {cache:true}).then(cacheSignups);
			}
	})

	