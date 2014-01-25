'use strict';

angular.module('settings',[])
	.controller('settingsCtrl', ['$scope', 'appSettings', 'colorCollection', function($scope, appSettings, colorCollection) {
		$scope.level = appSettings.level;
		$scope.size =	appSettings.size;
		$scope.isHidden = false;

		$scope.updateSettings = function() {
			appSettings.level = parseInt($scope.level, 10);
			appSettings.size = parseInt($scope.size, 10);
		};

		$scope.show = function () {
			$scope.isHidden = !$scope.isHidden;
		};

		$scope.colorCollection = colorCollection;
	}]);