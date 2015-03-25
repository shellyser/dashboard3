'use strict';

/**
 * @ngdoc directive
 * @name dashApp.directive:exportData
 * @description
 * # exportData
 */
angular.module('dashApp')
  .directive('exportData', function ($http) {
    return {
      restrict: 'A',
      link: function postLink(scope, elt, attrs) {

        elt.on('click', function(event){
          event.preventDefault();
          var emptyOption = false;
          // step 1: make sure we've got at least one option selected in each set
          $('#export-data-options fieldset').each(function(){
            var fieldset = $(this),
                options = 0,
                falseOptions = 0;
            fieldset.find('.option').each(function(){
              var option = $(this);
              options++;
              if (option.prop('checked') === false){
                falseOptions ++;
              }
            });
            // step 2: if we're not good, show error messages
            if (options === falseOptions){
              if (!emptyOption){
                alert("At least one option in each set must be selected. Please select options and try again.");
                emptyOption = true;
              }
            }
          })
          if (!emptyOption){
            // step 3: if we *are* good, request and download CSV
            var args = {},
              startDate = scope.viewParameters.startDate,
              endDate = scope.viewParameters.endDate;
            $('#export-data-options .option').each(function(){
              var $this = $(this);
              args[$this.attr('id').toString()] = $this.prop('checked');
            });
            args['StartDate'] = startDate;
            args['EndDate'] = endDate;
            $http.post(url + 'export/exportAsCsv', args, { timeout: timeout })
            .success(function(data){
              if ($('html').hasClass('no-adownload')){
                window.open(url + 'export/exportAsCsv?retrievalGuid=' + data.RetrievalGuid);
              }
              else{
                var tempElt = document.createElement('a');
                tempElt.href = 'data:attachment/csv;charset=utf-8,' + encodeURIComponent(data.FileContents)
                tempElt.target = '_blank';
                tempElt.download = data.FileDownloadName;
                document.body.appendChild(tempElt);
                tempElt.click();
              }
              $('#export-data-btn').trigger('click');

            })
            .error(function(){
              alert('An error occurred getting CSV data. Try again, or refresh the page first.')
            });
          }
        });
      }
    };
  });