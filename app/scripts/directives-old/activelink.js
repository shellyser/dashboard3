'use strict';

angular.module('dashApp')
.directive('activeLink', [ '$animate', function($animate) {
	return function(scope, element, attrs) {
	    	var clickClassName = 'on';
	    	element.on('click', function(event) {
		     	 event.preventDefault(); 
		     	 element.hasClass(clickClassName) ?
		        $animate.removeClass(element, clickClassName) :
		        $animate.addClass(element, clickClassName);
		});
	 };
}]);