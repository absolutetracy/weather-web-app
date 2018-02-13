$(document).ready(function(){
	// $("#content").text("loading...");
	// $.getJSON(
	// 	"http://api.openweathermap.org/data/2.5/weather",
	// 	{q: "Shenzhen", APPID: "951e78adf119e5ee5a19069e08ed8a1a"},
	// 	function(data) {
	// 		// console.log(data);
	// 		$("#content").text(data);
	// });
	let dWidth = $(document).width();
	let dHeight = $(document).height();
	let imgUrl = "https://picsum.photos/{width}/{height}/?random"
	let setBackground = function(width, height) {
		if(!width || !height) {
			width = 800;
			height = 600;
		}
		let tempUrl = imgUrl;
		return tempUrl.replace("{width}", width).replace("{height}", height);
	}

	// 设置适合浏览窗口分辨率的图片
	// $("#background-img").attr("src", setBackground(dWidth, dHeight));


	let $body = $("body");
	let $cityEl = $("#city");
	let $refreshBtn = $("#refreshBtn");


	console.log($cityEl);

	

	// $cityEl.on("click", function() {
	// 	console.log('clicked!');
	// });

	// $cityEl.hover(function() {
	// 	console.log('on city');
	// 	$refreshBtn.show();
	// }, function() {
	// 	console.log('off city');
	// 	$refreshBtn.hide();
	// });

	// $cityEl.on("mouseout", function() {
	// 	$refreshBtn.hide();
	// });

	let weather = new Vue({
		el: "#weather",
		data: {
			cityName: "Shenzhen",
			// temperture: 17,
			tempUnit: "℃",
			isRefreshBtnShow: false,
			isRefreshing: false,
			main: {
				temp: 'N/A',
			}
		},
		computed: {
			city: function() {
				return this.getChCityName(this.cityName);
			},
			temperture: function() {
				return Number(this.main.temp - 273.15).toFixed(0);
			}
			// page: function(val) {
			// 	console.log(val);
			// }
		},
		methods: {
			getChCityName: function(city) {
				let EnCh = {"Shenzhen": "深圳","Shanghai": "上海", "Guangzhou": "广州", "Beijing": "北京"}
				return EnCh[city];
				
			},
			refresh: function() {
				let that = this;

				this.isRefreshing = true;

				// 改变refresh按钮样子，增加转转转动画
				$("#refreshBtn").removeClass("btn-default");
				$("#refreshBtn").addClass("btn-link");
				$("#refreshBtn").find("i").css("animation", "0.5s linear 0s normal none infinite rotate");


				// 请求天气接口，获取最新天气数据
				$.getJSON(
			      "https://api.openweathermap.org/data/2.5/weather",
			      {q: this.cityName, APPID: "951e78adf119e5ee5a19069e08ed8a1a"}
			     //  function(data){
			     //    let tempKelvin = data.main.temp;
			     //    let tempCelsius = calculateTemp(tempKelvin);
			     //    console.log(tempKelvin);
			     //    $("#temp-number").text(tempCelsius);
			     // }
			     ).then(function(data) {
			     	console.log(data);
			     	that.main = data.main;
			     	that.isRefreshBtnShow = false;
			     	that.isRefreshing = false;
			     });
			},
			toForecast: function() {
				console.log('Down click');
				// console.log(val);
			}
		}
	});

	weather.refresh();

	$("#city").hover(function() {
		// console.log('on');
		weather.isRefreshBtnShow = true;
	}, function() {
		if(!weather.isRefreshing) {
            weather.isRefreshBtnShow = false;
		}
	});

	// $body.on("mouseout", "#refreshBtn", function() {
	// 	// console.log('out');
	// 	weather.isRefreshBtnShow = false;
	// });

	// 使用vue事件响应，不用jquery事件响应
	// $body.on("click", "#refreshBtn", function() {
	// 	console.log("refreshBtn clicked");
	// 	$("#refreshBtn").removeClass("btn-default");
	// 	$("#refreshBtn").addClass("btn-link");
	// 	$("#refreshBtn").find("i").css("animation", "0.5s linear 0s normal none infinite rotate");


	// });



});