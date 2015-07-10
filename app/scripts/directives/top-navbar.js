'use strict';

angular.module('Directives')
    .directive('topNavbar', function () {
    	return {
    		restrict: 'C',
    		templateUrl: 'views/top-navbar.html'
    	};
    });