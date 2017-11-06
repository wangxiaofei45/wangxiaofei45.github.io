app.controller("stadiumCtrl",["$scope","$http","$routeParams","$filter",function($scope,$http,$routeParams,$filter){
	$scope.navData.num=2;
	$http.get("http://platform-api.1yd.me/api/stadiums/"+$routeParams.id)
	.success(function(res){
		$scope.stadium=res;
		
	})
	// 为场馆导航 星期和时间提供的 数据
	$scope.navData=[];
	// 包括今天总共是7天的数据
	// 应该每一条数据都是一个对象 饱和星期 和 日期
	var weekArr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
	for(var i=0;i<7;i++){
		var obj={};//单个导航的数据
		// 得出 日期 是递增的   
		// $scope.today 在最大的控制器里面 在场馆控制里面可以继承
		// new Date(年，月，日)；
		// obj.d 是获取的日期
		obj.d=new Date($scope.today.getFullYear(),$scope.today.getMonth(),$scope.today.getDate()+i)
		var w=obj.d.getDay()// 或得的0-6 数字
		// obj.w 是获取的星期几
		obj.w=weekArr[w];
		$scope.navData.push(obj);//把数据放在数组里面
	}
	$scope.stadium_curDate=$scope.navData[0].d;
//	console.log($scope.navData);
	$scope.setCurDate=function(d){
		$scope.stadium_curDate=d;
		getField()
	}
	
	getField()
	// 1，拿到该场馆场地信息
	//http://platform-api.1yd.me/api/stadiums/600/field_resources?date=2016-12-31
	//http://platform-api.1yd.me/api/stadiums/"+$routeParams.id+"/field_resources?date=$filter('date')($scope.stadium_curDate,"yyyy-M-d")
	
	// 2. 做一函数去 做加载
	
	function getField(){
		var url="http://platform-api.1yd.me/api/stadiums/"+$routeParams.id+"/field_resources?date="+$filter('date')($scope.stadium_curDate,"yyyy-M-d");
		$http.get(url)
		.success(function(res){
			// 数据挂载到scope
			$scope.fields=res;
			console.log(res);
			// 包裹器的宽度 场馆资源额第0个元素里面的field_resource的长度*一个列宽度+2
			$scope.wrapWidth=$scope.fields[0].field_resource.length*82;
		})
	}
	
	$scope.setSelected=function(col){
		if(col.resource_status=="ordered"){
			return;
		}
		col.selected=!col.selected;
	}
	$scope.customOrder=[];
	
	// 观察 fields 看是否发生改变，如果改变了 push  custom Order
	$scope.$watch("fields",function(){
		$scope.customOrder=[];
		for(var i=0;i<$scope.fields.length;i++){
			
			for(var j=0;j<$scope.fields[i].field_resource.length;j++){
				if($scope.fields[i].field_resource[j].selected){
					// 动态给当前符合条件的场地添加一个.field_name,就是父亲这一行的 field_name;
					$scope.fields[i].field_resource[j].field_name=$scope.fields[i].field_name+"号";
					// 拿到的场地 （对象） push 到customOrder里面
					$scope.customOrder.push($scope.fields[i].field_resource[j]);
				}
			}
		}
		
	},true)
	
	// 那评论数据
	//http://platform-api.1yd.me/api/stadiums/7480/comments?size=10&start=0
	$http.get("http://platform-api.1yd.me/api/stadiums/"+$routeParams.id+"/comments?size=10&start=0")
	.success(function(res){
		$scope.comments=res;
		console.log(res);
	})
}])
