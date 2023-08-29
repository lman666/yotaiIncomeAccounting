<template>
	<view class="blockCellBody">
		<view class="num">
			{{num}}
		</view>
		<view class="topic">
			{{label}}
		</view>
	</view>
</template>
<script>
	export default {
		name: "Yotai-blockCell",
		props: {
			label: {
				type: String,
				default: ''
			},
			num: {
				type: String,
				default: ''
			}
		},
		options: {
			styleIsolation: 'isolated' //表示样式隔离，默认隔离
		}
	}
</script>
<style lang="less">
	.blockCellBody {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 236rpx;
		
		.num {
			font-weight: bold;
		}
		
		.topic {
			color: #C3C3C3;
		}
	}
</style>
