app.controller("searchCtrl",["$scope","$http","$filter","$search",function($scope,$http,$filter,$search){
	console.log($search);
	
	
	$scope.search={
		district_id:"",
		cbd_id:"",
		facility_id:"",
		sort:1,
		category_id:"",
		start:0,
		date:$filter('date')(new Date(),'yyyy-MM-dd'),
		time:"",
		keyword:"",
		category_id:"",
		category:null,
		
	};
	// 默认的search 与  $search 服务合并
	$scope.search=angular.extend($scope.search,$search);
	console.log($scope.search);
	
	$scope.navData.num=2;
	
	$scope.loadMore=function(){
		$scope.search.start++;
		$scope.loadStadium();
	}
	$scope.loadStadium=function(type){
		var url="http://platform-api.1yd.me/api/stadium_resources?start=";
			url+=$scope.search.start*10;
			url+="&district_id="+$scope.search.district_id;
			url+="&cbd_id="+$scope.search.cbd_id;
			url+="&facility_id="+$scope.search.facility_id;
			url+="&sort="+$scope.search.sort;
			if($scope.search&&$scope.search.category){
			url+="&category_id="+$scope.search.category.category_id;	
			}else{
			url+="&category_id=";	
			}
			
			url+="&start_dates="+$filter('date')($scope.search.date,'yyyy-MM-dd');
			url+="&start_time="+$filter('date')($scope.search.date,'yyyy-MM-dd')+"+"+$scope.search.time;
			url+="&keyword="+$scope.search.keyword;
			
		/*$http.get("http://platform-api.1yd.me/api/stadium_resources?start="+$scope.search.start*10+"&district_id="+$scope.search.district_id+"&cbd_id="+$scope.search.cbd_id+"&facility_id="+$scope.search.facility_id+"&sort="+$scope.search.sort+"&category_id="+$scope.search.category_id+"&start_dates="+$filter('date')($scope.search.date,'yyyy-MM-dd'))*/
	$http.get(url)
	.success(function(res){
		console.log(res);
		
			if($scope.stadiums&&type!=1){
				$scope.stadiums=$scope.stadiums.concat(res);	
			}else{
				$scope.stadiums=res;	
			}
		})
	}
	$scope.setSearchDistrict=function(item){
		$scope.search.district_id=item.district_id;
		$scope.loadStadium(1);
	}
	$scope.setSearchCBD=function(item){
		$scope.search.cbd_id=item.cbd_id;
		$scope.loadStadium(1);
	}
	$scope.setSearchFacility=function(item){
		$scope.search.facility_id=item.facility_id;
		$scope.loadStadium(1);
	}
	$scope.setSearchSort=function(sort){
		$scope.search.sort=sort;
		$scope.loadStadium(1);
	}
	$scope.setSearchCategory=function(){
	
//		$scope.search.category_id=item.category_id;
		$scope.loadStadium(1);
	}
	$scope.setSearchDate=function(item){		
		$scope.loadStadium(1);
	}
	$scope.loadStadium();
	
}])