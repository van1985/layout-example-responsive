'use strict';

angular.module('Directives')
    .directive('topNavbar', function () {
    	return {
    		restrict: 'E',
    		templateUrl: 'views/top-navbar.html'
    	};
    });