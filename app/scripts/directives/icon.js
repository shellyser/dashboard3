'use strict';

angular.module('dashApp')
.directive('icon', function () {
	return {
			restrict: 'A',
			link: function postLink($scope, elt) {
      			$scope.$watch('$viewContentLoaded', function(){
			        var icon = document.createElement('i'),
			        	curr = elt;
			        if (curr.hasClass('dashboard')){
			       		curr.find('em').before(icon);
			             	curr.find('i').addClass('fa fa-tachometer');
	        	   	}
         			if (curr.hasClass('enrollment')){
	            			 curr.find('em').before(icon);
	        		        curr.find('i').addClass('fa fa-plus-square-o');
      				}
         			if (curr.hasClass('drevents')){
	            			 curr.find('em').before(icon);
	        		        curr.find('i').addClass('fa fa-bullhorn');
      				}
	       			if (curr.hasClass('analytics')){
	            			 curr.find('em').before(icon);
	        		        curr.find('i').addClass('fa fa-bar-chart');
	    			}
	   			if (curr.hasClass('campaigns')){
	        			 curr.find('em').before(icon);
	    		      		 curr.find('i').addClass('fa fa-file-text-o');
				}
   			});
		}
    };
});