$(function() {
	var index = 0;
	var timer = null;

	function dolunbo() {

		timer = setInterval(function() {
			index++;
			if(index == 5) {
				index = 0;
			}
			show();
		}, 3000);
	};
	dolunbo();

	function show() {
		$('.box .zhangshiul li').eq(index).fadeIn(1000).siblings().fadeOut();
		$('.box .gundongul li').eq(index).addClass('active').siblings().removeClass('active');
	}

	// 停掉定时器
	$('.box .gundongul li').mouseover(function() {
		index = $(this).index();
		show();
		clearInterval(timer);
	})
	$('.box .gundongul li').mouseout(function() {
		index = $(this).index();
		dolunbo();
	})

}) //最外面的function