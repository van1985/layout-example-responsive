'use strict';

angular.module('layoutExample')
  .controller('ScheduleCtrl', function(
  	$scope,
  	$interval
  ) {	


        $scope.flights = [
				{
					'flights': 2,
					'flightTime': Math.floor((Math.random() * 100) + 1),
					'delayed': false
				},
				{
					'flights': 1,
					'flightTime': Math.floor((Math.random() * 100) + 1),
					'delayed': false
				}
			];   		


		$scope.setData = function () {
			//update flight time on every interval
			$scope.flights[0].flightTime = Math.floor((Math.random() * 100) + 1);
			$scope.flights[1].flightTime = Math.floor((Math.random() * 100) + 1);
		};


		//recreate real time server update
		$interval(function(){        	
	        $scope.setData();
    	}, 1000, 5);
  });