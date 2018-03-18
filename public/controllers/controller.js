/***************** MAIN CONTROLLER FILE FOR ANGULAR APPLICATION ************************/
var myApp = angular.module('myApp',['ngAnimate']);

myApp.controller('AppCtrl', ['$scope','$http', function($scope,$http) {
  	
  	
  	// MODEL VARIABLE FOR ASKED FREQ.
	$scope.number = 0;

	// ERROR VARIABLES
	$scope.errorMessage = "";
	$scope.errorValue = false;

	// SUCCESS VARIABLES
	$scope.successMessage = "";
	$scope.successValue = false;

	// PREVIOUS SEARCH RESULTS
	$scope.Searches = [];

	$scope.getWords = function($event,number)
	{
		
			console.log($scope.number);
			var parameter = {
				number : $scope.number
			};

			// 	WRITING AN HTTP GET REQUEST
			$http({
				method : "GET",
				url : "/contactlist",
				params: parameter
				}).then(function mySuccess(response) 
				{
					console.log(response.data);

					// CHECKING IF ERROR OCCURED
					$scope.totalData = response.data;
					$scope.errorMessage = $scope.totalData[0].error;

					if($scope.errorMessage.length > 0)
					{
						$scope.successValue = false;
						$scope.errorValue = true;
					}
					else
					{
						$scope.successMessage = "Top "+ $scope.number +" results fetched successfully!";
						$scope.successValue = true;
						$scope.errorValue = false;
						$scope.wordList = $scope.totalData.slice(1,$scope.number+1);
					}
					var numberValue = ($scope.number == null) ? "Empty Input" : $scope.number;
					$scope.Searches.push(
					{
						freq : numberValue,
						result : $scope.successValue,
						time : new Date().toLocaleString()
					});
				}, 
			function myError(response) {
				console.log('ERROR OCCURED IN SENDING DATA BACK!');
			});
	}
	// FUNCTION FOR CLOSING SUCCESS DIV
	$scope.hideSuccess = function(){
		$scope.successValue = false;
	}
	// FUNCTION FOR CLOSING ERROR DIV
	$scope.hideError = function(){
		$scope.errorValue = false;
	}
}]);