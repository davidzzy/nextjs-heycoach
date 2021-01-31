Highcharts.setOptions({
	lang: {
		drillUpText: '< 返回 “{series.name}”'
	}
});
var map = null,
	geochina = 'https://geojson.cn/data/',
	getGeoJSON = function(code, callback) {
		$.getJSON(geochina + code + '.json', function(geojson) {
			callback(geojson)
		}, function(err) {
			console.log(err)
		});
	},
	createMap = function(mapdata) {
		var data = [];
		// 随机数据
		Highcharts.each(mapdata.features, function(md, index) {
			// 南海诸岛标识不需要填充数据
			if(md.properties.name === '南海诸岛') {
				return;
			}
			var tmp = {
				name: md.properties.name,
				value: Math.floor((Math.random() * 100) + 1) // 生成 1 ~ 100 随机值
			};
			if(md.properties.filename) {
				tmp.drilldown = md.properties.filename;
			}
			if(md.properties.offset){
				md.properties['hc-middle-x'] = md.properties.offset[0];
				md.properties['hc-middle-y'] = md.properties.offset[1];
			}
			data.push(tmp);
		});
		map = new Highcharts.Map('container', {
			chart: {
				events: {
					drilldown: function(e) {
						drilldown(e);
					},
					drillup: function(e) {
						map.setTitle({
							text: e.seriesOptions.name
						});
					}
				}
			},
			title: {
				text: '中国地图'
			},
			subtitle: {
				useHTML: true,
				text: '点击查看 <a href="https://www.hcharts.cn/mapdata" target="_blank">地图数据及详情</a>，注意县级数据为收费数据，如果您有需要，请 <a href="https://highcharts.com.cn/data" target="_blank">联系我们购买</a>'
			},
			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: 'bottom'
				}
			},
			plotOptions: {
				map: {
					borderColor: '#555',
					borderWidth: 0.5,
				}	
			},
			tooltip: {
				useHTML: true,
				headerFormat: '<table><tr><td>{point.name}</td></tr>',
				pointFormat: '<tr><td>全称</td><td>{point.properties.fullname}</td></tr>' +
				'<tr><td>名称</td><td>{point.properties.name}</td></tr>'+
				'<tr><td>行政编号</td><td>{point.properties.code}</td></tr>' +
				'<tr><td>经纬度</td><td>{point.properties.center}</td></tr>' ,
				footerFormat: '</table>'
			},
			legend: {
				enabled: false
			},
			series: [{
				data: data,
				mapData: mapdata,
				joinBy: 'name',
				name: '中国',
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					style: {
						fontSize: '10px'
					}
				},
				states: {
					hover: {
						color: '#a4edba'
					}
				}
			}]
		});
	},
	drilldown = function(event) {
		map.tooltip.hide();
		// 异步下钻
		if (event.point.drilldown) {
			var pointName = event.point.properties.fullname;
			map.showLoading('下钻中，请稍后...');
			getGeoJSON(event.point.drilldown, data => {
				data = Highcharts.geojson(data);
				Highcharts.each(data, function(d) {
					if(d.properties.filename) {
						d.drilldown = d.properties.filename;
					}
					if(d.properties.offset){
						d.properties['hc-middle-x'] = d.properties.offset[0];
						d.properties['hc-middle-y'] = d.properties.offset[1];
					}
					d.value = Math.floor((Math.random() * 100) + 1); // 生成 1 ~ 100 随机值
				});
				map.hideLoading();
				map.addSeriesAsDrilldown(event.point, {
					name: event.point.name,
					data: data,
					dataLabels: {
						style: {
							fontSize: '10px'
						},
						enabled: true,
						format: '{point.name}'
					}
				});
				map.setTitle({
					text: pointName
				});
			})
		}
	};
getGeoJSON('china', function(geojson) {
	createMap(geojson)
});
