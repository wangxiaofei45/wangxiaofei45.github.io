$(function() {
	var goods_commonid =  getQueryString("goods_commonid");
	$.ajax({
		type: "get",
		url: WxappSiteUrl + "/index.php?act=ordering_goods&op=goods_sku&goods_commonid="+goods_commonid,
		async: true,
		success: function(data) {
			var jsons = JSON.parse(data);
			console.log(jsons);
			item = jsons.datas;
			//第一次循环
			var list = [];
			var header = '<div class="header_center display-flex">' +
				'<div class="img display-flex">' +
				'<img src="' + item.goods_image + '"/>' +
				'</div>' +
				'<div class="text">' +
				'<div class="list">' +
				'<div class="name">货号</div>' +
				'<div class="num">' + item.goods_serial + '</div>' +
				'</div>' +
				'<div class="list">' +
				'<div class="name">名称</div>' +
				'<div class="num">' + item.goods_name + '</div>' +
				'</div>' +
				'<div class="list">' +
				'<div class="name">零售价</div>' +
				'<div class="num">' + item.goods_price + '</div>' +
				'</div>' +
				'</div>' +
				'</div>'
			list.push(header);
			$('.containers_header').append(list);
			//第二次循环
			var color_mame_list = [];
			var color_list = '';
			var color_name = '<div class="list">' + item.sp_name + '</div>'
			for(var k in item.rowspec) {
				color_list += '<div class="list">' + item.rowspec[k] + '</div>'
			}
			color_mame_list.push(color_name);
			color_mame_list.push(color_list);
			$('#sp_name_list').append(color_mame_list);

			//第三次循环
			var number_input = [];
			var number_input_list = '';
			var spec_list = item.spec_list;
			for(var k in item.colspec) {
				var colspec_item = item.colspec[k];
				var colspec_list = item.colspec[k]['list'];
				number_input_list += '<div class="center_list flex-start">' +
					'<div class="list">' +
					item.colspec[k]['sp_name'] +
					'</div>'
				for(var k in colspec_list) {
					number_input_list += '<div class="list">' +
						'<input name="' + colspec_list[k]['goods_id'] + '[goods_num]"' + ' type="number" value="' + spec_list[colspec_list[k]['skuid']]['goods_num'] + '" maxlength="5"' + 'mysku_id=' + '"' + colspec_list[k]['skuid'] + '"' + 'id=' + '"' + colspec_list[k]['goods_id'] + '" />' +
						'<input name="' + colspec_list[k]['goods_id'] + '[goods_id]"' + ' type="hidden" value="' + colspec_list[k]['goods_id'] + '" />' +
						'<input name="' + colspec_list[k]['goods_id'] + '[goods_spec]"' + ' type="hidden" value="' + spec_list[colspec_list[k]['skuid']]['goods_spec'] + '" />' +
						'</div>'
				} +
				'</div>'
				number_input.push(number_input_list);
				$('#size_center').append(number_input);
				number_input = [];
				number_input_list = '';
			}

			//第四次循环
			var button_list = [];
			var button_color_list = '';
			for(var k in item.spec_name) {
				//				<div'+'my_id='+item.spec_name[k]+'>
				button_color_list += '<div class="color_center display-flex border-bottom-dash">' +
					'<div class="left">' +
					item.spec_name[k] +
					'</div>' +
					'<div class="center flex-end">' +
					'<div id="only" class="bigcircle display-flex">' +
					'<div class="smallcircle active">' +

					'</div>' +
					'</div>' +
					'<div class="one margin-left-10 margin-right-20">单选' +

					'</div>' +
					'<div id="more" class="bigcircle display-flex">' +
					'<div class="smallcircle">' +

					'</div>' +
					'</div>' +
					'<div class="one margin-left-10">多选' +

					'</div>' +
					'</div>' +
					'<div class="right display-flex">' +
					'<div class="all">' +

					'</div>' +
					'</div>' +
					'</div>' +
					'<div class="color_center flex-start margin-bottom-10" id="color_center">';
				//					</div>

				var jj = item.spec_value[k];
				for(var j in jj) {
					button_color_list += '<button' + ' ' + 'my_sp_v_id=' + '"' + jj[j].sp_v_id + '"' + '>' + jj[j].sp_v_name + '</button>'
				}
				'</div>'
				button_list.push(button_color_list);
				$('.color').append(button_color_list);
				button_list = [];
				button_color_list = '';
			}

			function input_active() {
				var spu_id = [];
				$('.color_center button.button_active').each(function() {
					spu_id.push($(this).attr('my_sp_v_id'));
				});
				spu_id.sort(function(a, b) {
					return a - b;
				});
				var sku_id = [];
				for(var i = 0; i < spu_id.length; i++) {
					for(var j = i + 1; j < spu_id.length; j++) {
						var joint = spu_id[i] + '|' + spu_id[j];
						sku_id.push(joint);
					}
				}
				$('.center_list .list input').removeClass('input_active');
				for(var i = 0; i < sku_id.length; i++) {
					$('.center_list .list input').each(function() {
						if($(this).attr('mysku_id') == sku_id[i]) {
							$(this).addClass('input_active')
						}
					});
				}
			}
			//数据加载完成之后的处理
			$('.center .bigcircle').click(function() {
				$(this).find('.smallcircle').addClass('active')
				$(this).siblings().find('.smallcircle').removeClass('active')
			})
			//全选
			$('.color_center .right .all').click(function() {
				$(this).toggleClass('all_active');
				$(this).parent().parent().find('.center #more .smallcircle').addClass('active');
				$(this).parent().parent().find('.center #only .smallcircle').removeClass('active');
				if($(this).parent().parent().next().find('.button_active').length && $(this).parent().parent().next().find('.button_active').length < $(this).parent().parent().next().find('button').length) {
					$(this).parent().parent().next().find('button').addClass('button_active');
				} else {
					$(this).parent().parent().next().find('button').toggleClass('button_active');
				}
				//之后的数据绑定
				input_active();
			})
			//单选的时候取消全选
			$('.center #only').click(function() {
				$(this).parent().parent().find('.right .all').removeClass('all_active');
				$(this).parent().parent().next().find('button').removeClass('button_active');
				input_active();
			})
			//控制颜色尺码
			$('.color_center button').click(function() {
				if($(this).parent().prev().find('.center #only .smallcircle').hasClass('active')) {
					$(this).toggleClass('button_active').siblings().removeClass('button_active')
				} else {
					$(this).toggleClass('button_active')
				};
				if($(this).parent().find('.button_active').length == $(this).parent().find('button').length) {
					$(this).parent().prev().find('.right .all').addClass('all_active');
				} else {
					$(this).parent().prev().find('.right .all').removeClass('all_active');
				};
				input_active();
			})

		} //ajax括弧
	});

	var num = 0;

	function sum() {
		num_array = [];
		all_sum = 0;
		all_price = 0;
		price = 0;
		price_array = [];
		$('.size_center input').each(function() {
			var goods_id = $(this).attr('id');
			for(var k in item.spec_list) {
				if(goods_id == item.spec_list[k].goods_id) {
					var that_num = $(this).val();
					var numbers = parseInt(that_num);
					num_array.push(numbers);
				}
			}
			for(var k in item.spec_list) {
				if(goods_id == item.spec_list[k].goods_id) {
					goods_price = item.spec_list[k].goods_price;
					var goods_prices = parseInt(goods_price);
					price = numbers * goods_prices;
					price_array.push(price);
				}
			}
		})
		console.log(num_array);
		for(var i = 0; i < price_array.length; i++) {
			all_price = all_price + price_array[i];
		}
		$('#all_money').html(all_price);

		for(var i = 0; i < num_array.length; i++) {
			all_sum = all_sum + num_array[i];
		}
		$('#all_numbers').html(all_sum);
	}
	$('.nums .num_center .right .down').click(function() {
		//点击按钮的时候判断是否有元素北选中；
		if($('.input_active').length == 0) {
			$('.warning1').show();
			$('.warning1').animate({
				opacity: '1'
			});
			setTimeout(function() {
				$('.warning1').animate({
					opacity: '0'
				});
			}, 3000);
		} else {
			if($('.nums .num_center .right input').val() > 0) {
				$('.size_center input.input_active').each(function() {
					var before = $(this).val();
					before--
					$(this).val(before);
				})
				num--;

				$('.nums .num_center .right input').val(num);
			} else {
				$('.warning').show();
				$('.warning').animate({
					opacity: '1'
				});
				setTimeout(function() {
					$('.warning').animate({
						opacity: '0'
					});
				}, 3000);
			}
		}
		sum();

	})

	$('.nums .num_center .right .up').click(function() {
		if($('.input_active').length == 0) {
			$('.warning1').show();
			$('.warning1').animate({
				opacity: '1'
			});
			setTimeout(function() {
				$('.warning1').animate({
					opacity: '0'
				});
			}, 3000);
		} else {
			$('.size_center input.input_active').each(function() {
				var before = $(this).val();
				before++
				$(this).val(before);
			})
			num++;
			$('.nums .num_center .right input').val(num);

		}
		sum();
	})
	$('.back').click(function(){
		window.history.go(-1)
	})
	$('#submit').click(function() {
		var formdata = $("form").serialize();
		var goods_commonid = getQueryString('goods_commonid');
		$.ajax({
			url: "http://demo.hzlwo.com/wxapp/index.php?act=ordering&op=cart_add&client_type=app&goods_commonid="+goods_commonid+"&member_id=1",
			data: formdata,
			dataType: "json",
			type: "post",
			traditional: true,
			success: function() {
				console.log("提交成功")
			}

		});
		console.log("提交数据");
	})
})