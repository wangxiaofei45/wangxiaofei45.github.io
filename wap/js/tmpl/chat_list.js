$(function() {
    var e = getCookie("key");
    if (!e) {
        location.href = "login.html"
    }
    template.helper("isEmpty", 
    function(e) {
        for (var t in e) {
            return false
        }
        return true
    });
    $.ajax({
        type: "post",
        url: ApiUrl + "/index.php?act=member_chat&op=get_user_list",
        data: {
            key: e,
            recent: 1
        },
        dataType: "json",
        success: function(t) {
            checkLogin(t.login);
            var a = t.datas;
            $("#messageList").html(template.render("messageListScript", a));
            $(".msg-list-del").click(function() {
                var t = $(this).attr("t_id");
                $.ajax({
                    type: "post",
                    url: ApiUrl + "/index.php?act=member_chat&op=del_msg",
                    data: {
                        key: e,
                        t_id: t
                    },
                    dataType: "json",
                    success: function(e) {
                        if (e.code == 200) {
                            location.reload()
                        } else {
                            $.sDialog({
                                skin: "red",
                                content: e.error,
                                okBtn: false,
                                cancelBtn: false
                            });
                            return false
                        }
                    }
                })
            })
        }
    })
});