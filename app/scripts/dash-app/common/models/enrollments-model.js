angular.module('dashApp.models.enrollments', [

  ])

	.service('EnrollmentModel', function ($http) {
		var model = this,
		URLS = {
			FETCH: 'data/enrollment/enrollment.json'
		},
		enrollments;

		function extract(result) {
			return result.data;
		}

		function cacheEnrollments(result){
			enrollments = extract(result);
			return enrollments;
		}

		model.getEnrollments = function(){
			return $http.get(URLS.FETCH).then(cacheEnrollments);
		}
	})    

		.factory('Enrollmentdata', ['$resource', function ($resource) {
	    return $resource('/data/enrollment/:enrollmentController'+'.json', 
	      {
	      enrollmentController: "@enrollmentController"
	      },
	      {
	        'enrollment': { 
	          method: 'GET', 
	          params:{
	            enrollmentController: "enrollment"
	          },
	          isArray: false
	        }
	      });
	}])      

;