$(function() {
	$('#button').click(function(){
		console.log("35545")
	})
	/*我的订单*/
	sc = 'asc';
		ajaxCommit('order');
	$("#my_order").click(function(){
		 state_type = 'state_new';
		 size = '';
		 sc = 'asc';
		 order = 'goods_serial';
		 page = '10';
		 ajaxCommit('order');
	});
	$('#up-order').click(function() {
		sc = 'asc';
		ajaxCommit('order');
	})
	$('#down-order').click(function() {
		sc = 'desc';
		ajaxCommit('order');
	})
	$('#Productnumber').click(function() {
		order = 'goods_serial';
		ajaxCommit('order');
	})
	$('#Number').click(function() {
		order = 'num';
		ajaxCommit('order');
	})
	$('#valuesales').click(function() {
		order = 'total_price';
		ajaxCommit('order');
	})
	/*总排行榜*/
	$('.tabbar .bars-list').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
	})
	$("#total_data").click(function() {
		state_type = '';
		size = 'total';
		sc = 'desc';
		order = 'num';
		page = '0';
		ajaxCommit('total');
	});
	
	$('.tabbar .bars-list').eq(0).click(function() {
		$('.model-1').css('display', 'block');
		$('.model-2').css('display', 'none');
	})
	$('.tabbar .bars-list').eq(1).click(function() {
		$('.model-1').css('display', 'none');
		$('.model-2').css('display', 'block');
	})
	
	$('.tabbar .bars-list').eq(2).click(function() {
		$(".model-3").animate({
			left: "0px"
		});
	})
	//排行榜结束
	$('.footer-right').click(function() {
		$('.model-3').animate({
			left: "100%"
		});
	})
	//filter01点击切换样式
	$('.filter-center .filter01 .small-circle').click(function() {
		//		$(this).toggleClass('filter-active');
		$(this).addClass('filter-active').parents(".filter-list").siblings().find('.small-circle').removeClass('filter-active');
	})
	//filter02点击切换样式
	$('.filter-center .filter02 .small-circle').click(function() {

		//		$(this).toggleClass('filter-active');
		$(this).addClass('filter-active').parents(".filter-list").siblings().find('.small-circle').removeClass('filter-active');
	})
	//filter02点击
	$('#default').click(function() {
		$('.bar-position2').css('display', 'none')
		$('.bar-position1').animate({
			height: 'toggle'
		})
	})

	$('#all').click(function() {
		$('.bar-position1').css('display', 'none')
		$('.bar-position2').animate({
			height: 'toggle'
		})
	})
	$('.bar-position1 .bar-pisition-list').click(function(){
		var a  = $(this).html();
		$('.bar-list-1 .text').html(a)
		$('.bar-position1').animate({
			height: 'toggle'
		})
	})
	$('.bar-position2 .bar-pisition-list').click(function(){
		var a  = $(this).html();
		$('.bar-list-2 .text').html(a)
		$('.bar-position2').animate({
			height: 'toggle'
		})
	})
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

	$('#display').click(function(){
		$("#show3").css('display','block').siblings().css('display','none');
		$('.bar-position2').css('display','none')
		$('.bar-position1').css('display','none')
	})
	$('#alls').click(function(){
		$("#show2").css('display','block').siblings().css('display','none')
	})
	//筛选
	$('#filters').click(function(){
		$('.body').animate({left:'0px'})
	})
	$('.body .container-left').click(function(){
		$('.body').animate({left:'100%'})
	})
	$('#submit').click(function(){
		var min = $('.filter-input #input1').val()
		var max = $('.filter-input #input2').val()
	})
	$('.footer .col-3').click(function(){
		$(this).addClass('footer_active').siblings().removeClass('footer_active')
	})
	$("#ordermanager").click(function(){
		window.location.href = WapSiteUrl+"/tmpl/ordering/orderforgoods.html";
	});
	$("#goback").click(function(){
		window.history.go(-1)
	})
	$('.goodsshowheader .back .back_img').click(function(){
			window.history.go(-1)
		})
})