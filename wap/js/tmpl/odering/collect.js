$(function() {
	$('#Samplesoftables').click(function() {
		if($('.iconfont01').css('display') == 'block') {
			$('.iconfont01').css('display', 'none').siblings().css('display', 'block');
		} else {
			$('.iconfont01').css('display', 'block').siblings().css('display', 'none');
		}
		if($('#show1').css('display') == 'block') {
			$('#show1').css('display', 'none').siblings().css('display', 'block')
		} else {
			$('#show1').css('display', 'block').siblings().css('display', 'none')
		}
	})
	$('.back').click(function(){
		window.history.go(-1)
	})
	$("#show1").empty();
	$("#two").empty();
		$.ajax({
			type: "get",
			url: ApiUrl + "/index.php?act=store_ordering&op=favorites_list&shopping_id=1&key=9619b96bcf04daac53b600c2aeae2400",
			dataType: "json",
			success: function(data) {
				console.log(data);
				var datas = data.datas.favorites_list;
				console.log(datas)
				var item  = datas;
				var list  = [];
				var list2 = [];
				
				for(var i = 0; i < item.length; i++) {
						var li1 = '<div class="show1 display-flex">'+
					'<div class="show-list display-flex">'+

						'<div class="show-list-1 display-flex">'+
							'<a href="/wap/tmpl/ordering/dinghuohui3.html?goods_commonid='+item[i].fav_id+'&goods_sum='+item[i].goods_num+'"><div class="image">'+
								'<img src="'+
								item[i].goods_image_url
								+'" />'+
							'</div></a>'+
						'</div>'+
						'<div class="show-list-2">'+
							'<div class="goods-name">'+
							item[i].goods_name
							+'</div>'+
							'<div class="goods-num">'+
							item[i].goods_serial
							+'</div>'+
							'<div class="goods-price "><span class="iconfont">&#xe600;</span><span>'+
							item[i].log_msg
							+'</span></div>'+
						'</div>'+
						'<div class="show-list-3 display-flex">'+
							'<a href="/wap/tmpl/ordering/dinghuohuidingdan.html?goods_commonid='+item[i].fav_id+'"><div class="circle">'+
								item[i].goods_num
							'</div>'+
							'</a>'+
						'</div>'+
					'</div>'+
				'</div>'

                 var li2 = '<div class="show_list">'+
							'<a href="/wap/tmpl/ordering/dinghuohui3.html?goods_commonid='+item[i].fav_id+'&goods_sum='+item[i].goods_num+'"><div class="img">'+
								'<img src="'+
								item[i].goods_image_url
								+'" />'+
							'</div></a>'+
							'<div class="name">'+
								item[i].goods_name
							+'</div>'+
							'<div class="text display-flex">'+
								'<div class="show-list-2">'+
									'<div class="goods-num">'+
										item[i].goods_serial
									+'</div>'+
									'<div class="goods-price ">'+
										'<span class="iconfont">&#xe600;</span>'+
										item[i].log_msg
									+'</div>'+
								'</div>'+
								'<div class="show-list-3 display-flex">'+
									'<a href="/wap/tmpl/ordering/dinghuohuidingdan.html?goods_commonid='+item[i].fav_id+'"><div class="circle">'+
								item[i].goods_num
							'</div>'+
							'</a>'+
								'</div>'+
							'</div>'+
						'</div>'

						list.push(li1);
						list2.push(li2);
					}
					$('#show1').append(list);
					$('#two').append(list2);

			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});

})