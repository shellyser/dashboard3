'use strict';
/*global Chart:false */
/*global $:false */
/*global jQuery:false */

/**
* @ngdoc directive
* @name dashApp.directive:graph
* @description
* # graph
*/

var timeout = 20000;
var MAX_X_AXIS_POINTS = 31;
var ANIMATE_GRAPH = false;

angular.module('dashApp')
.directive('graph', function (module) {
	return {
		restrict: 'A',
		link: function postLink(scope, elt, attrs) {

			// step 1: when view parameters are modified,
			// redraw/repopulate everything in the module.
			scope.$watch('viewParameters', function(newValue, oldValue){
				console.log(attrs.graphContent);
				if (newValue){
					showLoading();

				if ((newValue.startDate !== oldValue.startDate) || (newValue.endDate !== oldValue.endDate)){
					// otherwise, start date is exclusive, and we want it to be inclusive.
					var startDateMinusOne = new Date(
						newValue.startDate.split('-')[2],
						newValue.startDate.split('-')[0] - 1,//1-12
						newValue.startDate.split('-')[1]
						);

					startDateMinusOne.setDate(startDateMinusOne.getDate()-1);
					startDateMinusOne = (startDateMinusOne.getMonth() + 1) + '-' + startDateMinusOne.getDate() + '-' + startDateMinusOne.getFullYear();
					module.getModule(attrs.graphContent, startDateMinusOne, newValue.endDate, scope.viewParameters.unit, populateModule, noData);
				}
				else{
					module.getModule(attrs.graphContent, null, null, populateModule, noData);
				}
			}
		}, true);

		scope.$on('redraw', function(event, id){
			var newStart = new Date(
				scope.viewParameters.startYear,
				scope.viewParameters.startMonth,
				scope.viewParameters.startDay
				);
			newStart.setDate(newStart.getDate()-1);
			var startStr = newStart.getMonth() + '-' + newStart.getDate() + '-' + newStart.getFullYear();
			console.log(startStr);
			var endDate = scope.viewParameters.endMonth + "-" + scope.viewParameters.endDay + "-" + scope.viewParameters.endYear;
			module.getModule(id, startStr, endDate, scope.viewParameters.unit, populateModule, noData);
		});

		var dataMultipleSets = {
			labels: [],
			points: []
		};

		// Step 2: organize module's data and add it to the scope.
		function populateModule(moduleName, data){
			var params = scope.viewParameters;
			var data = data[params.viewtype];
			console.log(params);
			// if all communication types have been deselected
			if (params.communication.length < 1){
				noData();
			}
			// if there is no data for the relevant timespan
			else if (data[params.timespan] === undefined ){
				noData();
			}
			// if there is no data for the relevant unit
			else if (data[params.timespan][params.view][params.unit] === undefined){
				noData();
			}
			else{
				//   this will hold the lists for each communicationType that we're showing on this graph
				var graphLists = {},
				//   create array of x-axis labels
				graphLabels = [],
				//   these will be the points on the graph
				graphPoints = [],
				optionsData = {};
				//   get all of the lists that we're going to show in the module.
				for (var i in params.communication){
					var list = params.communication[i];
					graphLists[list] = data[params.timespan][params.view][params.unit][list];
				}
				console.log(graphLists);
				var listCounter = 0,
				eltCounter;
				var timeDiff = 0,
				daysDiff = 0,
				tempEndDate = new Date(params.endDate),
				tempStartDate = new Date(params.startDate);
				timeDiff = Math.abs(tempEndDate.getTime() - tempStartDate.getTime());
				daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
				params.points = daysDiff;
				//   init graphPoints array with 0s
				while (graphPoints.length < params.points){
					graphPoints.push(0);
				}
				//   loop over list of every communicationType to be included
				var undefinedListsCount = 0,
				listsCount = 0;
				for (var graphList in graphLists){
					if (!graphLists[graphList]){
						undefinedListsCount++;
					}
					listsCount++;
				}
				if (undefinedListsCount < listsCount){
					var yoDawgData = {};
					for (graphList in graphLists){
						if (graphLists[graphList] !== undefined){
						//   case 1: there are no sublists; i.e., there is only one view configuration for the graph
						if (!('viewChildrenConcurrently' in graphLists[graphList])){
							eltCounter = 0;
							//   loop over all values in that list
							for (var elt in graphLists[graphList]){
								// add this value to the y-value of the relevant point
								graphPoints[eltCounter] += graphLists[graphList][elt];
								// graph's x-axis labels are pulled from the first list
								if (listCounter === 0){
									graphLabels.push(elt);
								}
								eltCounter++;
							}
							listCounter++;
							var thisGraph = {
								'labels': graphLabels,
								'points': graphPoints
							};
							scope.graphsData[moduleName] = thisGraph;
						}
						//   case 2: graphList has sublists; i.e., multiple datasets may be displayed on the graph.
						else{
							var options = Object.keys(graphLists[graphList]),
							concurrent = graphLists[graphList]
							.viewChildrenConcurrently;
							for (i = 0; i < options.length; i++){
								if (options[i] === 'viewChildrenConcurrently'){
									options.splice(i, 1);
								}
							}
							scope.graphsData[moduleName] = {
								'concurrent': concurrent,
								'options': options
							};
							for (var optionInt in options){
								if (!(options[optionInt] in optionsData)){
									optionsData[options[optionInt]] = [];
								}
							}
							// for each view option (dropdown/checkbox value)
							for (var option in optionsData){
								var currOption = optionsData[option],
								currOptionRaw = graphLists[graphList][option],
								optionLabels = Object.keys(currOptionRaw),
								// SO I HERD U LIEK DICTIONARIES
								yoDawg = false;
								for (var item in optionLabels){
									if (optionLabels[item] === 'viewChildrenConcurrently'){
										yoDawg = true;
										optionLabels.splice(item, 1);
									}
								}
								var optionPoints,
								currPoints = [],
								currPoint,
								optionDict = {};
								if (!yoDawg){
									optionPoints = [];
									// push points from raw onto arr that will actually populate graph
									for (var graphPoint in optionLabels){
										optionPoints.push(currOptionRaw[optionLabels[graphPoint]]);
									}
									if (currOption.length === 0){
										currOption.push(optionLabels);
										currOption.push(optionPoints);
										currPoints = currOption[1];
										for (currPoint in currPoints){
											currPoints[currPoint] = optionPoints[currPoint];
										}
									}
									else{
										currPoints = currOption[1];
										for (currPoint in currPoints){
											currPoints[currPoint] += optionPoints[currPoint];
										}
									}
									var labelsList = [],
									pointsList = [];
									for (var optionLabel in optionLabels){
										var currLabel = optionLabels[optionLabel];
										labelsList.push(currLabel);
										pointsList.push(currPoints[optionLabel]);
									}
									optionDict.labels = labelsList;
									optionDict.points = pointsList;
								}
								else{
									optionPoints = {};
									var yoDawgLabels = [],
									listCount = 0;
									for (item in optionLabels){
										optionPoints[optionLabels[item]] = [];
									}
									for (var yoDawgList in optionPoints){
										if (listCount === 0){
											yoDawgLabels = Object.keys(currOptionRaw[yoDawgList]);
										}
									}
									for (yoDawgList in optionPoints){
										for (var yoDawgLabel in yoDawgLabels){
											optionPoints[yoDawgList]
											.push(currOptionRaw[yoDawgList][yoDawgLabels[yoDawgLabel]]);
										}
									}
									optionDict.concurrent = currOptionRaw.viewChildrenConcurrently;
									optionDict.labels = yoDawgLabels;
									if (scope.graphsData[moduleName][option] === undefined){
										scope.graphsData[moduleName][option] = optionDict;
									}
									for (yoDawgList in optionPoints){
										if (yoDawgData[yoDawgList] === undefined){
											yoDawgData[yoDawgList] = optionPoints[yoDawgList];
										}
										else{
											for (var point in yoDawgData[yoDawgList]){
												yoDawgData[yoDawgList][point] += optionPoints[yoDawgList][point];
											}
										}
									}
								}
								if (yoDawg){
									for (var yoDawgItem in yoDawgData){
										optionDict[yoDawgItem] = yoDawgData[yoDawgItem];
									}
								}
								scope.graphsData[moduleName][option] = optionDict;
							}
						}
					}
				}

					// do any prep work for rendering the graph
					if (scope.graphsData[moduleName] !== undefined){
						setUpGraph();
					}
				}
				else{
					// data doesn't have expected structure -- check what's going on
					var listLabels = Object.keys(data[params.timespan][params.view][params.unit]),
							canary = data[params.timespan][params.view][params.unit][listLabels[0]];
					// has communicationType sublists, but they're all undefined.
					if (jQuery.type(canary) !== 'number'){
						noData();
					}
					// no communicationType sublists
					// assume these values stay constant across all communication types
					// e.g., signups, since we don't yet know the communicationType
					else{
						var graphInfo = data[params.timespan][params.view][params.unit],
						labels = Object.keys(graphInfo),
						points = [],
						dict = {};
						for (var thisLabel in labels){
							points.push(graphInfo[labels[thisLabel]]);
						}
						dict.points = points;
						dict.labels = labels;
						scope.graphsData[moduleName] = dict;
						setUpGraph();
					}
				}
			}
		}

		// Step 3: we have the module's info; now what?
		function setUpGraph(){
			// case 1: the graph's info exists in the scope
			// and graph DOES NOT HAVE subgraphs
			if (attrs.graphContent in scope.graphsData && !('concurrent' in scope.graphsData[attrs.graphContent])){
				elt.closest('.module').find('.module-view-options').hide();
				// go straight to drawing the graph -- we don't need to do anything else
				drawGraph(elt, scope.graphsData[attrs.graphContent]);
			}
			// case 2: graph's info DOES NOT EXIST in scope
			// we should never hit this point, since this condition
			// is already tested for and handled in getModule()
			else if (!(attrs.graphContent in scope.graphsData)){
				// but JUST IN CASE:
				noData();
			}
			// case 3: graph's info exists in scope
			// and graph DOES HAVE subgraphs
			else{
				// we need to render graph controls
				// and pick a dataset to turn into the graph
				console.log(scope.graphsData);
				dataMultipleSets.labels.length = 0;
				dataMultipleSets.points.length = 0;
				var module = elt.closest('.module'),
				thisGraph = scope
				.graphsData[attrs.graphContent],
				renderControls = module.find('.module-controls').children().length <= 1;
				// render a place for module's controls
				if (renderControls){
					module.find('.module-controls')
					.append('<div class="module-view-options"></div>');
				}
				module.find('.module-view-options').show();
				// if graphs are shown concurrently, render checkboxes
				var option, temp;
				if (thisGraph.concurrent){
					var checkboxes = '<div class="module-view-options-checkboxes">';
					for (option in thisGraph.options){
						temp = thisGraph.options[option];
						checkboxes = checkboxes + '<div class="module-view-options-checkbox"><input type="checkbox" class="checkbox-option" checked id="' + temp + '-option" name="' + temp + '-option" attr-dataset="' + temp + '"><label for="' + temp + '-option">' + temp + '</label></div>';
						if (option === '0'){
							dataMultipleSets.labels = thisGraph[temp].labels;
						}
						dataMultipleSets.points.push(thisGraph[temp].points);
					}
					checkboxes = checkboxes + '</div>';
					module.find('.module-view-options').empty();
					module.find('.module-view-options').append(checkboxes);
					checkboxControls(module.find('.module-view-options'));
					drawGraph(elt, dataMultipleSets, true);
				}
				// if graphs are shown separately, render a dropdown
				else{
					var dropdown = '<select class="module-view-options-dropdown">';
					for (option in thisGraph.options){
						temp = thisGraph.options[option];
						dropdown = dropdown + '<option value="' + temp + '">' + temp.charAt(0).toUpperCase() + temp.slice(1) + '</option>';
					}
					dropdown = dropdown + '</select>';
					module.find('.module-view-options').empty();
					module.find('.module-view-options').append(dropdown);
					dropdownControls(module.find('.module-view-options'));
					drawGraph(elt, thisGraph[thisGraph.options[0]]);
				}
			}
		}

		// Step 4 (final step): draw the graph.
		function drawGraph(canvas, data, multipleDatasets, hiddenIndices, showYoDawgNav){
			canvas.next().hide();
			// sets canvas width in px based on width of module header (can't use module body, since this is hidden at smaller resolutions)
			var canvasId = canvas.attr('id'),
			animate = ANIMATE_GRAPH,
			allOptionsUnchecked = false,
			width = canvas
			.closest('.module')
			.css('width');
			// height = canvas
			//     .closest('.module')
			//     .find('.module-header')
			//     .css('height');

			canvas.css('width', width);  
			console.log(width);         

			for (var instance in Chart.instances){
				if (Chart.instances[instance].chart.canvas.id === canvasId){
					Chart.instances[instance].destroy();
				}
			}
			// yo dawg yo
			if (data.concurrent !== undefined){
				var yoDawgPoints = [],
				yoDawgKeys = Object.keys(data),
				realKeys = [],
				yoDawgLabels = [],
				yoDawgYo = {};
				for (var yoDawgKey in yoDawgKeys){
					if ((yoDawgKeys[yoDawgKey] !== 'concurrent') && (yoDawgKeys[yoDawgKey] !== 'labels')){
						realKeys.push(yoDawgKeys[yoDawgKey]);
					}
				}
				for (var realKey in realKeys){
					yoDawgPoints.push(data[realKeys[realKey]]);
				}
				yoDawgLabels = data.labels; 
				yoDawgYo.points = yoDawgPoints;
				yoDawgYo.labels = yoDawgLabels;
				var checkboxes = '<div class="module-view-options-checkboxes yo-dawg-yo">',
				currModule = elt.closest('.module');
				for (realKey in realKeys){
					var currKey = realKeys[realKey];
					checkboxes = checkboxes + '<div class="module-view-options-checkbox"><input type="checkbox" class="checkbox-option" checked id="' + currKey + '-option" name="' + currKey + '-option" attr-dataset="' + currKey + '"><label for="' + currKey + '-option">' + currKey + '</label></div>';
				}
				checkboxes = checkboxes + '</div>';
				currModule.find('.module-view-options').show();
				currModule.find('.checkbox-option').each(function(){
					$(this).prop('checked', true);
				});
				if (currModule.find('.module-view-options').children('.yo-dawg-yo').length === 0){
					currModule.find('.module-view-options').append(checkboxes);
				}
				currModule.find('.yo-dawg-yo').show();
				checkboxControls(currModule.find('.module-view-options'));
				dataMultipleSets = yoDawgYo;
				drawGraph(elt, dataMultipleSets, true, null, true);
			}
			else{
				if (!showYoDawgNav || showYoDawgNav === undefined){
					elt.closest('.module').find('.yo-dawg-yo').hide();
				}
				var labels = [],
				lineColor,
				fillColor,
				color = canvas
				.closest('.module')
				.find('.module-header')
				.css('color'),
				max = 0,
				min = 0,
				total = 0;

				// graph colors are based on the color of the bar at the top of the module
				color = color.replace('rgb', 'rgba');
				fillColor = color.replace(')', ', 0.3)');
				lineColor = color.replace(')', ', 1)');

				// parse dateTime and spit it out as MM/DD for use as graph labels
				var labelCount = data.labels.length;

				for (var i in data.labels){
					var strDate = data.labels[i].split('/201')[0];
					// if (labelCount > MAX_X_AXIS_POINTS){
						// if (i % (Math.floor(labelCount / MAX_X_AXIS_POINTS)) == 0){
							// labels.push(strDate);
						// }
					// } else {
						labels.push(strDate);
					//}
				}
				var dataForGraphing = [],
				points = data.points,
				hasZeroInData = false;

				if (!multipleDatasets){
					dataForGraphing = [
					{
						data: points,
						fillColor: fillColor,
						strokeColor: lineColor,//'rgba(0, 0, 0, 0)',
						pointStrokeColor: lineColor,
						pointColor: 'rgba(240, 240, 240, 1)'
					}];

					// construct total and max of data
					for (i in data.points){
						if (parseInt(i) === 0){
							min = data.points[i];
							max = data.points[i];
						}
						if (data.points[i] === 0){
							hasZeroInData = true;
						}
						if (data.points[i] < min){
							min = data.points[i];
						}
						if (data.points[i] > max){
							max = data.points[i];
						}
						if (scope.viewParameters.view !== 'Cumulative'){
							total += data.points[i];
						}
						else{
							total = data.points[i];
						}
					}
				}
				else{
					var constructedTotal = false;
					for (var pointSet in points){
						var factor = -55,
						difference = 0,
						differenceIsSignificant = true,
						r = parseInt(fillColor.split(',')[0].split('(')[1]) + factor*pointSet,
						g = parseInt(fillColor.split(',')[1]) + factor*pointSet,
						b = parseInt(fillColor.split(',')[2]) + factor*pointSet,
						newFillColor = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.3)',
						newLineColor = newFillColor.replace('0.3', '1'),
						pointSetCheck = elt.closest('.module-body')
						.find('.module-view-options-checkbox:eq(' + pointSet + ')');
						if (hiddenIndices){
							animate = false;
							if (hiddenIndices[0] === -1){
								hiddenIndices = false;
							}
						}
						if (hiddenIndices){
							if (hiddenIndices.length === points.length){
								allOptionsUnchecked = true;
							}
							else{
								showGraphArea(true);
								if (hiddenIndices.indexOf(parseInt(pointSet)) === -1){
									constructedTotal = false;
									pointSetCheck.find('input').attr('checked', true);
									dataForGraphing.push({
										data: points[pointSet],
										fillColor: newFillColor,
										strokeColor: newLineColor,// 'rgba(0, 0, 0, 0)',
										pointStrokeColor: newLineColor,
										pointColor: 'rgba(240, 240, 240, 1)'
									});
								}
								else{
									constructedTotal = true;
									pointSetCheck.find('input').attr('checked', false);
								}
							}
						}
						else{
							dataForGraphing.push({
								data: points[pointSet],
								fillColor: newFillColor,
								strokeColor: newLineColor,// 'rgba(0, 0, 0, 0)',
								pointStrokeColor: newLineColor,
								pointColor: 'rgba(240, 240, 240, 1)'
							});
						}
						if (!allOptionsUnchecked){
							pointSetCheck.find('label').css('color', newLineColor);
							// construct total and max of data
							for (i in points[pointSet]){
								if ((parseInt(pointSet) === 0) && (parseInt(i) === 0)){
									min = points[pointSet][i];
								}
								if (points[pointSet][i] === 0){
									hasZeroInData = true;
								}
								if (points[pointSet][i] > max){
									max = points[pointSet][i];
								}
								else if (points[pointSet][i] < min){
									min = points[pointSet][i];
								}
								if (!hiddenIndices || (hiddenIndices && hiddenIndices.indexOf(parseInt(pointSet)) === -1)){
									// calculating total displayed outside of graph area
									if (!constructedTotal){
										// in daily view, total is just summing the values of all the points
										if (scope.viewParameters.view !== 'Cumulative'){
											total += points[pointSet][i];
										}
										// in cumulative view, total is the value of the last point *only*
										else{
											if (parseInt(i) === (points[pointSet].length - 1)){
												total += points[pointSet][i];
											}
										}
									}
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
					}
				}
				var underPointCountThreshold = labels.length <= MAX_X_AXIS_POINTS;
				if (!allOptionsUnchecked){
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
					if (scope.viewParameters.view.toLowerCase() !== 'cumulative'){
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
					var strTotal = total.toString();
					if (strTotal.length > 4){
						strTotal = strTotal.replace(/(\d+)(\d{3})/, '$1'+','+'$2');
					}
					scope.total = strTotal;
					var moduleWrap = elt.closest('.module');
					moduleWrap.find('.module-body-stat').html(strTotal);
					moduleWrap.find('.module-stat').html(strTotal);

					// let's draw!
					elt.show();
					step = fitStepToContext(snapTo(step), min.toString().length);
					options.scaleStepWidth = step;

					min = Math.round(min);
					max = Math.round(max);

					if (calcNewMin){
						var graphDims = calcMinAndStep(min, max, step);
						options.scaleStartValue = graphDims.min;
						options.scaleStepWidth = graphDims.step;
					}
					var context = canvas[0].getContext('2d');
					var chartObj = new Chart(context);
					showGraphArea();
					chartObj.Line(graphData, options);
					}
					else{
						noData();
					}
				}
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

			// no data for this module -- don't draw a graph.
			function noData(){
				elt.parent().hide();
				showGraphArea(false);
				elt.closest('.module-body').find('.module-body-stat').text('\u2014');
				elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
			}

			function dropdownControls(wrapper){
				var select = wrapper.find('.module-view-options-dropdown'),
				graph = scope
				.graphsData[attrs.graphContent];
				select.on('change', function(){
					if (scope.viewParameters.communication.length > 0){
						drawGraph(elt, graph[select.val()]);
					}
					else{
						noData();
					}
				});
			}

			function checkboxControls(wrapper){
				var checkboxes = wrapper.find('.checkbox-option'),
				hiddenIndices = [],
				yoDawg = wrapper.find('.yo-dawg-yo');
				checkboxes.on('change', function(){
					if (scope.viewParameters.communication.length > 0){
						hiddenIndices.length = 0;
						wrapper.find('.checkbox-option').each(function(){
							if (!($(this).prop('checked'))){
								hiddenIndices.push($(this).parent().index());
							}
						});
						if (hiddenIndices.length === 0){
							hiddenIndices.push(-1);
						}
						if (yoDawg){
							drawGraph(elt, dataMultipleSets, true, hiddenIndices, true);
						}
						else{
							drawGraph(elt, dataMultipleSets, true, hiddenIndices);
						}
					}
				});
			}

			function showLoading(){
				elt.closest('.module-body').find('.module-loading').fadeIn();
				elt.parent().fadeOut();
				elt.parent().next().fadeOut();
			}

			function showGraphArea(data){
				elt.closest('.module-body').find('.module-loading').fadeOut();
				if (data ===  true || data === undefined){
					elt.parent().fadeIn();
				}
				if (data === false || data === undefined){
					elt.parent().next().fadeIn();
				}
			}

		 }



		};

	 });