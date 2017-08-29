var key = getCookie("key");
var ifcart = getQueryString("ifcart");
if (ifcart == 1) {
    var cart_id = getQueryString("cart_id")
} else {
    var cart_id = getQueryString("goods_id") + "|" + getQueryString("buynum")
}
var pay_name = "online";
var invoice_id = 0;
var address_id, vat_hash, offpay_hash, offpay_hash_batch, voucher, pd_pay, rcb_pay, rpt, qcb_pay, jf_pay, password, fcode = "", payment_code;
var message = {};
var freight_hash, city_id, area_id;
var area_info;
var goods_id;

$(function() {
    $("#list-address-valve").click(function() {
        $.ajax({
            type: "post",
            url: ApiUrl + "/index.php?act=member_address&op=address_list",
            data: {
                key: key
            },
            dataType: "json",
            async: false,
            success: function(e) {
                checkLogin(e.login);
                if (e.datas.address_list == null) {
                    return false
                }
                var a = e.datas;
                a.address_id = address_id;
                var i = template.render("list-address-add-list-script", a);
                $("#list-address-add-list-ul").html(i)
            }
        })
    });
    $.animationLeft({
        valve: "#list-address-valve",
        wrapper: "#list-address-wrapper",
        scroll: "#list-address-scroll"
    });
    $("#list-address-add-list-ul").on("click", "li", function() {
        $(this).addClass("selected").siblings().removeClass("selected");
        eval("address_info = " + $(this).attr("data-param"));
        _init(address_info.address_id);
        $("#list-address-wrapper").find(".header-l > a").click()
    });
    $.animationLeft({
        valve: "#new-address-valve",
        wrapper: "#new-address-wrapper",
        scroll: ""
    });
    $.animationLeft({
        valve: "#select-payment-valve",
        wrapper: "#select-payment-wrapper",
        scroll: ""
    });
    $("#new-address-wrapper").on("click", "#varea_info", function() {
        $.areaSelected({
            success: function(e) {
                city_id = e.area_id_2 == 0 ? e.area_id_1: e.area_id_2;
                area_id = e.area_id;
                area_info = e.area_info;
                $("#varea_info").val(e.area_info)
            }
        })
    });
    $.animationLeft({
        valve: "#invoice-valve",
        wrapper: "#invoice-wrapper",
        scroll: ""
    });
    template.helper("isEmpty", function(e) {
        var a = true;
        $.each(e, function(e, i) {
            a = false;
            return false
        });
        return a
    });
    template.helper("pf", function(e) {
        return parseFloat(e) || 0
    });
    template.helper("p2f", function(e) {
        return (parseFloat(e) || 0).toFixed(2)
    });
    var _init = function(e) {
        var a = 0;
        $.ajax({
            type: "post",
            url: ApiUrl + "/index.php?act=member_buy&op=buy_step1",
            dataType: "json",
            data: {
                key: key,
                cart_id: cart_id,
                ifcart: ifcart,
                address_id: e
            },
            success: function(e) {
                checkLogin(e.login);
                if (e.error) {
                    $.sDialog({
                        skin: "red",
                        content: e.error,
                        okBtn: false,
                        cancelBtn: false
                    });
                    return false
                }
                //是否存在跨境淘的商品
                if(e.datas.is_ikjtao==1){
                	$("#is_ikjtao").removeClass("hide");
                }
                e.datas.WapSiteUrl = WapSiteUrl;
                var i = template.render("goods_list", e.datas);
								
                $("#deposit").html(i);
                if (fcode == "") {
                    for (var t in e.datas.store_cart_list) {
                        if (e.datas.store_cart_list[t].goods_list[0].is_fcode == "1") {
                            $("#container-fcode").removeClass("hide");
                            goods_id = e.datas.store_cart_list[t].goods_list[0].goods_id
                        }
                        break
                    }
                }
                $("#container-fcode").find(".submit").click(function() {
                    fcode = $("#fcode").val();
                    if (fcode == "") {
                        $.sDialog({
                            skin: "red",
                            content: "请填写F码",
                            okBtn: false,
                            cancelBtn: false
                        });
                        return false
                    }
                    $.ajax({
                        type: "post",
                        url: ApiUrl + "/index.php?act=member_buy&op=check_fcode",
                        dataType: "json",
                        data: {
                            key: key,
                            goods_id: goods_id,
                            fcode: fcode
                        },
                        success: function(e) {
                            if (e.error) {
                                $.sDialog({
                                    skin: "red",
                                    content: e.error,
                                    okBtn: false,
                                    cancelBtn: false
                                });
                                return false
                            }
                            $.sDialog({
                                autoTime: "500",
                                skin: "green",
                                content: "验证成功",
                                okBtn: false,
                                cancelBtn: false
                            });
                            $("#container-fcode").addClass("hide")
                        }
                    })
                });
                if ($.isEmptyObject(e.datas.address_info)) {
                    $.sDialog({
                        skin: "block",
                        content: "请添加地址",
                        okFn: function() {
                        	$("#vmob_phone").val(e.datas.member_mobile);
                        	$("#true_name").val(e.datas.member_truename);
                        	//是否存在跨境淘的商品
                            if(e.datas.is_ikjtao==1){
                            	$("#is_ikjtao").removeClass("hide");
                            	$("#member_idcard").removeClass("hide");
                            	$("#member_idcard").val(e.datas.member_idcard);
                            }
                            $("#new-address-valve").click();
                        },
                        cancelFn: function() {
                            history.go(- 1);
                        }
                    });
                    return false
                }else{
                    //身份证不存在，并且有跨境淘的商品
                    if(e.datas.is_idcard==0){
                    	$("#idcard-div").removeClass("hide");
                    }
                }
				//发票
                if (typeof e.datas.inv_info.inv_id != "undefined") {
                    invoice_id = e.datas.inv_info.inv_id
                }
                $("#invContent").html(e.datas.inv_info.content);
				//计算店铺运费
                vat_hash = e.datas.vat_hash;
                freight_hash = e.datas.freight_hash;
                insertHtmlAddress(e.datas.address_info, e.datas.address_api);
				//代金券列表
                voucher = "";
                voucher_temp = [];
                for (var t in e.datas.store_cart_list) {
                    voucher_temp.push([e.datas.store_cart_list[t].store_voucher_info.voucher_t_id + "|" + t + "|" + e.datas.store_cart_list[t].store_voucher_info.voucher_price])
                }
                voucher = voucher_temp.join(",");
				//$(".storeVoucher").click(function() {
                //    $.animationUp({
				//		valve: "",
				//		wrapper: "#list-voucher-wrapper",
                //        scroll: ""
                //    });
                //});			
				
				//计算店铺小计
                for (var t in e.datas.store_final_total_list) {	
				    //加上运费				
					var storetotal = parseFloat(e.datas.store_final_total_list[t]) + parseFloat($('#storeFreight'+t).html());
					//减去满就送
					if (e.datas.store_cart_list[t].store_mansong_rule_list && e.datas.store_cart_list[t].store_mansong_rule_list.discount>0){
						storetotal -= e.datas.store_cart_list[t].store_mansong_rule_list.discount;
					}
					//减去代金券
					if (e.datas.store_cart_list[t].store_voucher_info && e.datas.store_cart_list[t].store_voucher_info.voucher_price>0){
						storetotal -= e.datas.store_cart_list[t].store_voucher_info.voucher_price;
					}
					
                    $("#storeTotal" + t).html(storetotal.toFixed(2));
                    var storePointsTotal = parseFloat(e.datas.store_cart_list[t].store_vip_points_total);
                    a += storetotal;
                    p = 0;
                    if(e.datas.store_cart_list[t].points_way != 2){
                    	p += storePointsTotal;
                    }else{
                    	p += 0;
                    }
                    message[t] = "";
                    $("#storeMessage" + t).on("change", function() {
                        message[t] = $(this).val()
                    })
                }				
							
                rcb_pay = 0;
                rpt = "";
                var s = 0;
                if (!$.isEmptyObject(e.datas.rpt_info)) {
                    $("#rptVessel").show();
                    var n = (parseFloat(e.datas.rpt_info.rpacket_limit) > 0 ? "满" + parseFloat(e.datas.rpt_info.rpacket_limit).toFixed(2) + "元，": "") + "优惠" + parseFloat(e.datas.rpt_info.rpacket_price).toFixed(2) + "元";
                    $("#rptInfo").html(n);
                    rcb_pay = 1;
                    s = parseFloat(e.datas.rpt_info.rpacket_price)
                } else {
                    $("#rptVessel").hide()
                }
                password = "";
                $("#useRPT").click(function() {
                    if ($(this).prop("checked")) {
                        rpt = e.datas.rpt_info.rpacket_t_id + "|" + parseFloat(e.datas.rpt_info.rpacket_price);
                        var i = a - s
                    } else {
                        rpt = "";
                        var i = a
                    }
                    if (i <= 0) {
                        i = 0
                    }
                    $("#totalPrice,#onlineTotal").html(i.toFixed(2))
                });
                var r = a - s;
                if (r <= 0) {
                    r = 0
                }
                if(p>0){
                	$("#totalPrice").html(
                			r.toFixed(2) + '</em></dd> + <dd><em id="totalPoints">'+p+'</em>云币</dd>'
                	);
                	$("#onlineTotal").html(r.toFixed(2));
                }else{
                	$("#totalPrice,#onlineTotal").html(r.toFixed(2));
                }
            }
        })
    };
    rcb_pay = 0;
    pd_pay = 0;
	qcb_pay = 0;
	jf_pay = 0;
	var lock = true; //防止重复提交
    _init();
    var insertHtmlAddress = function(e, a) {
        address_id = e.address_id;
        $("#true_name").html(e.true_name);
        $("#mob_phone").html(e.mob_phone);
        $("#mob_idcard").hide();
        if(e.member_idcard&&e.member_idcard!='0'){
        	$("#mob_idcard").html(e.member_idcard);
        	$("#mob_idcard").show();
        }
        $("#address").html(e.area_info + e.address);
        area_id = e.area_id;
        city_id = e.city_id;
        if (a.content) {
            for (var i in a.content) {
                $("#storeFreight" + i).html(parseFloat(a.content[i]).toFixed(2))
            }
        }
        offpay_hash = a.offpay_hash;
        offpay_hash_batch = a.offpay_hash_batch;
        if (a.allow_offpay == 1) {
            $("#payment-offline").show()
        }
        if (!$.isEmptyObject(a.no_send_tpl_ids)) {
            $("#ToBuyStep2").parent().removeClass("ok");
            for (var t = 0; t < a.no_send_tpl_ids.length; t++) {
                $(".transportId" + a.no_send_tpl_ids[t]).show()
            }
        } else {
            $("#ToBuyStep2").parent().addClass("ok")
        }
    };
    $("#payment-online").click(function() {
        pay_name = "online";
        $("#select-payment-wrapper").find(".header-l > a").click();
        $("#select-payment-valve").find(".current-con").html("在线支付");
        $(this).addClass("sel").siblings().removeClass("sel")
    });
    $("#payment-offline").click(function() {
        pay_name = "offline";
        $("#select-payment-wrapper").find(".header-l > a").click();
        $("#select-payment-valve").find(".current-con").html("货到付款");
        $(this).addClass("sel").siblings().removeClass("sel")
    });
    $.sValid.init({
        rules: {
            vtrue_name: "required",
            vmob_phone: "required",
            varea_info: "required",
            vaddress: "required"
        },
        messages: {
            vtrue_name: "姓名必填！",
            vmob_phone: "手机号必填！",
            varea_info: "地区必填！",
            vaddress: "街道必填！"
        },
        callback: function(e, a, i) {
            if (e.length > 0) {
                var t = "";
                $.map(a,
                function(e, a) {
                    t += "<p>" + e + "</p>"
                });
                errorTipsShow(t)
            } else {
                errorTipsHide()
            }
        }
    });
    $("#add_address_form").find(".btn").click(function() {
        if ($.sValid()) {
            var e = {};
            e.key = key;
            e.true_name = $("#vtrue_name").val();
            e.mob_phone = $("#vmob_phone").val();
            e.address = $("#vaddress").val();
            e.city_id = city_id;
            e.area_id = area_id;
            e.area_info = $("#varea_info").val();
            e.member_idcard = $("#member_idcard").val();
            e.is_default = 0;
            if(e.member_idcard){
            	if (!isCardNo(e.user_idcard)) {
            		return false;
            	}
            }
            $.ajax({
                type: "post",
                url: ApiUrl + "/index.php?act=member_address&op=address_add",
                data: e,
                dataType: "json",
                success: function(a) {
                    if (!a.error) {
                        e.address_id = a.datas.address_id;
                        _init(e.address_id);
                        $("#new-address-wrapper,#list-address-wrapper").find(".header-l > a").click()
                    }
                }
            })
        }
    });
    $("#idcard-div").find(".btn-l").click(function() {
        var e = {};
        e.key = key;
        e.user_idcard = $("input[name=user_idcard]").val();
        if (isCardNo(e.user_idcard)) {
	        $.ajax({
	            type: "post",
	            url: ApiUrl + "/index.php?act=member_address&op=idcard_edit",
	            data: e,
	            dataType: "json",
	            success: function(e) {
	            	//console.log(e);
	                if (e.datas.member_idcard&&e.datas.member_idcard!='0') {
	                	$("#mob_idcard").html(e.datas.member_idcard);
	                    $("#idcard-div").hide();
	                    $("#mob_idcard").show();
	                }else{
	                	$("#mob_idcard").hide();
	                }
	            }
	        });
        }
    });
    $("#invoice-noneed").click(function() {
        $(this).addClass("sel").siblings().removeClass("sel");
        $("#invoice_add,#invoice-list").hide();
        invoice_id = 0
    });
    $("#invoice-need").click(function() {
        $(this).addClass("sel").siblings().removeClass("sel");
        $("#invoice-list").show();
        $.ajax({
            type: "post",
            url: ApiUrl + "/index.php?act=member_invoice&op=invoice_content_list",
            data: {
                key: key
            },
            dataType: "json",
            success: function(e) {
                checkLogin(e.login);
                var a = e.datas;
                var i = "";
                $.each(a.invoice_content_list,
                function(e, a) {
                    i += '<option value="' + a + '">' + a + "</option>"
                });
                $("#inc_content").append(i)
            }
        });
        $.ajax({
            type: "post",
            url: ApiUrl + "/index.php?act=member_invoice&op=invoice_list",
            data: {
                key: key
            },
            dataType: "json",
            success: function(e) {
                checkLogin(e.login);
                var a = template.render("invoice-list-script", e.datas);
                $("#invoice-list").html(a);
                if (e.datas.invoice_list.length > 0) {
                    invoice_id = e.datas.invoice_list[0].inv_id
                }
                $(".del-invoice").click(function() {
                    var e = $(this);
                    var a = $(this).attr("inv_id");
                    $.ajax({
                        type: "post",
                        url: ApiUrl + "/index.php?act=member_invoice&op=invoice_del",
                        data: {
                            key: key,
                            inv_id: a
                        },
                        success: function(a) {
                            if (a) {
                                e.parents("label").remove()
                            }
                            return false
                        }
                    })
                })
            }
        })
    });
    $('input[name="inv_title_select"]').click(function() {
        if ($(this).val() == "person") {
            $("#inv-title-li").hide()
        } else {
            $("#inv-title-li").show()
        }
    });
    $("#invoice-div").on("click", "#invoiceNew", function() {
        invoice_id = 0;
        $("#invoice_add,#invoice-list").show()
    });
    $("#invoice-list").on("click", "label", function() {
        invoice_id = $(this).find("input").val()
    });
    $("#invoice-div").find(".btn-l").click(function() {
        if ($("#invoice-need").hasClass("sel")) {
            if (invoice_id == 0) {
                var e = {};
                e.key = key;
                e.inv_title_select = $('input[name="inv_title_select"]:checked').val();
                e.inv_title = $("input[name=inv_title]").val();
                e.inv_content = $("select[name=inv_content]").val();
                $.ajax({
                    type: "post",
                    url: ApiUrl + "/index.php?act=member_invoice&op=invoice_add",
                    data: e,
                    dataType: "json",
                    success: function(e) {
                        if (e.datas.inv_id > 0) {
                            invoice_id = e.datas.inv_id
                        }
                    }
                });
                $("#invContent").html(e.inv_title + " " + e.inv_content)
            } else {
                $("#invContent").html($("#inv_" + invoice_id).html())
            }
        } else {
            $("#invContent").html("不需要发票")
        }
        $("#invoice-wrapper").find(".header-l > a").click()
    });	
	
    $("#ToBuyStep2").click(function() {
    	
        if(!lock){
        	alert("您已经提交订单，请直接去支付！");
        	window.location.href = WapSiteUrl + "/tmpl/member/order_list.html"
        	return false;
        }
        lock = false;
        var pay_message = "";
        for (var a in message) {
            pay_message += a + "|" + message[a] + ","
        }
        $.ajax({
            type: "post",
            url: ApiUrl + "/index.php?act=member_buy&op=buy_step2",
            data: {
                key: key,
                ifcart: ifcart,
                cart_id: cart_id,
                address_id: address_id,
                vat_hash: vat_hash,
                offpay_hash: offpay_hash,
                offpay_hash_batch: offpay_hash_batch,
                pay_name: pay_name,
                invoice_id: invoice_id,
                voucher: voucher,
                pd_pay: pd_pay,
				rcb_pay: rcb_pay,
                rpt: rpt,
				qcb_pay: qcb_pay, 
				jf_pay: jf_pay,
                password: password,
                fcode: fcode,                
                pay_message: pay_message
            },
            dataType: "json",
            success: function(result) {				
                checkLogin(result.login);
                if (result.error) {
                    $.sDialog({
                        skin: "red",
                        content: result.error,
                        okBtn: false,
                        cancelBtn: false
                    });
                    return false
                }
                if (result.datas.payment_code == "offline") {
                    window.location.href = WapSiteUrl + "/tmpl/member/order_list.html"
                } else {
                    delCookie("cart_count");
                    toPay(result.datas.pay_sn, "member_buy", "pay")
                }
            }
        })
    })
});