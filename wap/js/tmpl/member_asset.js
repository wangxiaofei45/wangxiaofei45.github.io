$(function() {
    var e = getCookie("key");
    if (!e) {
        window.location.href = WapSiteUrl + "/tmpl/member/login.html";
        return
    }
    $.getJSON(ApiUrl + "/index.php?act=member_index&op=my_asset", {
        key: e
    },
    function(e) {
        checkLogin(e.login);
        $("#predepoit").html(e.datas.predepoit + " 元");
        $("#rcb").html(e.datas.available_rc_balance + " 元");
        $("#voucher").html(e.datas.voucher + " 张");
        $("#redpacket").html(e.datas.redpacket + " 个");
        $("#point").html(e.datas.point + " 分")
    })
});