'use strict';

angular.module('dashApp')
  .filter('urlify', function () {
    return function (input) {
      if (input.indexOf("/") > -1){ 
      		var new_input = input.replace('/','');
      		return new_input;
      }
      else if (input.indexOf(" ") > -1){
        var new_input = input.replace(' ','');
          return new_input;
      }
      else if (input.indexOf("-") > -1){
        var new_input = input.replace('-','');
          return new_input;
      }
      else{
      	return input;
      }
    };
  });

