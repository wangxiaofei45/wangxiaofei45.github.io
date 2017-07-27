$(function(){
	var ordering_id = getQueryString('ordering_id');
		$.ajax({
		type: "get",
		url: ApiUrl +"/index.php?act=store_ordering&op=ordering_list&ordering_id="+ordering_id+"&order=num&sc=desc&page=10&curpage=1&key=9619b96bcf04daac53b600c2aeae2400",
		dataType: "json",
		success: function(data) {
			var datas = data.datas;
			console.log(datas);
			var item = datas.ordering_list;
			var list = [];
			//我的订单 数据模板
				for(var i = 0; i < item.length; i++) {
					var li =
					'<div class="good-show">' +
						'<div class="container-bar center">' +
						'<div class="display-flex border-bottoms">' +
						'<div class="modellist-1 border-rights list-height flex-start">' +
						'<a href="/wap/tmpl/ordering/dinghuohui3.html?goods_commonid='+item[i].goods_commonid+'&goods_sum='+item[i].goods_sum+'">'+
						'<img src="'+ item[i].goods_image + '" />' +
						'</a>'+
						'<div class="text">' +
						'<div class="gray">' + item[i].goods_common_name + '</div>' +
						'<div>' + item[i].goods_serial + '</div>' +
						'</div>' +
						'</div>' +
						
						'<a href="/wap/tmpl/ordering/dinghuohuidingdan.html?type=record&goods_commonid='+item[i].goods_commonid+'">'+
						'<div class="modellist_container display-flex">'+
						'<div class="modellist-2 border-rights list-height display-flex text-center">' +
						item[i].num +
						'</div>' +
						'<div class="modellist-3 border-rights list-height display-flex text-center">' +
						item[i].goods_price +
						'</div>' +
						'<div class="modellist-4 list-height display-flex text-center">' +
						item[i].total_price +
						'</div>' +
						'</div>' +
						'</a>'+
						
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' 
					list.push(li);
				}
				console.log(list);
				$('.goods_shows').append(list);
		},

		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
			console.log(errorThrown);
			
		}
	});
})
