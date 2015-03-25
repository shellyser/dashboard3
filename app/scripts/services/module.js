 'use strict';
/*global alert:false */
// /*global $:false */


/**
 * @ngdoc service
 * @name dashApp.module
 * @description
 * # module
 * Service in the dashApp.
 */
angular.module('dashApp')
  .service('module', function module($cacheFactory, Enrollmentdata) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var cache = $cacheFactory('modules');

    function getModule(name, startDate, endDate, product, success, failure){
        var cacheData = cache.get(name);

        if (cacheData === undefined || startDate !== null){
          var str = 'signup';
          if (name === 'Distributed'){
            str = 'distributed';
          }
          else if (name === 'Set-ups'){
            str = 'setups';
          }
          // else if (name === 'Opt-outs'){
          //   str = 'optout';
          // }
          else if (name === 'Callable Load'){
            str = 'online';
          }
          // var str = 'signup';
          // $http.get(url + str + "?startDate=" + startDate + "&endDate=" + endDate, { timeout: timeout })
            // var enrollment = Enrollmentdata[str]({"startDate": startDate, "endDate": endDate, "product": product}, 
              var enrollment = Enrollmentdata[str]({"startDate": null, "endDate": null, "product": null}, 
              function(data){
              if (success){
                  
                  if (data !== undefined){
                      
                      success(data);
                      console.log(data);
                  }
                  else{
                    failure(str);
                  }
              }
          },
          function(error){
            alert('getting data failed. Try refreshing the page.');
             console.log(enrollment);
          }
        )
         }
        else{
          success(name, cacheData);
        }
    }
    return {
        getModule: getModule
    };
  });