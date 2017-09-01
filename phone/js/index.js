$(function() {
	//首页banner图
	var index = 0;
	var timer = null;

	function dolunbo() {
		timer = setInterval(function() {
			index++;
			if(index == 5) {
				index = 0;
			}
			show();
		}, 2000);
	};
	dolunbo();

	function show() {
		$('.section-1  img').eq(index).fadeIn(1000).siblings().fadeOut();
	}
	//导航侧边栏
	$(".meau img").click(function() {
		$('.section-btn').fadeToggle("slow");
	})
	//了解DCLbanner
	var indexs = 0;
	var twotimer = null;

	function dolunbo2() {
		timer = setInterval(function() {
			indexs++;
			if(indexs == 3) {
				indexs = 0;
			}
			shows();
		}, 2000);
	};
	dolunbo2();

	function shows() {
		$('.timeline ul li').eq(indexs).addClass('current').siblings().removeClass('current');
	}
	$('.timeline ul li').mouseover(function() {
		indexs = $(this).indexs();
		shows();
		clearInterval(twotimer);
	})
	$('.timeline ul li').mouseout(function() {
		indexs = $(this).indexs();
		dolunbo2();
	})
	
	//地图
	var map = new BMap.Map("J_mapCtn"); // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
	map.centerAndZoom(new BMap.Point(120.2823874707, 30.3224787371), 2000);
	var marker = new BMap.Marker(new BMap.Point(120.2823874707, 30.3224787371));
	map.addOverlay(marker);
	var opts = {
		width: 220, // 信息窗口宽度      
		height: 60, // 信息窗口高度      
		title: "杭州领沃科技有限公司" // 信息窗口标题     
	}
	var infoWindow = new BMap.InfoWindow("地址：杭州市江干区玖堡精品5D006 <br /> 电话：15736748889"); // 创建信息窗口对象      

	map.openInfoWindow(infoWindow, marker.getPosition()); // 打开信息窗口
	marker.addEventListener('click', function() {
		map.openInfoWindow(infoWindow, marker.getPosition()); // 打开信息窗口
	});
})