$(function() {
	$('.tabbar .bar-list').click(function() {
		$(this).addClass('active').siblings().removeClass('active')
	})
	$('.tabbar .bar-list').eq(0).click(function() {
		$('.attribute').css('display', 'block').siblings().css('display', 'none');
	})
	$('.tabbar .bar-list').eq(1).click(function() {
		$('.selling').css('display', 'block').siblings().css('display', 'none');
	})
	$('.tabbar .bar-list').eq(2).click(function() {
		$('.related-to ').css('display', 'block').siblings().css('display', 'none');
	})
	$('.back').click(function() {
		window.history.go(-1)
	})
	var goods_commonid = getQueryString("goods_commonid");
	var index = 0;
	var timer = null;

	function dolunbo() {

		timer = setInterval(function() {
			index++;
			if(index == 3) {
				index = 0;
			}
			show();
		}, 2000);
	};
	dolunbo();

	function show() {
		$('.box .zhangshiul li').eq(index).fadeIn(1000).siblings().fadeOut();
		$('.box .gundongul li').eq(index).addClass('active').siblings().removeClass('active');

		$('.box .zhangshiul li').eq(index).find('.img1').animate({
			"top": "0px"
		}, 1000, function() {
			$('.box .zhangshiul li').eq(index).find('.img2').animate({
				"top": "0px"
			});
		});
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
	$('#collect').click(function() {
		//取消收藏
		$.ajax({
			type: "get",
			url: ApiUrl + "/index.php?act=store_ordering&op=favorites_del&goods_id=" + goods_commonid + "&shopping_id=1&key=9619b96bcf04daac53b600c2aeae2400",
			dataType: "json",
			success: function(data) {
				var datas = data.datas;
				if(datas == 1) {
					$('#collect').css('display', 'none');
					$('#has-notcollect').css('display', 'block');
				}
			},

			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});

	});

	$('#has-notcollect').click(function() {
		//收藏
		$.ajax({
			type: "get",
			url: ApiUrl + "/index.php?act=store_ordering&op=add_favorites&goods_id=" + goods_commonid + "&shopping_id=1&key=9619b96bcf04daac53b600c2aeae2400",
			dataType: "json",
			success: function(data) {
				var datas = data.datas;
				if(datas == '收藏成功') {
					$('#has-notcollect').css('display', 'none');
					$('#collect').css('display', 'block');
				}
			},

			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});

	})

})