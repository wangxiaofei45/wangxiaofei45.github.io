﻿var goods_id = getQueryString("goods_id");
var map_list = [];
var map_index_id = "";
var store_id;
var e = getCookie("key");
var iMall_extension = getCookie("iMall_extension");
var invite_code = getQueryString("extension");
if(iMall_extension){
	iMall_extension = "&extension="+iMall_extension;
}
if(iMall_extension&&invite_code==''){
	window.location.href = WapSiteUrl + "/tmpl/product_detail.html?goods_id=" + goods_id+iMall_extension;
}
$(function() {
    var t = function(e, t) {
        e = parseFloat(e) || 0;
        if (e < 1) {
            return ""
        }
        var o = new Date;
        o.setTime(e * 13);
        var a = "" + o.getFullYear() + "-" + (1 + o.getMonth()) + "-" + o.getDate();
        if (t) {
            a += " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds()
        }
        return a
    };
    var o = function(e, t) {
        e = parseInt(e) || 0;
        t = parseInt(t) || 0;
        var o = 0;
        if (e > 0) {
            o = e
        }
        if (t > 0 && o > 0 && t < o) {
            o = t
        }
        return o
    };
    template.helper("isEmpty", function(e) {
        for (var t in e) {
            return false
        }
        return true
    });
    function a() {
        var e = $("#mySwipe")[0];
        var bullets = document.getElementById('mySwipe').getElementsByTagName('li'); 
        var i = bullets.length;  
        
        window.mySwipe = Swipe(e, {
            continuous: false,
            stopPropagation: true,
            callback: function(e, t) {
                $(".goods-detail-turn").find("li").eq(e).addClass("cur").siblings().removeClass("cur");
				if(e>=i-1){
					var store_id = $("#store_id").val();
		        	if(store_id){
		        		window.location.href = WapSiteUrl + "/tmpl/product_info.html?goods_id=" + goods_id+"&store_id="+store_id+iMall_extension;
		        	}else{
		        		window.location.href = WapSiteUrl + "/tmpl/product_info.html?goods_id=" + goods_id+iMall_extension;
		        	}
				}
            }
        })
    }
    /* 因为有些用户无法要求人的时候就会出现 iMall_extension = null*/
    r(goods_id);
    function i(e, t) {
        $(e).addClass("current").siblings().removeClass("current");
        var o = $(".spec").find("a.current");
        var a = [];
        $.each(o, 
        function(e, t) {
            a.push(parseInt($(t).attr("specs_value_id")) || 0)
        });
        var i = a.sort(function(e, t) {
            return e - t
        }).join("|");
        goods_id = t.spec_list[i];
        r(goods_id)
    }
    function s(e, t) {
        var o = e.length;
        while (o--) {
            if (e[o] === t) {
                return true
            }
        }
        return false
    }
    $.sValid.init({
        rules: {
            buynum: "digits"
        },
        messages: {
            buynum: "请输入正确的数字"
        },
        callback: function(e, t, o) {
            if (e.length > 0) {
                var a = "";
                $.map(t, function(e, t) {
                    a += "<p>" + e + "</p>"
                });
                $.sDialog({
                    skin: "red",
                    content: a,
                    okBtn: false,
                    cancelBtn: false
                })
            }
        }
    });
    function n() {
        $.sValid()
    }
    function r(r) {
        $.ajax({
            url: ApiUrl + "/index.php?act=goods&op=goods_detail",
            type: "get",
            data: {
                goods_id: r,
                key: e,
                invite_code:invite_code
            },
            dataType: "json",
            success: function(e) {                
                if (!e.error) {
					var l = e.datas;
					
                    if (l.goods_image) {
                        var d = l.goods_image.split(",");
                        l.goods_image = d
                    } else {
                        l.goods_image = []
                    }
                    if (l.goods_info.spec_name) {
                        var c = $.map(l.goods_info.spec_name, function(e, t) {
                            var o = {};
                            o["goods_spec_id"] = t;
                            o["goods_spec_name"] = e;
                            if (l.goods_info.spec_value) {
                                $.map(l.goods_info.spec_value, function(e, a) {
                                    if (t == a) {
                                        o["goods_spec_value"] = $.map(e, function(e, t) {
                                            var o = {};
                                            o["specs_value_id"] = t;
                                            o["specs_value_name"] = e;
                                            return o
                                        })
                                    }
                                });
                                return o
                            } else {
                                l.goods_info.spec_value = []
                            }
                        });
                        l.goods_map_spec = c
                    } else {
                        l.goods_map_spec = []
                    }
                    if(l.goods_info.goods_spec==null){
                    	l.goods_info.goods_spec = [];
                    }
                    //console.log(l);
                    if (l.goods_info.is_virtual == "1") {
                        l.goods_info.virtual_indate_str = t(l.goods_info.virtual_indate, true);
                        l.goods_info.buyLimitation = o(l.goods_info.virtual_limit, l.goods_info.upper_limit)
                    }
                    if (l.goods_info.is_presell == "1") {
                        l.goods_info.presell_deliverdate_str = t(l.goods_info.presell_deliverdate)
                    }
					if ((l.store_info.promotion_apply==1 || l.store_info.member_id>0)){
						$("#J_Topnav").removeClass("hide");
						var html = template.render("J_Topnav_tmpl", l);
						//$("#J_Topnav").html(html);
						
						$(".J_TopbarClose").click(function() {
							$("#J_Topnav").addClass("hide");
                        });
						if(l.store_info.extension_type !=0){
							$(".J_TopbarOpen").click(function() {
								$("#bdshare").click();
							});
						}else{
							$(".J_TopbarOpen").click(function() {
								window.location.href = WapSiteUrl + "/tmpl/member/"+l.store_info.apply_extension_url+"?store_id="+l.store_info.store_id;
								var key = getCookie("key");
								if(key==''){
									location.href = 'member/login.html';
								}
								$.ajax({
									type:'post',
									url:ApiUrl+"/index.php?act=store_addapply&op=index&store_id="+l.store_info.store_id,	
									data:{
										key:key,
										member_id:l.store_info.member_id
									},
									dataType:'json',
									success:function(result){
										if (!CheckDataSucceed(result)){return false;}

										$.sDialog({
					                        skin:"red",
					                        content:result.datas.msg,
					                        okBtn:true,
					                        cancelBtn:false,
										    okFn: function() {location.href = WapSiteUrl+'/tmpl/member/member.html';}
									    });
										//$(".error-tips").hide();
									},
									error: function(){
								        ShowGetDataError();
							        }
								});	
	                        });	
						}
									
					}
							
                    var html = template.render("product_detail", l);
								
                    $("#product_detail_html").html(html);
                    if (l.goods_info.is_virtual == "0") {
                        $(".goods-detail-o2o").remove()
                    }					
                    var html_sepc = template.render("product_detail_sepc", l);
                    $("#product_detail_spec_html").html(html_sepc);
					
                    var html = template.render("voucher_script", l);
                    $("#voucher_html").html(html);
					
                    if (l.goods_info.is_virtual == "1") {
                        store_id = l.store_info.store_id;
                        virtual()
                    }
                    if (getCookie("cart_count")) {
                        if (getCookie("cart_count") > 0) {
                            $("#cart_count,#cart_count1").html("<sup>" + getCookie("cart_count") + "</sup>")
                        }
                    }
                    a();
                    $(".pddcp-arrow").click(function() {
                        $(this).parents(".pddcp-one-wp").toggleClass("current")
                    });
                    var p = {};
                    p["spec_list"] = l.spec_list;
                    $(".spec a").click(function() {
                        var e = this;
                        i(e, p)
                    });
                    $(".minus").click(function() {
                        var e = $(".buy-num").val();
                        if (e > 1) {
                            $(".buy-num").val(parseInt(e - 1))
                        }
                    });
                    $(".add").click(function() {
                        var e = parseInt($(".buy-num").val());
                        if (e < l.goods_info.goods_storage) {
                            $(".buy-num").val(parseInt(e + 1))
                        }
                    });
                    if (l.goods_info.is_fcode == "1") {
                        $(".minus").hide();
                        $(".add").hide();
                        $(".buy-num").attr("readOnly", true)
                    }
					//修改返回首页地址
					$("#backto_home").attr('href','store.html?store_id='+l.store_info.store_id);
					//绑定店铺 zhangchao
					$("#store_id").val(l.store_info.store_id);
					//分销
                    $(".pd-distribute").click(function() {
						if (distributeGoods(r)) $(this).addClass("distribute")
                    });
					//分享数据
			        mShareName = l.goods_info.goods_name;
                    mShareURL = l.goods_info.goods_url;
                    mShareContent = l.goods_info.goods_jingle;
					if (l.goods_image && l.goods_image.length>0){
						mSharePic = l.goods_image[0];			            
			        }else{
			            mSharePic ='';
			        }	
					
					//分享			
			        window._bd_share_config.common.bdText = mShareName;
			        window._bd_share_config.common.bdDesc = mShareContent;
			        window._bd_share_config.common.bdUrl = mShareURL;
					window._bd_share_config.common.bdPic = mSharePic;
			        		
                    $(".pd-share").click(function (){
				        $("#bdshare").click();
			        });
			        with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion="+~(-new Date()/36e5)];
					//收藏
                    $(".pd-collect").click(function() {
                        if ($(this).hasClass("favorate")) {
                            if (dropFavoriteGoods(r)) $(this).removeClass("favorate")
                        } else {
                            if (favoriteGoods(r)) $(this).addClass("favorate")
                        }
                    });
                    $("#add-cart").click(function() {
                        var e = getCookie("key");
                        var t = parseInt($(".buy-num").val());
                        if (!e) {
                            var o = decodeURIComponent(getCookie("goods_cart"));
                            if (o == null) {
                                o = ""
                            }
                            if (r < 1) {
                                show_tip();
                                return false
                            }
                            var a = 0;
                            if (!o) {
                                o = r + "," + t;
                                a = 1
                            } else {
                                var i = o.split("|");
                                for (var n = 0; n < i.length; n++) {
                                    var l = i[n].split(",");
                                    if (s(l, r)) {
                                        show_tip();
                                        return false
                                    }
                                }
                                o += "|" + r + "," + t;
                                a = i.length + 1
                            }
                            addCookie("goods_cart", o);
                            addCookie("cart_count", a);
                            show_tip();
                            getCartCount();
                            $("#cart_count,#cart_count1").html("<sup>" + a + "</sup>");
                            return false
                        } else {
                            $.ajax({
                                url: ApiUrl + "/index.php?act=member_cart&op=cart_add",
                                data: {
                                    key: e,
                                    goods_id: r,
                                    quantity: t
                                },
                                type: "post",
                                success: function(e) {
                                    var t = $.parseJSON(e);
                                    if (checkLogin(t.login)) {
                                        if (!t.error) {
                                            show_tip();
                                            delCookie("cart_count");
                                            getCartCount();
                                            $("#cart_count,#cart_count1").html("<sup>" + getCookie("cart_count") + "</sup>")
                                        } else {
                                            $.sDialog({
                                                skin: "red",
                                                content: t.error,
                                                okBtn: false,
                                                cancelBtn: false
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    });
                    if (l.goods_info.is_virtual == "1") {
                        $("#buy-now").click(function() {
                            var e = getCookie("key");
                            if (!e) {
                                window.location.href = WapSiteUrl + "/tmpl/member/login.html";
                                return false
                            }
                            var t = parseInt($(".buy-num").val()) || 0;
                            if (t < 1) {
                                $.sDialog({
                                    skin: "red",
                                    content: "参数错误！",
                                    okBtn: false,
                                    cancelBtn: false
                                });
                                return
                            }
                            if (t > l.goods_info.goods_storage) {
                                $.sDialog({
                                    skin: "red",
                                    content: "库存不足！",
                                    okBtn: false,
                                    cancelBtn: false
                                });
                                return
                            }
                            if (l.goods_info.buyLimitation > 0 && t > l.goods_info.buyLimitation) {
                                $.sDialog({
                                    skin: "red",
                                    content: "超过限购数量！",
                                    okBtn: false,
                                    cancelBtn: false
                                });
                                return
                            }
                            var o = {};
                            o.key = e;
                            o.cart_id = r;
                            o.quantity = t;
                            $.ajax({
                                type: "post",
                                url: ApiUrl + "/index.php?act=member_vr_buy&op=buy_step1",
                                data: o,
                                dataType: "json",
                                success: function(e) {
                                    if (e.error) {
                                        $.sDialog({
                                            skin: "red",
                                            content: e.error,
                                            okBtn: false,
                                            cancelBtn: false
                                        })
                                    } else {
                                        location.href = WapSiteUrl + "/tmpl/order/vr_buy_step1.html?goods_id=" + r + "&quantity=" + t
                                    }
                                }
                            })
                        })
                    } else {
                        $("#buy-now").click(function() {
                            var e = getCookie("key");
                            if (!e) {
                                window.location.href = WapSiteUrl + "/tmpl/member/login.html"
                            } else {
                                var t = parseInt($(".buy-num").val()) || 0;
                                if (t < 1) {
                                    $.sDialog({
                                        skin: "red",
                                        content: "参数错误！",
                                        okBtn: false,
                                        cancelBtn: false
                                    });
                                    return
                                }
                                if (t > l.goods_info.goods_storage) {
                                    $.sDialog({
                                        skin: "red",
                                        content: "库存不足！",
                                        okBtn: false,
                                        cancelBtn: false
                                    });
                                    return
                                }
                                var o = {};
                                o.key = e;
                                o.cart_id = r + "|" + t;
                                $.ajax({
                                    type: "post",
                                    url: ApiUrl + "/index.php?act=member_buy&op=buy_step1",
                                    data: o,
                                    dataType: "json",
                                    success: function(e) {
                                        if (e.error) {
                                            $.sDialog({
                                                skin: "red",
                                                content: e.error,
                                                okBtn: false,
                                                cancelBtn: false
                                            })
                                        } else {
                                            location.href = WapSiteUrl + "/tmpl/order/buy_step1.html?goods_id=" + r + "&buynum=" + t
                                        }
                                    }
                                })
                            }
                        })
                    }
                } else {
                    $.sDialog({
                        content: e.error + "！<br>请返回上一页继续操作…",
                        okBtn: false,
                        cancelBtnText: "返回",
                        cancelFn: function() {
                            history.back()
                        }
                    })
                }
                $("#buynum").blur(n);
                $.animationUp({
                    valve: ".animation-up,#goods_spec_selected",
                    wrapper: "#product_detail_spec_html",
                    scroll: "#product_roll",
                    start: function() {
                        $(".goods-detail-foot").addClass("hide").removeClass("block")
                    },
                    close: function() {
                        $(".goods-detail-foot").removeClass("hide").addClass("block")
                    }
                });
                $.animationUp({
                    valve: "#getVoucher",
                    wrapper: "#voucher_html",
                    scroll: "#voucher_roll"
                });
                $("#voucher_html").on("click", ".btn", function() {
                    getFreeVoucher($(this).attr("data-tid"))
                });
                $(".kefu").click(function() {
                    window.location.href = WapSiteUrl + "/tmpl/member/chat_info.html?goods_id=" + r + "&t_id=" + e.datas.store_info.member_id
                })
            }
        })
    }
    $.scrollTransparent();
    $("#product_detail_html").on("click", "#get_area_selected", function() {
        $.areaSelected({
            success: function(e) {
                $("#get_area_selected_name").html(e.area_info);
                var t = e.area_id_2 == 0 ? e.area_id_1: e.area_id_2;
                $.getJSON(ApiUrl + "/index.php?act=goods&op=calc", {
                    goods_id: goods_id,
                    area_id: t
                },
                function(e) {
                    $("#get_area_selected_whether").html(e.datas.if_store_cn);
                    $("#get_area_selected_content").html(e.datas.content);
                    if (!e.datas.if_store) {
                        $(".buy-handle").addClass("no-buy")
                    } else {
                        $(".buy-handle").removeClass("no-buy")
                    }
                })
            }
        })
    });
    //绑定店铺 zhangchao
    
    $.ajax({
        url: ApiUrl + "/index.php?act=goods&op=goods_info",
        data: {
            goods_id: goods_id
        },
        type: "get",
        success: function(s) {
            if(s){
            	//修改进入会员中心
				$("#backto_member").attr('href','member/member.html?store_id='+s);
				$("#store_id").val(s);
            }
        }
    });
    
    $("body").on("click", "#goodsBody,#goodsBody1", function() {
    	var store_id = $("#store_id").val();
    	if(store_id){
    		window.location.href = WapSiteUrl + "/tmpl/product_info.html?goods_id=" + goods_id+"&store_id="+store_id+iMall_extension;
    	}else{
    		window.location.href = WapSiteUrl + "/tmpl/product_info.html?goods_id=" + goods_id+iMall_extension;
    	}
    });
    $("body").on("click", "#goodsEvaluation,#goodsEvaluation1", function() {
    	var store_id = $("#store_id").val();
    	if(store_id){
    		window.location.href = WapSiteUrl + "/tmpl/product_eval_list.html?goods_id=" + goods_id+"&store_id="+store_id+iMall_extension;
    	}else{
    		window.location.href = WapSiteUrl + "/tmpl/product_eval_list.html?goods_id=" + goods_id+iMall_extension;
    	}
    });
    
	$(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
        	var store_id = $("#store_id").val();
        	if(store_id){
        		window.location.href = WapSiteUrl + "/tmpl/product_info.html?goods_id=" + goods_id+"&store_id="+store_id+iMall_extension;
        	}else{
        		window.location.href = WapSiteUrl + "/tmpl/product_info.html?goods_id=" + goods_id+iMall_extension;
        	}
        }
    });
   /*
    $(window).scroll(function() {
   		var hT = $('#scroll-to').offset().top,
        hH = $('#scroll-to').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
    	console.log((hT-wH) , wS);
   		if (wS > (hT+hH-wH)){
     		alert('you have scrolled to the h1!');
   		}
	});
    */
    $("#list-address-scroll").on("click", "dl > a", map);
    $("#map_all").on("click", map)
});
function show_tip() {
    var e = $(".goods-pic > img").clone().css({
        "z-index": "999",
        height: "3rem",
        width: "3rem"
    });
    e.fly({
        start: {
            left: $(".goods-pic > img").offset().left,
            top: $(".goods-pic > img").offset().top - $(window).scrollTop()
        },
        end: {
            left: $("#cart_count1").offset().left + 40,
            top: $("#cart_count1").offset().top - $(window).scrollTop(),
            width: 0,
            height: 0
        },
        onEnd: function() {
            e.remove()
        }
    })
}
function virtual() {
    $("#get_area_selected").parents(".goods-detail-item").remove();
    $.getJSON(ApiUrl + "/index.php?act=goods&op=store_o2o_addr", {
        store_id: store_id
    },
    function(e) {
        if (!e.error) {
            if (e.datas.addr_list.length > 0) {
                $("#list-address-ul").html(template.render("list-address-script", e.datas));
                map_list = e.datas.addr_list;
                var t = "";
                t += '<dl index_id="0">';
                t += "<dt>" + map_list[0].name_info + "</dt>";
                t += "<dd>" + map_list[0].address_info + "</dd>";
                t += "</dl>";
                t += '<p><a href="tel:' + map_list[0].phone_info + '"></a></p>';
                $("#goods-detail-o2o").html(t);
                $("#goods-detail-o2o").on("click", "dl", map);
                if (map_list.length > 1) {
                    $("#store_addr_list").html("查看全部" + map_list.length + "家分店地址")
                } else {
                    $("#store_addr_list").html("查看商家地址")
                }
                $("#map_all > em").html(map_list.length)
            } else {
                $(".goods-detail-o2o").hide()
            }
        }
    });
    $.animationLeft({
        valve: "#store_addr_list",
        wrapper: "#list-address-wrapper",
        scroll: "#list-address-scroll"
    })
}
function map() {
    $("#map-wrappers").removeClass("hide").removeClass("right").addClass("left");
    $("#map-wrappers").on("click", ".header-l > a", 
    function() {
        $("#map-wrappers").addClass("right").removeClass("left")
    });
    $("#baidu_map").css("width", document.body.clientWidth);
    $("#baidu_map").css("height", document.body.clientHeight);
    map_index_id = $(this).attr("index_id");
    if (typeof map_index_id != "string") {
        map_index_id = ""
    }
    if (typeof map_js_flag == "undefined") {
        $.ajax({
            url: WapSiteUrl + "/js/map.js",
            dataType: "script",
            async: false
        })
    }
    if (typeof BMap == "object") {
        baidu_init()
    } else {
        load_script()
    }
}
function WeiXinShareBtn() { 
	 if (typeof WeixinJSBridge == "undefined") { 
		 alert("请先通过微信搜索 领沃 添加领沃为好友，通过微信分享文章 "); 
	 } else { 
		 WeixinJSBridge.invoke('shareTimeline', { 
		 "title": "领沃", 
		 "link": "http://www.hzlwo.com", 
		 "desc": "领沃是工具是平台", 
		 "img_url": "http://www.hzlwo.com/data/upload/mobile/special/s0/s0_05119596167911463.jpg" 
		 }); 
	 } 
}