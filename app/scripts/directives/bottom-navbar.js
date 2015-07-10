'use strict';

angular.module('Directives')
    .directive('bottomNavbar', function () {
    	return {
    		restrict: 'C',
    		templateUrl: 'views/bottom-navbar.html'
    	};
    });