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
	$(".meau img").click(function(){
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
})