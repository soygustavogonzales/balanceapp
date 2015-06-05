boardApp.directive('drvPieGraph',[function(){
	return {
		restrict:'E',
		template:'<canvas width="280" height="300"></canvas>',
		replace:true,
		link:function($scope,elem,iAttrs){
			var data = [
			    {
			        value: 300,
			        color:"#F7464A",
			        highlight: "#FF5A5E",
			        label: "Calos Alcantara"
			    },
			    {
			        value: 50,
			        color: "#46BFBD",
			        highlight: "#5AD3D1",
			        label: "Fiorella Conrad"
			    },
			    {
			        value: 100,
			        color: "#FDB45C",
			        highlight: "#FFC870",
			        label: "Damian Estabridis"
			    }
			]
			var ctx = elem[0].getContext("2d");
			var myNewChart = new Chart(ctx).Pie(data);
		}
	}
}]);

boardApp.directive('drvLinearGraph',[function(){
	return {
		restrict:'E',
		template:'<div style="min-width:280px;height:400px; margin:0 auto;"></div>',
		link:function($scope, elem, iAttrs){
					console.log(elem)
						        $(elem).highcharts({
						            chart: {
						                type: 'spline',
						                animation: Highcharts.svg, // don't animate in old IE
						                marginRight: 10,
						                events: {
						                    load: function () {

						                        // set up the updating of the chart each second
						                        var series = this.series[0];
						                        setInterval(function () {
						                            var x = (new Date()).getTime(), // current time
						                                y = Math.random()*100;
						                            series.addPoint([x, y], true, true);
						                        }, 4000);
						                    }
						                }
						            },
						            title: {
						                text: 'Live random data'
						            },
						            xAxis: {
						                type: 'datetime',
						                tickPixelInterval: 150
						            },
						            yAxis: {
						                title: {
						                    text: 'Value'
						                },
						                plotLines: [{
						                    value: 0,
						                    width: 1,
						                    color: '#808080'
						                }]
						            },
						            tooltip: {
						                formatter: function () {
						                    return '<b>' + this.series.name + '</b><br/>' +
						                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
						                        Highcharts.numberFormat(this.y, 2);
						                }
						            },
						            legend: {
						                enabled: false
						            },
						            exporting: {
						                enabled: false
						            },
						            series: [{
						                name: 'Random data',
						                data: (function () {
						                    // generate an array of random data
						                    var data = [],
						                        time = (new Date()).getTime(),
						                        i;

						                    for (i = -19; i <= 0; i += 1) {
						                        data.push({
						                            x: time + i * 1000,
						                            y: Math.random()
						                        });
						                    }
						                    return data;
						                }())
						            }]
						        });
		}
	}
}])
/*
*/