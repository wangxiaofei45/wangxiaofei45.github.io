app.controller("pub_stadiumCtrl",["$scope","$http",function($scope,$http){
	$scope.navData.num=3;
	$scope.showModal=false;
	//需要两个最大的变量  场馆搜索条件 需要公共场馆列表
	$scope.search={
		city_id:"",
		district_id:"",
		gov_activity_id:"",
		keyword:"",
		page:0
		
	};// 搜索条件
	$scope.pubStadiumLists=[];//场馆列表
	$scope.total_elements=0;
	
	//[01]通过Http 获取场馆的真实内容 loadStadium
	// 需要一个http（通过在控制器注入一个http）
	$scope.loadStadium=function(){
		$scope.showModal=true;
	// 1.2 http的一个url 的地址	
	var url="http://tenant-api.1yd.me/api/open/gov_gymnasium?"
		url+="city_id="+$scope.search.city_id;
		url+="&district_id="+$scope.search.district_id;
		url+="&gov_activity_id="+$scope.search.gov_activity_id;
		url+="&keyword="+$scope.search.keyword;
		url+="&page="+$scope.search.page;
    // 1.3 发送一个ajax请求获取 公共场馆的列表
    $http.get(url)
    .success(function(res){
//  	console.log(res);
    	$scope.pubStadiumLists=res.content;
    	$scope.total_elements=res.total_elements;
    	$scope.showModal=false;
    })
		
	}
	// 把区写活  动态的给search district_id动态
	$scope.setSearchDistrict=function(item){
		// 重新设置区域id
		$scope.search.district_id=item.district_id;
		// 重新的加载
		$scope.loadStadium();
	}
	$scope.loadStadium();//调用加载
	// 1.4 把关键字写活  动态的给search keyword
	
	// 1.5把所有类型动态化
	// 把类型加载过来  查看api稳定
	$http.get("http://tenant-api.1yd.me/api/open/gov_activity")
	.success(function(res){
		$scope.gov_activity_lists=res.content;
	})
	//把拿到的数据绑定到html 
	//1.6 当下拉列表改变是 要重新 加载场馆
	
	//1.7 当切换城市的时候要重新加载 公共场馆
	// 在最外层 ydCtrl 切换的   现在要在 pub_stadiumCtrl 加载
	// 子控制器如何才能知道 父亲已经切换了
	//  父亲广播一下  儿子 监听一下
	$scope.$on("citySwitch",function(event,data){
		// 拿到事件传递过来的数据
		$scope.search.city_id=data.city_id;		
		$scope.loadStadium();//调用加载
	})
}])
