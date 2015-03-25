angular.module('dashApp')
.directive('distributedgraph', function ($timeout) {
  return {
    restrict: 'A',
    link: function postLink(scope, elem, attrs) {  
      scope.$watch('graph', function() {
        $timeout(function() {
            populateGraph();
          })
      }, true);


      function populateGraph(){
        var canvas = elem[0];
        var canvasId = elem.attr("id");
        animate = ANIMATE_GRAPH,
        points = [],
        allOptionsUnchecked = false,
        width = elem.closest('.module').css('width');
        
        //set canvas to width of parent
        elem.attr("id", canvasId).css('width',width);  

        //eliminates any existing instance of Chart
        for (var instance in Chart.instances){
                if (Chart.instances[instance].chart.canvas.id === canvasId){
                  Chart.instances[instance].destroy();
                }
              }

              for (var datasets in scope.graph){
                points.push(scope.graph[datasets].datasets);
              }
                
 
        var autosize = false,
        dataForGraphing = [],
        animate = true,
        labels = scope.graph[0].labels,
        MAX_X_AXIS_POINTS = 31,
        underPointCountThreshold = labels.length <= MAX_X_AXIS_POINTS,
        hasZeroInData = false,
        max = 0,
        min = 0,
        total = 0,
        lineColor,
        fillColor,
        color = elem.closest('.module').find('.module-header').css('color');

        // graph colors are based on the color of the bar at the top of the module
        color = color.replace('rgb', 'rgba');
        fillColor = color.replace(')', ', 0.3)');
        lineColor = color.replace(')', ', 1)');

        for (var pointSet in points){ 
          var checkbox;
          if (points.length == 1){
            if (elem.closest('.module-body').find('.module-view-options-checkbox label:eq(0) input').attr("checked") === "checked"){
              checkbox = 0;
            }
            else{
              checkbox = 1;
            }
          } else {
            checkbox = pointSet;
          }
          var factor = -30,
          difference = 0,
          differenceIsSignificant = true,
          r = parseInt(fillColor.split(',')[0].split('(')[1]) + factor*checkbox,
          g = parseInt(fillColor.split(',')[1]) + factor*checkbox,
          b = parseInt(fillColor.split(',')[2]) + factor*checkbox,
          newFillColor = 'rgba(' + r + ', ' + g + ', ' + b + ', .35)',
          newLineColor = newFillColor.replace('.35', '1'),
          pointSetCheck = elem.closest('.module-body')
          .find('.module-view-options-checkbox label:eq(' + checkbox + ')');
          dataForGraphing.push({
            data: points[pointSet].data,
            fillColor: newFillColor,
            strokeColor: newLineColor,// 'rgba(0, 0, 0, 0)',
            pointStrokeColor: newLineColor,
            pointColor: 'rgba(240, 240, 240, 1)'
          });
          pointSetCheck.css('color', newLineColor);
          // construct total and max of data
          for (i in points[pointSet].data){
            if ((parseInt(pointSet) === 0) && (parseInt(i) === 0)){
              min = points[pointSet].data[i];
            }
            if (points[pointSet].data[i] === 0){
              hasZeroInData = true;
            }
            if (points[pointSet].data[i] > max){
              max = points[pointSet].data[i];
            }
            else if (points[pointSet].data[i] < min){
              min = points[pointSet].data[i];
            }
          }
          // check if the difference between the datasets is significant
          // relative to the actual values in the datasets
          difference = max - min;
          differenceIsSignificant = (difference/((min + max)/2)) > .1;
          // if the difference isn't signficant,
          // tweak the min and max to emphasize
          // absolute rather than relative values
          if (!differenceIsSignificant){
            var factor = 2;
            min = min/factor;
            max = max + (max/(factor*factor));
          }
          constructedTotal = true;
        }
      var underPointCountThreshold = labels.length <= MAX_X_AXIS_POINTS;
        showGraphArea(true);
        // getting info into the right format for chartjs
        var graphData = {
          labels: labels,
          datasets: dataForGraphing
        },
        calcNewMin = false,
        step = 0,
        options = {
          scaleOverride: true,
          scaleSteps: 10,
          scaleFontFamily: 'PT Sans, sans-serif',
          scaleFontStyle: 'bold',
          scaleIntegersOnly: true,
          bezierCurve: false,
          pointDot: underPointCountThreshold,
          pointDotStrokeWidth: 2,
          datasetStroke : !underPointCountThreshold,
          datasetStrokeWidth : 1,
          scaleLabel: '<%=value%>   ',
          responsive: true,
          maintainAspectRatio: false,
          tooltipTemplate: '<%= value %>',
          multiTooltipTemplate: '<%= value %>',
          tooltipFillColor: 'rgba(0, 0, 0, 0.6)',
          tooltipFontFamily: 'PT Sans, sans-serif',
          pointHitDetectionRadius: underPointCountThreshold ? Math.min(16, 16*(5/graphData.labels.length)) : 0,
          showXLabels: underPointCountThreshold ? true : MAX_X_AXIS_POINTS
        };
        options.animation = underPointCountThreshold ? animate : false;
        if (scope.params.viewtype.toLowerCase() !== 'cumulative'){
          var startVal = 0;
          if (min < 0){
            startVal = -1*(snapTo(-1*min));
            if (max <= 0){
              max = 5;
            }
          }
          if ((startVal == 0) && hasZeroInData){
            startVal = -5;
          }
          options.scaleStartValue = startVal;
          step = Math.ceil((max - startVal)/10);
          if (step*10 === max){
            step += step;
          }
        }
        else{
          if (min < 1000){
            min = Math.floor(min*0.95);
          }
          else{
            min = min - 50;
          }
          calcNewMin = true;
          options.scaleStartValue = min;
          step = Math.ceil((max - min)/10);
        } 
        
        // let's draw!
        elem.show();
        step = fitStepToContext(snapTo(step), min.toString().length);
        options.scaleStepWidth = step;

        min = Math.round(min);
        max = Math.round(max);

        if (calcNewMin){
          var graphDims = calcMinAndStep(min, max, step);
          options.scaleStartValue = graphDims.min;
          options.scaleStepWidth = graphDims.step;
        }
        // scope.graph = graphData;
        var ctx = canvas.getContext("2d");
        var newGraph = new Chart(ctx).Line(graphData, options);
        showGraphArea();
      }

      function calcMinAndStep(min, max, step){
        var solution = {
          'min': min,
          'step': step
        };
        var tempMin = (Math.floor(min/step))*step;
        if ((tempMin + step*10) > max){
          solution.min = tempMin;
        }
        else{
          return calcMinAndStep(min, max, fitStepToContext(stepUp(step), min.toString().length));
        }
        if (endsWith(step.toString(), '90')){
          solution.step = solution.step + 10;
        }
        else if (endsWith(step.toString(), '40')){
          solution.step = solution.step + 60;
        }
        else if (endsWith(step.toString(), '60')){
          solution.step = solution.step + 40;
        }
        else if (endsWith(step.toString(), '70')){
          solution.step = solution.step + 30;
        }
        else if (endsWith(step.toString(), '80')){
          solution.step = solution.step + 20;
        }
        return solution;
      }

      // if we're dealing with large numbers,
      // limit how small the graph's step can be
      function fitStepToContext(step, order){
        if ((4 <= order) && (order < 6)){
          return Math.max(step, 50);
        }
        else if (6 <= order){
          return Math.max(step, 100);
        }
        return step;
      }

      // increment step size
      function stepUp(val){
        var steps = [1, 2, 5, 25];
        if (val%10 === 0){
          return val+10;
        }
        if (val%5 === 0){
          return val+5;
        }
        else{
          var index = steps.indexOf(val);
          if (index === -1){
            val = parseInt(Math.round((val*1.5)/10));
            return val*10;
          }
          if (index === steps.length){
            return val+5;
          }
          else{
            return steps[index + 1];
          }
        }
      }

      // to see if a substring is at the end of a string
      function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      }

      function snapTo(val){
        if (val%10 === 0){
          return snapTo(val + 5);
        }
        else if ((0 < val) && (val <= 5)){
          return 5;
        }
        else if ((5 < val) && (val <= 10)){
          return 10;
        }
        else if ((10 < val) && (val <= 20)){
          return 20;
        }
        else if ((20 < val) && (val <= 25)){
          return 25;
        }
        else if ((25 < val) && (val <= 50)){
          return 50;
        }
        else if ((50 < val) && (val <= 100)){
          return 100;
        }
        else if ((100 < val) && (val <= 1000)){
          return (val/100)*100;
        }
        return (val/200)*200;
      }


      function noData(){
          elem.parent().hide();
          showGraphArea(false);
          elem.closest('.module-body').find('.module-body-stat').text('\u2014');
          elem.closest('.module-body').prev().find('.module-stat').text('\u2014');
      }

      function showLoading(){
        elem.closest('.module-body').find('.module-loading').fadeIn();
        elem.parent().fadeOut();
        elem.parent().next().fadeOut();
      }

      function showGraphArea(data){
        elem.closest('.module-body').find('.module-loading').fadeOut();
        if (data ===  true || data === undefined){
          elem.parent().fadeIn();
        }
        if (data === false || data === undefined){
          elem.parent().next().fadeIn();
        }
      }
    }
  };
});