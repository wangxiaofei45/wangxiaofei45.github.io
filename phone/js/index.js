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
	
})