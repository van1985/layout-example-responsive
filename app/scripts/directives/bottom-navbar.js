'use strict';

angular.module('Directives')
    .directive('bottomNavbar', function () {
    	return {
    		restrict: 'E',
    		templateUrl: 'views/bottom-navbar.html'
    	};
    });