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

	$("#background-img").attr("src", setBackground(dWidth, dHeight));

	let weather = new Vue({
		el: "#content",
		data: {
			cityName: "Shenzhen",
			temperture: 17,
			tempUnit: "Celsius"
		}
	});
});