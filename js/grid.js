'use strict';

angular.module('grid', [])
	.controller('gridCtrl',['$scope', 'gridEngine', 'appSettings', 'colorCollection', function($scope, gridEngine, appSettings, colorCollection){
		$scope.$watch('settings', function (){
			console.time('gridEngine');
			$scope.grid = gridEngine(appSettings.level, appSettings.size);
			console.timeEnd('gridEngine');
		}, true);
		$scope.settings = appSettings;

		$scope.addToCollection = function (color) {
			colorCollection.push({
				color: angular.copy(color),
				settings: angular.copy(appSettings)
			});
		};
	}])
	.factory('gridEngine', function(){
		return function(level, size) {
			var grid = [],
					average = level,
					steps = size;

			var base, range, step;
			if (average < 128) {
				base = 0;
				range = average * 2;
			}
			else {
				range = (255 - average) * 2;
				base = average - (range / 2);
			}
			step = 1 / steps;

			var i, j, redLevel, secBase, secStep, line;
			for (i = 0; i <= steps; i++) {
				line = [];
				redLevel = i * step;
				secBase = (redLevel < 0.5) ? (1.5 - redLevel) - 1 : 0;
				secStep = (1.5 - (redLevel + secBase * 2)) / steps;
				for (j = 0; j <= steps; j++) {
					line.push({
						r: Math.round(base + (i * step) * range),
						g: Math.round(base + (j * secStep + secBase) * range),
						b: Math.round(base + ((steps - j) * secStep + secBase) * range)
					});
				}
				grid.push(line);
			}
			return grid;
		};
	});