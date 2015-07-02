# Coding Styles


## Get Organized !!

> Since a large AngularJS application has many components it's best to structure it in a directory hierarchy. There are two main approaches:

* Creating high-level divisions by component types and lower-level divisions by functionality.

In this way the directory structure will look like:

```
.
├── app
│   ├── app.js
│   ├── controllers
│   │   ├── home
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   └── about
│   │       └── ThirdCtrl.js
│   ├── directives
│   │   ├── home
│   │   │   └── directive1.js
│   │   └── about
│   │       ├── directive2.js
│   │       └── directive3.js
│   ├── filters
│   │   ├── home
│   │   └── about
│   └── services
│       ├── CommonService.js
│       ├── cache
│       │   ├── Cache1.js
│       │   └── Cache2.js
│       └── models
│           ├── Model1.js
│           └── Model2.js
├── partials
├── lib
└── test
```

* Creating high-level divisions by functionality and lower-level divisions by component types.

Here is its layout:

```
.
├── app
│   ├── app.js
│   ├── common
│   │   ├── controllers
│   │   ├── directives
│   │   ├── filters
│   │   └── services
│   ├── home
│   │   ├── controllers
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   ├── directives
│   │   │   └── directive1.js
│   │   ├── filters
│   │   │   ├── filter1.js
│   │   │   └── filter2.js
│   │   └── services
│   │       ├── service1.js
│   │       └── service2.js
│   └── about
│       ├── controllers
│       │   └── ThirdCtrl.js
│       ├── directives
│       │   ├── directive2.js
│       │   └── directive3.js
│       ├── filters
│       │   └── filter3.js
│       └── services
│           └── service3.js
├── partials
├── lib
└── test
```

* The `app.js` file should contains route definitions, configuration and/or manual bootstrap (if required).

## Modules (or lack thereof)

> It's common when starting out to hang everything off of the main module. This works fine when starting a small app, but it quickly becomes unmanageable.

### Bad

```javascript
var app = angular.module('app',[]);
app.service('MyService', function(){
    //service code
});
app.controller('MyCtrl', function($scope, MyService){
    //controller code
});
```

** Following the same concept of grouping features together will allow scalability.**

### Good

```javascript
var sharedServicesModule = angular.module('sharedServices',[]);
sharedServices.service('NetworkService', function($http){});

var loginModule = angular.module('login',['sharedServices']);
loginModule.service('loginService', function(NetworkService){});
loginModule.controller('loginCtrl', function($scope, loginService){});

var app = angular.module('app', ['sharedServices', 'login']);
```

**When working on large applications everything might not be contained on a single page, and by having features contained within modules it's much simpler to reuse modules across apps.**

## Dependency Injections

> The dependencies has to be injected one per line, to keep the list (especially when it is long) readable and maintainable.
> If we have one dependency per line, it will be easier to keep track of changes looking at the github diff.

**This format has to be used even if there are one dependency, so in case more dependencies are added, it will be natural to keep the format**

### Bad

```javascript
app.service('connectionManagerSrv', function ($rootScope, $log, PollingSrv, NavigationSrv, SessionManager, mainNavbarSrv, ContextSrv, BusyService, Provision, ProvisionInterruptionsHandlerSrv) {
```

### Good

```javascript
app.service('connectionManagerSrv', function (
    $rootScope,
    $log,
    PollingSrv,
    NavigationSrv,
    SessionManager,
    mainNavbarSrv,
    ContextSrv,
    BusyService,
    Provision,
    ProvisionInterruptionsHandlerSrv
) {
```

## Dependencies Injection Syntax

> Dependencies has to be injected using the simple syntax, not the one with squared braces.
> Even though the squared braces syntax is required when the code is minified, it adds complexity to the syntax and makes it harder to read, so we will skip it at write time and add it automatically at build time.

### Bad

```javascript
app.config([
    '$routeProvider',
    function ($routeProvider) {
        // code
    }
]);
```

### Good

```javascript
app.config(function (
    $routeProvider
){
        // code
});
```

## Naming Conventions

> All the names of the app must be in camelCase.

| Component | End | Example 
| ------- | ---- | ------ | 
| Controller | Ctrl | CardPromotionCtrl |
| Services | Srv | CardPromotionSrv |
| Api Services | SrvApi | CardPromotionSrvApi |
| Filters | Fltr | CardPromotionFltr |

** Directives: do not require postfixing **

> Important: A "factory" is in fact a pattern/implementation, and shouldn't be part of the provider's name. All factories and services should be called "services". 

### Bad

```javascript
angular.module('core.checkout').factory('cardpromotion',function(){
```

### Good

```javascript
angular.module('core.checkout').factory('CardPromotionSrv',function(){
```

## Components Defintion

> Use array syntax for controller definitions:

### Example

```javascript
module.controller('MyCtrl', ['dependency1', 'dependency2', ..., 'dependencyn', function (dependency1, dependency2, ..., dependencyn) {
  //...body
}]);
```

> Using this type of definition avoids problems with minification. You can automatically generate the array definition from standard one using tools like ng-annotate (and grunt task grunt-ng-annotate). Use the original names of the controller's dependencies. This will help you produce more readable code:

## Controller bloat

> It's easy, especially when starting out, to put too much logic in the controller. Controllers should never do DOM manipulation or hold DOM selectors; that's where directives and using ng-model come in. Likewise business logic should live in services, not controllers.

