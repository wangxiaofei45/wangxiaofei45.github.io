function qmscrollLoad() {
    var page,curpage,hasmore,footer,isloading;

    qmscrollLoad.prototype.loadInit = function(options) {
        var defaults = {
                data:{},
                callback :function(){},
                resulthandle:''
            }
        var options = $.extend({}, defaults, options);
        if (options.iIntervalId) {
            page = options.page>0?options.page : pagesize;
            curpage = 1;
            hasmore = true;
            footer = false;
            isloading = false;
        }
        qmscrollLoad.prototype.getList(options);
        $(window).scroll(function(){
            if (isloading) {//防止scroll重复执行
                return false;
            }
            if(($(window).scrollTop() + $(window).height() > $(document).height()-1)){
                isloading = true;
                options.iIntervalId = false;
                qmscrollLoad.prototype.getList(options);
            }
        });
    }

    qmscrollLoad.prototype.getList = function(options){
        if (!hasmore) {
            $('.loading').remove();
            qmscrollLoad.prototype.getLoadEnding();
            return false;
        }
        param = {};
        //参数
        if(options.getparam){
            param = options.getparam;
        }
        //初始化时延时分页为1
        if(options.iIntervalId){
            param.curpage = 1;
        }
        param.page = page;
        param.curpage = curpage;
        $.getJSON(options.url, param, function(result){
            checkLogin(result.login);
            $('.loading').remove();
            curpage++;
            var data = result.datas;
            //处理返回数据
            if(options.resulthandle){
                eval('data = '+options.resulthandle+'(data);');
            }

            if (!$.isEmptyObject(options.data)) {
                data = $.extend({}, options.data, data);
            }
            var html = template.render(options.tmplid, data);
            if(options.iIntervalId === false){
                $(options.containerobj).append(html);
            }else{
                $(options.containerobj).html(html);
            }
            hasmore = result.hasmore;
            if (!hasmore) {
                $('.loading').remove();
                //加载底部
                if ($('#footer').length > 0) {
                    qmscrollLoad.prototype.getLoadEnding();
                    if (result.page_total == 0) {
                        $('#footer').addClass('posa');
                    }else{
                        $('#footer').removeClass('posa');
                    }
                }
            }
            if (options.callback) {
                options.callback.call('callback');
            }
            isloading = false;
        });
    }

    qmscrollLoad.prototype.getLoadEnding = function() {
        if (!footer) {
            footer = true;
            $.ajax({
                url: WapSiteUrl+'/js/footer.js',
                dataType: "script"
            });
        }
    }
}