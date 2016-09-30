'use strict'

angular.module('LunchCheck', []);

angular.module('LunchCheck')
.controller('LunchCheckController',LunchCheckController);

LunchCheckController.$inject= ['$scope']

function LunchCheckController ($scope) {
	$scope.content = "";
	$scope.message = "";
	$scope.check = function() {
		if($scope.content == "") {
			$scope.message ="Please enter data first";
		} else {
			console.log($scope.content.split(","));
			if ($scope.content.split(",").length < 4 ) {
				
				$scope.message ="Enjoy!";
			} 
			else {
				$scope.message ="Too much!";
			}
		}

	}
}