> Data should also be stored in services, except where it is being bound to the $scope. Services are singletons that persist throughout the lifetime of the application, while controllers are transient between application states. If data is stored in the controller then it will need to be fetched from somewhere when it is reinstantiated. Even if the data is stored in localStorage, it's an order of magnitude slower to retrieve than from with a Javascript variable.


### Code

```javascript
(homeModule.controller('homeCtrl',function($scope,Categories){
  $scope.categories = Categories.getItems();
};

homeModule.services('Categories',function($http, $q, CategoriesApi){
    var service = {};
    
    service.getItems = function() {
        var deferred = $q.defer(),
        CategoriesApi.getItems()
        .then(
                function(response){

                })
    };

  
    return service;
});
```

**AngularJS works best when following the Single Responsibility Principle (SRP). If the controller is a coordinator between the view and the model, then the amount of logic it has should be minimal. This will also make testing much simpler.**


## Separate Logic from Api Calls

> As controllers should not have business logic, we can separate business logic from api calls creating two services differents. This approach helps to reusable api calls in different services.

### Code

```javascript

angular.module('core.checkout').service('CoreCheckoutAvailableProductOptionsSrv',function(
    $q, 
    CoreCheckoutCartSrv, 
    UserSessionDataSrv, 
    CoreCheckoutCartSrvApi, 
    Config,
    CoreCheckoutProductOptionsSrvApi, 
    $rootScope,
    CoreCommonsEjournalDataFetchSrv,
    CoreCheckoutFulfillmentRpaSrv, 
    CheckoutAvailableOptionBuilderSrv) {

        var service = {},

        service.removeProductOption = function(optionId) {
            var deferred = $q.defer();

            CoreCheckoutProductOptionsSrvApi.removeProductOption(
                UserSessionDataSrv.getSessionId(),
                CoreCheckoutCartSrv.getCart().cartId,
                itemBeingAddedOrEdited.cartItemId,
                optionId
            )
            .then(
                function(cart) {
                    _cart = cart;
                    itemBeingAddedOrEdited = _.findWhere(_cart.cartItems, { cartItemId: itemBeingAddedOrEdited.cartItemId });
                    emitCartUpdatedEvent();
                    deferred.resolve(cart);
                },
                //TODO: define how we are going to handler errors
                function(errorMessage) {
                    //TODO: find out if the following line is necessary with the throw clause
                    deferred.reject(errorMessage);
                    throw errorMessage;
                }
            );

            return deferred.promise;
        };

    return service;
});



angular.module('core.checkout').service('CoreCheckoutProductOptionsSrvApi', function(
    $http, 
    $q, 
    $timeout, 
    CoreCommonsApi) {

  var service = {};

  service.removeProductOption = function(sessionId, cartId, cartItemId, optionId) {
    var deferred = $q.defer();

    $http({
      method: 'DELETE',
      url: CoreCommonsApi.endpoint('removeProductOption') +
        'carts/' + cartId + '/items/' + cartItemId + '/options/' + optionId,
      params:{
        sessionId: sessionId,
        fullCartResponse: 'true'
      }
    })
    .success(
      function(response) {
        console.log('Remove Product Option - success');
        console.log(response);
        deferred.resolve(response);
      })
    .error(
      function(response) {
        console.log('Remove Product Option - error');
        console.log(response);
        deferred.reject(response.responseStatus.errorMessage);
      });

    return deferred.promise;
  };

  return service;
});
```

**AngularJS works best when following the Single Responsibility Principle (SRP). If the controller is a coordinator between the view and the model, then the amount of logic it has should be minimal. This will also make testing much simpler.**

## Too many watchers

> AngularJS is quite performant out of the box. Because of the dirty checking done in a digest cycle, once the number of watchers exceeds about 2,000 the cycle can cause noticeable performance issues.

**From the beginning, angularjs create internal watchers for some tasks **

This Immediately Invoked Function Expression (IIFE) will print out the number of watchers currently on the page. Simply paste it into the console to see how many watchers are currently on the page. This IIFE was taken from Words Like Jared's answer on StackOverflow:


### Code

```javascript
(function () { 
    var root = $(document.getElementsByTagName('body'));
    var watchers = [];

    var f = function (element) {
        if (element.data().hasOwnProperty('$scope')) {
            angular.forEach(element.data().$scope.$$watchers, function (watcher) {
                watchers.push(watcher);
            });
        }

        angular.forEach(element.children(), function (childElement) {
            f($(childElement));
        });
    };

    f(root);

    console.log(watchers.length);
})();
```

## Use Jquery...bad idea

> In order to really understand how to build an AngularJS application, stop using jQuery. jQuery keeps the developer thinking of existing HTML standards, but as the docs say "AngularJS lets you extend HTML vocabulary for your application."

> DOM manipulation should only be done in directives, but this doesn't mean they have to be jQuery wrappers. Always consider what features AngularJS already provides before reaching for jQuery. Directives work really well when they build upon each other to create powerful tools.

** If you don't have other choice, you can put only jquery code inside a directive - Best Practice**

### Code

```javascript
angular.module('Directives').directive('setFocus', function($timeout) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.setFocus,
        function (newValue) {
            $timeout(function() {
                if(newValue)
                {
                    if(navigator.userAgent.match(/(iPhone|iPad|iPod)/g)){
                        window.location = 'invoke:focusElement?focusId='+ element[0].id;
                    }else{
                        element[0].focus();
                    }
                }
                else{
                    element[0].blur();
                }
            },10,false);
        });
    };
});
```