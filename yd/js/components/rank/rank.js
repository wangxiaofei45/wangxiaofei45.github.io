// 自定义指令，
// restrict 以什么形式返回  E 元素   C 类名 M 注释的形式 A 属性的形式
// template 指令的模板
// replace 替换父亲节点

// link函数负责在模型和视图之间进行动态关联，对于每个指令的每个实例，link函数都会执行一次 link compile 区别
// 一般只用 link
//link 模型和视图建立关联，包括在元素上注册事件
//scope 再link链接阶段才会被绑定到元素上

//scope :对象/true/false
//		true 独立的作用域名
//      false 继承父亲作用域
//      对象个别属性父亲做关联
//		{"rank":"="} rank值和父亲双向绑定
//		{"rank":"&"} 代表调用父亲的方法
//		{"rank":"@"} 单项绑定 只能获取父亲的属性指 父亲在绑定时候 <yd-rank rank="{{rank}}">

app.directive("ydRank",function(){
	return {
		restrict:"ECMA",
		template:
		'<i class="glyphicon"'
		+' ng-class="{\'glyphicon-star\':item.rank,\'glyphicon-star-empty\':!item.rank}"'
		+' ng-mouseover="setCurRank($index)"'	
		+' ng-mouseout="resetRank()"'
		+' ng-click="setRank($index)"'
		+' ng-repeat="item in rankData"></i>',
//		replace:true,
		scope:{"rank":"="},
		// 从父亲获取rank的值(从指令的属性[rank属性]里面获取rank指)
		link:function(scope,elem,attrs){
			scope.rankData=[];
			// 设置一个打分的数组
			if(!scope.rank){scope.rank=0;}
			// 从父亲获取rank的值 如果是null 就是0分
			// 默认有5颗星星 需要rank 数组里面要有5个对象
			/*初始化星星*/
			for(var i=0;i<5;i++){
				var obj={}; //动态的声明一个对象
				if(i<scope.rank){ // 如果i小于 rank的值 对象里面的rank为true（可以拥有一个星）
					obj.rank=true;	
				}else{
					obj.rank=false;	// 如果是大于 没有星对应的 对象里面rank为false；
				}
				
				scope.rankData.push(obj);// 把每个对象推送到 rankData里面
			}
			scope.oldRank=scope.rank;
			scope.setCurRank=function(index){// 当鼠标放在星星上面时候 鼠标 和鼠标前面的星星为实星 后面的为空星
				scope.rank=index+1;
			}
			scope.resetRank=function(){// 鼠标离开 星星有rank 判断
				scope.rank=scope.oldRank;
			}
			
			scope.setRank=function(index){//鼠标单击 重新设置rank 值 
				scope.rank=index+1;
				scope.oldRank=scope.rank;
			}
			scope.$watch("rank",function(){
				for(var i=0;i<5;i++){
					if(i<scope.rank){
						scope.rankData[i].rank=true;
					}else{
						scope.rankData[i].rank=false;
					}
				}
			})
		}
	}
})
