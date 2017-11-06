// 建立一个工厂服务 ，服务名称为 $search $search 返回一个对象 可以实现多个控制器 传递参数，需要数据 只需要注入服务
app.factory("$search",[function(){
	
	return {
		"name":"mumu",
	}
}])
