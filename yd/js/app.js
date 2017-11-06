var app=angular.module("ydApp",["ngRoute"])
.controller("ydCtrl",["$scope","$http",function($scope,$http){
	$scope.navData={};
	$scope.navData.num=1;
	$scope.cities=[];
	$scope.categories={};
	$scope.today=new Date();
	$scope.maxDay=new Date($scope.today.getFullYear(),$scope.today.getMonth(),$scope.today.getDate()+7);
	$scope.time=[];
	for(var i=6;i<24;i++){
		var obj={};
		if(i<10){
			obj.name="0"+i+":00";
			obj.value="0"+i+":00";
		}else{
			obj.name=i+":00";
			obj.value=i+":00";
		}		
		$scope.time.push(obj);
		
	}
	$scope.time.unshift({name:'全部',value:''});
	$http.get("http://platform-api.1yd.me/api/meta-data/cities")
	.success(function(res){		
		for(var i=0;i<res.provinces.length;i++){
			$scope.cities=$scope.cities.concat(res.provinces[i].citys);
			
		}
		$scope.currentCity=$scope.cities[0]
		$scope.getAddress();
	})
	$scope.getAddress=function(){
		$http.get("http://platform-api.1yd.me/api/meta-data/"+$scope.currentCity.city_id)
		.success(function(res){	
			console.log(res);
			$scope.districts=res.city_districts[0].districts;
			$scope.city_cbds=res.city_cbds[0].cbds;
			$scope.facilitys=res.facilitys;
			$scope.categories=res.categories;
//			$scope.$apply=function(){
//				$scope.categories=res.categories;
//			}
			console.log($scope.categories);
//			console.log($scope.districts,$scope.city_cbds,$scope.facility);
		})
	}
	
	$scope.setCurCity=function(item){
		$scope.currentCity=item;
		$scope.getAddress();
		// 广播一下已经切换了
		$scope.$broadcast("citySwitch",{city_id:item.city_id});
	}
}])

//注入服务
.config(function($routeProvider){
	$routeProvider
	.when("/home",{templateUrl:"templates/pages/home.html"})
	.when("/search",{templateUrl:"templates/pages/search.html"})
	.when("/pub_stadium",{templateUrl:"templates/pages/pub_stadium.html"})
	.when("/swim_stadium",{templateUrl:"templates/pages/swim_stadium.html"})
	.when("/production",{templateUrl:"templates/pages/production.html"})
	.when("/help",{templateUrl:"templates/pages/help.html"})
	.when("/stadium/:id",{templateUrl:"templates/pages/stadium.html"})
	.otherwise({redirectTo:"/home"})
})


.controller("homeCtrl",["$scope","$http","$search",function($scope,$http,$search){
	$scope.search=$search;
	// 把服务$search里面的数据传递给 homeCtrl 里面的 scope 上面
	$scope.navData.num=1;
	$http.get("js/category.json")
	.success(function(res){
		
		$scope.category=res;
	})
	$http.get("http://platform-api.1yd.me/api/stadium_resources?size=9")
	.success(function(res){
		console.log(res);
		$scope.stadiums=res;
	})
}])

/*.controller("pub_stadiumCtrl",["$scope",function($scope){
	$scope.navData.num=3;
}])
*/
.controller("swim_stadiumCtrl",["$scope",function($scope){
	$scope.navData.num=4;
}])
.controller("productionCtrl",["$scope",function($scope){
	$scope.navData.num=5;
}])
.controller("helpCtrl",["$scope",function($scope){
	$scope.navData.num=6;
}])