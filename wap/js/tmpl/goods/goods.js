$(function() {
	var token 		= 0;
	var member_id 	= 0;
	var keyword 	= 0;
	var filter_type = 0;
	var sort_id 	= 0;
	var has_id 		= 0;
	var minPrice    = 0;
	var maxPrice    = 0;
	var curpage    	= 1;
	var keyword    	= '';
	var goodsajaxCommit 	= function() {
		$("#show1").empty();
		$("#two").empty();
		$.ajax({
			type: "get",
			url: WxappSiteUrl + "/index.php?act=ordering_goods&op=index&token="+token+"&member_id="+member_id+"&keyword="+keyword+"&filter_type="+filter_type+"&sort_id="+sort_id+"&has_id="+has_id+"&minPrice="+minPrice+"&maxPrice="+maxPrice+"&curpage="+curpage+"&keyword="+keyword,
			dataType: "json",
			success: function(data) {
				var datas = data.datas;
				var item  = datas;
				var list  = [];
				var list2 = [];
					for(var i = 0; i < item.length; i++) {
						var li1 = '<div class="show1 display-flex">'+
					'<div class="show-list display-flex">'+

						'<div class="show-list-1 display-flex">'+
							'<a href="/wap/tmpl/ordering/dinghuohui3.html?goods_commonid='+item[i].goods_commonid+'&goods_sum='+item[i].goods_sum+'"><div class="image">'+
								'<img src="'+
								item[i].goods_image
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
							item[i].goods_price
							+'</span></div>'+
						'</div>'+
						'<div class="show-list-3 display-flex">'+
							'<a href="/wap/tmpl/ordering/dinghuohuidingdan.html?goods_commonid='+item[i].goods_commonid+'"><div class="circle">'+
								item[i].goods_sum
							'</div>'+
							'</a>'+
						'</div>'+
					'</div>'+
				'</div>'




				var li2 = '<div class="show_list">'+
							'<a href="/wap/tmpl/ordering/dinghuohui3.html?goods_commonid='+item[i].goods_commonid+'&goods_sum='+item[i].goods_sum+'"><div class="img">'+
								'<img src="'+
								item[i].goods_image
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
										item[i].goods_price
									+'</div>'+
								'</div>'+
								'<div class="show-list-3 display-flex">'+
									'<a href="/wap/tmpl/ordering/dinghuohuidingdan.html?goods_commonid='+item[i].goods_commonid+'"><div class="circle">'+
								item[i].goods_sum
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
}
	$(".bar-position1 .bar-pisition-list").click(function(){
		sort_id = $(this).index();	
		goodsajaxCommit();
	});
	$(".bar-position2 .bar-pisition-list").click(function(){
		has_id = $(this).index();	
		goodsajaxCommit();
	});
	$("#submit").click(function(){
		minPrice = $("#input1").val();
		maxPrice = $("#input2").val();
		goodsajaxCommit();
	});
	$("#search").click(function(){
		keyword = $("#keyword").val();
		goodsajaxCommit();
	});
	goodsajaxCommit();
	})