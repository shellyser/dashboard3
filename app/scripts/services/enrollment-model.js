angular.module('dashApp')
.service('EnrollmentModel', function ($http) {
	var enrollmentModel = this,
		URLS = {
			FETCH: '/data/enrollment'+'.json',
		};

	enrollmentModel.getEnrollments = function (){
		$http.get(URLS.FETCH, {cache: true})
            .success(callback)
            .error(function(){
              $('#loading').hide();
              alert('There was an error getting program data. Try refreshing the page.');
            });
    	}
});

