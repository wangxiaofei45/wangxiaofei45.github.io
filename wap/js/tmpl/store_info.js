$(function() {
    var e = getQueryString("store_id");
    var o = getCookie("key");
    $.ajax({
        type: "post",
        url: ApiUrl + "/index.php?act=store&op=store_info",
        data: {
            key: o,
            store_id: e
        },
        dataType: "json",
        success: function(e) {
        	checkLogin(e.login);
            var o = e.datas;
            var t = template.render("store_info_tpl", o);
            $("#store_info").html(t);
            $("#store_servicecredit_text").html(o.store_info.store_servicecredit_text);
            
			//修改返回首页地址
			$("#backto_home").attr('href','store_info.html?store_id='+o.store_info.store_id);
        }
    });
    $("#store_notcollect").live("click", function() {
        var o = favoriteStore(e);
        if (o) {
            $("#store_notcollect").hide();
            $("#store_collected").show();
            var t;
            var r = (t = parseInt($("#store_favornum_hide").val())) > 0 ? t + 1: 1;
            $("#store_favornum").html(r);
            $("#store_favornum_hide").val(r)
        }
    });
    $("#store_collected").live("click", function() {
        var o = dropFavoriteStore(e);
        if (o) {
            $("#store_collected").hide();
            $("#store_notcollect").show();
            var t;
            var r = (t = parseInt($("#store_favornum_hide").val())) > 1 ? t - 1: 0;
            $("#store_favornum").html(r);
            $("#store_favornum_hide").val(r)
        }
    })
});