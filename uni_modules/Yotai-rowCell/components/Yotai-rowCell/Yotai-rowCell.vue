<template>
	<view :class="['cellBody', isTotalSystemPower ? 'totalSystemPower' : '']">
		<view class="left">
			{{label}}
		</view>
		<view class="right">
			<view class="res">
				{{num}}
			</view>
			<view class="unit">
				{{unit}}
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "Yotai-rowCell",
		props: {
			label: {
				type: String,
				default: ''
			},
			num: {
				type: String,
				default: ''
			},
			unit: {
				type: String,
				default: ''
			},
			isTotalSystemPower: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
<style lang="less" scoped>
	
	.cellBody {
		display: flex;
		justify-content: space-between;
		height: 90rpx;
		border-bottom: 2rpx solid #F3F3F3;
		font-size: 28rpx;
		box-sizing: border-box;
		padding-top: 40rpx;
		
		.left {
			width: 340rpx;
		}
		
		.right{
			flex: 1;
			display: flex;
			justify-content: flex-end;
			
			.res {
				font-weight: bold;
			}
			
			.unit {
				width: 70rpx;
				margin-left: 10rpx;
				color: #C3C3C3;
				text-align: right;
			}
		}
	}
	
	.totalSystemPower {
		height: 130rpx;
		padding-top: 80rpx;
	}
</style>
