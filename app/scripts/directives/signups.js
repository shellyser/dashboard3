angular.module('dashApp')
.directive('signups', function () {
	return {
		restrict: 'A',
		link: function postLink(scope, elem, attrs) {
			function populateGraph(){
			var ctx = elem[0].getContext("2d");
			var autosize = false,
			animate = false,
			labels = scope.graph.labels,
			datasets = scope.graph.datasets[0],
			underPointCountThreshold = labels.length <= 31,
			options = {
				scaleOverride: false,
				scaleSteps: 10,
				scaleFontFamily: 'PT Sans, sans-serif',
				scaleFontStyle: 'bold',
				scaleIntegersOnly: true,
				bezierCurve: true,
				pointDot: underPointCountThreshold,
				pointDotStrokeWidth: 1,
				datasetStroke : !underPointCountThreshold,
				datasetStrokeWidth : 1,
				scaleLabel: '<%=value%>',
				responsive: true,
				maintainAspectRatio: false,
				tooltipTemplate: '<%= value %>',
				multiTooltipTemplate: '<%= value %>',
				tooltipFillColor: 'rgba(0, 0, 0, 0.6)',
				tooltipFontFamily: 'PT Sans, sans-serif',
				pointHitDetectionRadius: underPointCountThreshold ? Math.min(16, 16*(5/scope.graph.labels.length)) : 0,
				showXLabels: underPointCountThreshold ? true : 31
			},
				lineColor,
				fillColor,
				color = $('canvas').closest('.module').find('.module-header').css('color');

			// graph colors are based on the color of the bar at the top of the module
			color = color.replace('rgb', 'rgba');
			fillColor = color.replace(')', ', 0.3)');
			lineColor = color.replace(')', ', 1)');

			var moreDatasets = {
				data: datasets.data,
				label: datasets.label,
				fillColor: fillColor,
				strokeColor: lineColor,//'rgba(0, 0, 0, 0)',
				pointStrokeColor: lineColor,
				pointColor: 'rgba(240, 240, 240, 1)'
				
			}

			scope.graph.datasets = [],
			scope.graph.datasets.push(moreDatasets);
			options.animation = underPointCountThreshold ? animate : false;
			options.animation = true;

			scope.size = function () {
				elem.width(elem.parent().width());
				ctx.canvas.width = elem.width();
				elem.height(elem.parent().height());
				ctx.canvas.height = ctx.canvas.width / 2;
			}
				
			scope.size();
			var newGraph = new Chart(ctx).Line(scope.graph);
			if (newGraph){
				elem.closest('.module-body').find('.module-loading').fadeOut();
			}
		}
			scope.$watch('params', function(newValue, oldValue) {
        if (newValue)
        	populateGraph();
      }, true);
	  }
  };
});