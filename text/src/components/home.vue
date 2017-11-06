<template>
	<div class="home">
		<div>
			<el-button round>圆形按钮</el-button>
			<el-button type="primary" round>主要按钮</el-button>
			<el-button type="success" round>成功按钮</el-button>
			<el-button type="info" round>信息按钮</el-button>
			<el-button type="warning" round>警告按钮</el-button>
			<el-button type="danger" round>危险按钮</el-button>
		</div>
		<el-time-select v-model="value1" :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '22:30'
  }" placeholder="选择时间">
		</el-time-select>
	
	</div>
</template>
<script>
	export default {
		name: 'home',
		data() {
			return {
				msg: '',
				value1: ''
			}
		}
	}
</script>

<style>

</style>