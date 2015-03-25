'use strict';

/**
 * @ngdoc directive
 * @name dashApp.directive:dateRangeInput
 * @description
 * # dateRangeInput
 */
angular.module('dashApp')
  .directive('dateRangeInput', function ($timeout,  $interval) {
    return {
      restrict: 'A',
      link: function postLink(scope, elt, attrs) {
        elt.find('span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
         
        elt.daterangepicker({
            format: 'MM/DD/YYYY',
            startDate: scope.dates.startDate,
            endDate: scope.dates.endDate,
            minDate: '01/01/2012',
            maxDate: moment(),
            dateLimit: { days: 60 },
            showDropdowns: true,
            showWeekNumbers: true,
            timePicker: false,
            timePickerIncrement: 1,
            timePicker12Hour: true,
            ranges: {
               'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: 'left',
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn-primary',
            cancelClass: 'btn-default',
            separator: ' to ',
            locale: {
                applyLabel: 'Submit',
                cancelLabel: 'Cancel',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 1
            }
        }, function(start, end, label) {
            if ((scope.dates.startDate !== start.format('MM/DD/YYYY')) || (scope.dates.endDate !== end.format('MM/DD/YYYY'))){
              $timeout(function(){
                if (scope.dates.startDate !== start.format('MM/DD/YYYY')){
                  scope.dates.startDate = start.format('MM/DD/YYYY');
                }
                if (scope.dates.endDate !== end.format('MM/DD/YYYY')){
                  scope.dates.endDate = end.format('MM/DD/YYYY');
                }
              });
            }
            console.log(start.toISOString(), end.toISOString(), label);
            elt.find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        });

      }
    };
  });