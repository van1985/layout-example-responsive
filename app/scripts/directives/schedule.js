'use strict';

angular.module('Directives')
    .directive('schedule', function (
    	$window
    ) {
    	return {
    		restrict: 'AE',
    		scope: {
    				//flight: '='
    			},
    		link: function() {
                //get d3 context
    			var d3 = $window.d3,
                    flight = [80, 100];

                //function to draw rectangles in the view
                var drawRect = function() {
                        //get the svg fom the view
                        //var canvas = d3.select('svg'),
                        var canvas = d3.select('#sched')
                                        .append('svg')
                                        .attr('width', 250)
                                        .attr('height', 100),
                            //get the rectangle figures (yet not created)
                            rects = canvas.selectAll('rect')
                                        //attach the data to the rectangles, now they will be created from the data
                                        .data(flight)
                                        .enter()
                                        //append the rectangles with the __data__ to svg
                                            .append('rect')
                            //set rectangles attributes
                            //rectsAttrs = rects
                                            .attr('height', 80)
                                            //give the rectangle a dynamic width depending on the flightTime
                                            .attr('width', function(d){
                                                console.log('d');
                                                console.log(d);
                                                return d;
                                            })
                                            .attr('x', function(d, i) { return i * 150; });

                        //just avoiding jshint commit error.. declared but never used
                        rects = rects;

                        console.log(canvas);
                    };

                drawRect();
            
                //scope.$watch('flight.flightTime', function(newVal, oldVal) {
                /*scope.$watch('flight.flightTime', function(newVal) {
                    if(!newVal) {
                        return;
                    }

                    drawRect();
    			});
                */
    		}
    	};
    });