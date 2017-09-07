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
	//产品展示的左右按钮点击
	//1
	var phone_show = 0;
	$('.left_1').click(function() {
		img_left("#show_1");
	});
	$('.right_1').click(function() {
		img_right("#show_1");
	})
	//2
	$('.left_2').click(function() {
		img_left("#show_2");
	});
	$('.right_2').click(function() {
		img_right("#show_2")
	})
	//3
	$('.left_3').click(function() {
		img_left("#show_3");
	});
	$('.right_3').click(function() {
		img_right("#show_3")
	})
	//4
	$('.left_4').click(function() {
		img_left("#show_4");
	});
	$('.right_4').click(function() {
		img_right("#show_4")
	})
	//函数封装
	function img_left(name) {
		phone_show--;
		if(phone_show <= 0) {
			phone_show = $(name).find('img').length;
		}
		$(name).find('img').eq(phone_show).fadeIn(1000).siblings().fadeOut();
		$(name).siblings('.name_show').find('p').eq(phone_show).fadeIn(1000).siblings().fadeOut();
	}

	function img_right(name) {
		phone_show++;
		if(phone_show == $(name).find('img').length) {
			phone_show = 0;
		}
		$(name).find('img').eq(phone_show).fadeIn(1000).siblings().fadeOut();
		$(name).siblings('.name_show').find('p').eq(phone_show).fadeIn(1000).siblings().fadeOut();
	}
	//点击下载
	$('#jinxiaochun').click(function(){
		checkPlatform();
	})
	function checkPlatform() {
		if(/android/i.test(navigator.userAgent)) {
			console.log("This is Android'browser."); //这是Android平台下浏览器
			window.location.href = "http://demo.hzlwo.com/app/lwoerp.apk";
		}
		if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			console.log("This is iOS'browser."); //这是iOS平台下浏览器
			window.location.href = "https://itunes.apple.com/us/app/%E5%8E%9F%E5%88%9B%E8%BF%9B%E9%94%80%E5%AD%98/id1252219293?l=zh&ls=1&mt=8";
		}
	}
	$('#dinghuohui').click(function(){
		checkPlatform1();
	})
	function checkPlatform1() {
		if(/android/i.test(navigator.userAgent)) {
			console.log("This is Android'browser."); //这是Android平台下浏览器
			window.location.href = "http://demo.hzlwo.com/app/lwoord.apk"
		}
		if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		}
	}
	//点击下载结束
	//联系方式
	$('.contact_title .list img').click(function() {
		$(this).hide().siblings("img").show();
		$(this).siblings('.qq').toggleClass('qq_hiden');
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