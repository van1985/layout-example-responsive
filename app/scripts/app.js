'use strict';

var _mainModules = [
    'Services'
    ,'Filters'
    ,'Directives'
    ,'AppConfig'
    ,'ngRoute'
    ,'ngTouch'
    // yo:ngMainModules
];


angular.module('layoutExample', _mainModules )
    .config( function($routeProvider){
        //redirect any invalid hash to /home
        $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/cart', {
            templateUrl: 'views/cart.html'
        })
        .otherwise({
            redirectTo: '/login'
        });

        var routes = [];

// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });
