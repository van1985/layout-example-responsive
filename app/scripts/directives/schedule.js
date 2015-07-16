'use strict';

angular.module('Directives')
    .directive('schedule', function (
    	$window
    ) {
    	return {
    		restrict: 'AE',
    		templateUrl: '/scripts/directives/views/schedule.html',
    		scope: {
    				flight: '='
    			},
    		link: function(scope, elem) {
                //get d3 context
    			var d3 = $window.d3,
                    //get the flight object from ng-repeat
                    flight = scope.flight;

                console.log('flightTime ' + flight.flightTime);
                //console.log(attrs);

                //function to draw rectangles in the view
                var drawRect = function() {
                        //get the svg fom the view
        				var svgContainer = d3.select('svg'),
                            //get the rectangle figures (yet not created)
                            rects = svgContainer.selectAll('rect')
                                        //attach the data to the rectangles, now they will be created from the data
                                        .data(scope.flight)
                                        .enter()
                                        //append the rectangles with the __data__ to svg
                                        .append('rect'),
                            //set rectangles attributes
                            rectsAttrs = rects
                                            .attr('height', 80)
                                            //give the rectangle a dynamic width depending on the flightTime
                                            .attr('width', function(d){
                                                console.log(d);
                                                return d.flightTime;
                                            });

                        //just avoiding jshint commit error.. declared but never used
                        rectsAttrs = rectsAttrs;
                    };
    		
                //scope.$watch('flight.flightTime', function(newVal, oldVal) {
    			scope.$watch('flight.flightTime', function(newVal) {
    				if(!newVal) {
    					return;
                    }

                    drawRect();
                    console.log(elem);
                    //console.log(elem[0].childNodes[0].childNodes[0].__data__);
    			});
    		}
    	};
    });