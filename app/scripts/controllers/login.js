'use strict';

angular.module('layoutExample')
  .controller('LoginCtrl', function(
  	$scope,
  	$location
  ) {
    
		$scope.login = function() {
			$location.path('cart');
		};

  });