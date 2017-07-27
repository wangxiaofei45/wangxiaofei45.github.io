$(function(){

let login_type = 1;
//获取验证码
function ajaxCommit_get_sms_captcha(phone,type) {

	$.ajax({
		type: "get",
		url: ApiUrl + "/index.php?act=mobilelogin&op=get_sms_captcha&phone="+phone+"&type="+type,
		dataType: "json",
		success: function(data) {
			/*console.log(data);
			return;*/
			if(data.code == 200){
				alert("验证码已发出");
				return;
			}else{
				alert("验证码发送失败");
				return;
			}
			
		},

		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
};

//登录
function ajaxCommit_login(phone,password,login_type) {
	if(login_type == 1){
		var verif_type = 'password';
	}else if(login_type == 2){
		var verif_type = 'captcha';
	}
	$.ajax({
		type: "get",
		url: ApiUrl + "/index.php?act=mobilelogin&op=login&phone="+phone+"&"+verif_type+"="+password+"&login_type="+login_type+"&client=wap",
		dataType: "json",
		success: function(data) {
			console.log(data);

			if(data.datas.length == 0){
				alert(data.error);
				return;
			}

			if(data.state == 'false'){
				alert(data.msg);
				return;
			}

			var datas = data.datas;
			var member_id = datas.userid;
			if(member_id){
				alert("登录成功");
				window.location.href = WapSiteUrl+"/tmpl/ordering/index.html";
			}else{
				alert("登录失败");
			}
		},

		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
};



//注册
function ajaxCommit_register(phone,password,captcha,invitation) {

	$.ajax({
		type: "get",
		url: ApiUrl + "/index.php?act=mobilelogin&op=register&phone="+phone+"&password="+password+"&captcha="+captcha+"&invitecode="+invitation+"&client=wap",
		dataType: "json",
		success: function(data) {
			var datas = data.datas;
			var member_id = datas.userid;
			if(member_id){
				window.location.href = WapSiteUrl+"/tmpl/ordering/index.html";
			}else{
				alert("注册失败");
			}
		},

		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
};


	$('.signup').click(function(){
       $('#get_container').css('display', 'block');
       $(this).css('display', 'none');
       $('.signups').css('display', 'block')
       $('.forgot').css('display', 'none')
       $('.button_signp').css('display', 'block')
       $('.button_login').css('display', 'none')
       $('.tab').css('display', 'none')

	})
	$('.signups').click(function(){
		 $('#get_container').css('display', 'none');
       $(this).css('display', 'none');
       $('.signup').css('display', 'block')
       $('.forgot').css('display', 'block')
       $('.button_login').css('display', 'block')
       $('.button_signp').css('display', 'none')
        $('.tab').css('display', 'block')
        $('.tab1').css('display', 'block')
        $('.tab2').css('display', 'none')

	})
	
	$('.tab1').click(function(){
		$(this).css('display', 'none');
		$('.tab2').css('display', 'block');
		$('.get_nu').css('display', 'none');
		$('.get_nus').css('display', 'block');
	})
	$('.tab2').click(function(){
		$(this).css('display', 'none');
		$('.tab1').css('display', 'block');
		$('.get_nu').css('display', 'block');
		$('.get_nus').css('display', 'none');
	})


	$(".get_number").click(function(){

		var phone = $("#phone").val();

		if(!phone){
			alert("请填写手机号");
			return;
		}
		 type = $(this).attr('type');
		//登录
		if(type == 'login'){
			 type = 2;
		//注册
		}else if(type == 'register'){
			 type = 1;
		}

		ajaxCommit_get_sms_captcha(phone,type)
	})

	
	//密码登录
	$("#pas_login").click(function(){
		login_type = 1;
	})
	//验证码登录
	$("#captcha_login").click(function(){
		login_type = 2;
	})

	//登录
	$(".button_login").click(function(){

		var phone = $("#phone").val();
		var password = $("#password").val();
		var captcha = $("#login").val();
		if(!captcha){
			captcha = $("#register").val();
		}

		if(!phone){
			alert("请填写手机号");
			return;
		}
		if(login_type==1){
			if(!password){
				alert("密码不能为空");
				return;
			}
			ajaxCommit_login(phone,password,login_type);
		}else if(login_type==2){
			if(!captcha){
				alert("验证码不能为空");
				return;
			}
			ajaxCommit_login(phone,captcha,login_type);
		}
				
	})

	//注册
	$(".button_signp").click(function(){
		var phone = $("#phone").val();
		var password = $("#password").val();
		var captcha = $("#register").val();
		var invitation = $("#invitation").val();


		if(!phone){
			alert("请填写手机号");
			return;
		}
		
		if(!password){
			alert("密码不能为空");
			return;
		}
			
		if(!captcha){
			alert("验证码不能为空");
			return;
		}

		if(!invitation){
			alert("邀请码不能为空");
			return;
		}
		ajaxCommit_register(phone,password,captcha,invitation);
		
	})
})
