$(function(){
	$('.back').click(function(){
		window.history.go(-1)
	})

//我的个人信息
	$.ajax({
        type: "get",
        url: ApiUrl + "/index.php?act=member&op=member&key=9619b96bcf04daac53b600c2aeae2400",
        dataType: "json",
        success: function(data) {
            var member_info = data.datas.member_info;
            var name = member_info.member_name;
            $(".name2").text(name);

           
        },
    
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
        }
    });
//我的邀请码
	$.ajax({
        type: "get",
        url: ApiUrl + "/index.php?act=member&op=my_extension_code&key=9619b96bcf04daac53b600c2aeae2400",
        dataType: "json",
        success: function(data) {
            var member_info = data.datas.member_info;
            var extension_code = member_info.extension_code;
            var extension_qrcode = member_info.extension_qrcode;
			$("#extension_code").text(extension_code);       
			$("#image").attr('src',extension_qrcode);       
        },
    
        error: function(xhr, type, errorThrown) {
            //异常处理；
            console.log(type);
        }
    });
//退出登录
	$("#out").click(function(){

		var url = WapSiteUrl + "/tmpl/ordering/login.html";
		window.location.href=url;
	});
//修改密码
	$("#submit").click(function(){

		var password = $("#password").val(); //原始密码		
		var new_password = $("#new_password").val(); //新的密码
		var confirm_new_password = $("#confirm_new_password").val(); //确认密码
		if(!password){
			alert("原始密码不能为空！");
			return;
		}
		if(!new_password){
			alert("新的密码不能为空！");
			return;
		}
		if(!confirm_new_password){
			alert("确认密码不能为空！");
			return;
		}

		//http://zlin.test5.com/mobile/index.php?act=member&op=editpwd&password=123456&new_password=111111&confirm_new_password=111111&key=fd13bb16e0e8bfebc0ac7ce647947dc5
		$.ajax({
            type: "get",
            url: ApiUrl + "/index.php?act=member&op=editpwd&password="+password+"&new_password="+new_password+"&confirm_new_password="+confirm_new_password+"&key=9619b96bcf04daac53b600c2aeae2400",
            dataType: "json",
            success: function(data) {
                var datas = data.datas;

                    alert(datas.msg);
               
            },
        
            error: function(xhr, type, errorThrown) {
                //异常处理；
                console.log(type);
            }
        });
        return;
	});
	
})
