$(function() {
	var chart = null;
	var keyword = '';
			$.ajax({
			type: "get",
			url: ApiUrl + "/index.php?act=store_ordering&op=analys&keyword=" + keyword + "&key=9619b96bcf04daac53b600c2aeae2400",
			dataType: "json",
			success: function(data) {
				var data = data.datas;
				var goods_spec_name = data.goods_spec_name; //商品属性名称
				//商品属性名称
				if(goods_spec_name) {
					$("#goods_spec").empty();
					var goods_spec = "";
					for(var i = 0; i < goods_spec_name.length; i++) {
						goods_spec += '<div class="button">' +
							goods_spec_name[i] +
							'</div>';
					}
					$("#goods_spec").append(goods_spec);
					$("#goods_spec .button").eq(0).addClass("button_active");
				}
				$(".button").click(function() {
					keyword = $(this).text();
					$(this).addClass("button_active").siblings().removeClass("button_active");
					analysajaxCommit(keyword);
				});

			},

			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});
	var analysajaxCommit = function(keyword) {
		$.ajax({
			type: "get",
			url: ApiUrl + "/index.php?act=store_ordering&op=analys&keyword=" + keyword + "&key=9619b96bcf04daac53b600c2aeae2400",
			dataType: "json",
			success: function(data) {
				var data = data.datas;
				
				var color = [];
				for(var i=0;i<data.spec_num_list.length;i++){
					color.push(data.spec_num_list[i].color);
				}
                var numdatas = [];
                for(var i=0;i<data.spec_num_list.length;i++){
                	var arrays = [];
                	var proportionastr = '';
                	var proportion =[];
                	var spec_name = '';
                	spec_name = data.spec_num_list[i].spec_name;
                	proportionastr = data.spec_num_list[i].proportion;
                	proportion = proportionastr.split(" ");
                	var frist = proportion[0];
                	var fristnum = parseFloat(frist);
                	arrays.push(spec_name);
                	arrays.push(fristnum);
                	numdatas.push(arrays);
                }
				//加载图形
				Highcharts.chart('container', {
					colors: color,
					title: {
						floating: true,
						text: '占比'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							point: {
								events: {
									mouseOver: function(e) {
										chart.setTitle({
											text: e.target.name + '\t' + e.target.y + ' %'
										});
									}
								}
							},
						}
					},
					series: [{
						type: 'pie',
						innerSize: '30%', //里面的圆的大小
						name: '市场份额',
						data: numdatas
					}]
				}, function(c) {
					// 环形图圆心
					var centerY = c.series[0].center[1],
						titleHeight = parseInt(c.title.styles.fontSize);
					c.setTitle({
						y: centerY + titleHeight / 2
					});
					chart = c;
				});
				//加载图形完毕
				var goods_spec_name = data.goods_spec_name; //商品属性名称
				var spec_num_list = data.spec_num_list; //商品属性订单列表
				var completion_target = data.completion_target; //指标完成

				//指标完成
				if(completion_target) {
					$("#completion_target").empty();
					var completion_target_data = "";
					completion_target_data += '<div class="texts">指标完成(元)</div>' +
						'<div class="texts"><span>' + completion_target['total_price'] + '</span></div>' +
						'<div class="texts"><span>' + completion_target['total_size_num'] + '</span>款<span>' + completion_target['total_num'] + '</span>件</div>';
					$("#completion_target").append(completion_target_data);
				}
				//商品属性订单列表
				if(spec_num_list) {
					var goods_spec_list = "";
					$("#goods_spec_list").empty();
					for(var i = 0; i < spec_num_list.length; i++) {
						goods_spec_list += '<div class="anails_num_list display-flex"><div class="num_list01 display-flex">' +
							'<div class="color" style="background-color:' + spec_num_list[i]['color'] + '">' +

							'</div>' +
							'</div>' +
							'<div class="num_list02 text-center">' +
							spec_num_list[i]['spec_name'] +
							'</div>' +

							'<div class="num_list03 text-center">' +
							spec_num_list[i]['num'] +
							'</div>' +
							'<div class="num_list04 text-center">' +
							spec_num_list[i]['proportion'] +
							'</div></div>';
					}

					$("#goods_spec_list").append(goods_spec_list);
				}
			},

			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});
	}
	analysajaxCommit(keyword);
    //控制效果
    $("#filter").click(function(){

    	$('.body').animate({
			left: "0%"
		});
    })
    $('.container-left').click(function(){
    	$('.body').animate({
			left: "100%"
		});
    })
})