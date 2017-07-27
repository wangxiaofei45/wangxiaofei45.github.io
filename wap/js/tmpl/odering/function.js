let state_type = 'state_new';
let size = '';
let sc = 'asc';
let order = 'goods_serial';
let page = '10';

function ajaxCommit(type) {
	//我的订单
	if(type == 'order') {
		$('#good-shows').empty();
		//总排行榜	
	} else if(type == 'total') {
		$("#total").empty();
	} else if(type == 'ordermanager') {
		$('#order_completed').empty();
	}
	$.ajax({
		type: "get",
		url: ApiUrl + "/index.php?act=store_ordering&op=ordering_list&state_type=" + state_type + "&size=" + size + "&order=" + order + "&sc=" + sc + "&page=" + page + "&curpage=1"+"&key=9619b96bcf04daac53b600c2aeae2400",
		dataType: "json",
		success: function(data) {
			var datas = data.datas;
			var item = datas.ordering_list;
			var list = [];
			//我的订单 数据模板
			if(type == 'order') {
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
						
						'<a href="/wap/tmpl/ordering/dinghuohuidingdan.html?goods_commonid='+item[i].goods_commonid+'">'+
						'<div class="modellist_container display-flex">'+
						'<div class="modellist-2 border-rights list-height line-height text-center">' +
						item[i].num +
						'</div>' +
						'<div class="modellist-3 border-rights list-height line-height text-center">' +
						item[i].goods_price +
						'</div>' +
						'<div class="modellist-4 list-height line-height text-center">' +
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
				$('#good-shows').append(list);
				//总排行榜 数据模板	
			} else if(type == 'total') {
				for(var i = 0; i < item.length; i++) {
					var li =
						'<div class="container-bar center"><div class="flex-nowrap border-bottoms">' +
						'<div class="list-1 border-rights list-height display-flex">' +
						'<a href="/wap/tmpl/ordering/dinghuohui3.html?goods_commonid='+item[i].goods_commonid+'&goods_sum='+item[i].goods_sum+'">'+
						'<img src="'+ item[i].goods_image + '" />' +
						'</a>'+
						'<div class="text">' +
						'<div class="gray">' +
						item[i].goods_common_name +
						'</div>' +
						'<div>' +
						item[i].goods_serial +
						'</div>' +
						'</div>' +
						'</div>' +
						'<a href="/wap/tmpl/ordering/dinghuohuidingdan.html?goods_commonid='+item[i].goods_commonid+'">'+
                        '<div class="list_container display-flex">'+
						'<div class="list-2 border-rights list-height line-height text-center">'+
						item[i].num +
						'</div>' +
						'<div class="list-3 border-rights list-height line-height text-center">' +
						item[i].goods_price +
						'</div>' +
						'<div class="list-4 border-rights list-height line-height text-center">' +
						item[i].total_price +
						'</div>' +
						'<div class="list-5 list-height line-height text-center">' +
						item[i].sort +
						'</div>' +
						'</div>' +
						'</a>'+
						'</div></div>' +
						'</div>'

					list.push(li);
				}
				$('#total').append(list);

			}

		},

		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
			
		}
	});
};
