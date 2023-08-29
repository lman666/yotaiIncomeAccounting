<template>
	<view class="body">
		<image class="QRCode" src="../../../../static/QRCode/QRCode02.png" :show-menu-by-longpress="true"></image>
		<text>聚焦新能源，构建零碳电力系统</text>
	</view>
</template>
<script>
</script>
<style lang="less" scoped>
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 40rpx;
		
		.QRCode {
			width: 240rpx;
			height: 240rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
