<template>
	<div id="app">
		<!--头部的导航-->
		
			<el-row class="row">
			<el-col :span="24">
				<div class="grid-content"></div>
			</el-col>
		</el-row>
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		/*margin-top: 60px;*/
	}
    .row{
  	height: 50px;
  	line-height: 50px;
  	background-color: red;
  	
  }
</style>