<template>
	<view class="body">
		<Yotai-logo></Yotai-logo>
		<view class="selectMeasurementType">
			<button class="energyStorage" @click="changeMeasurementType('储能容量')"
				:class="measurementType === '储能容量'? 'buttonActive' : ''">储能系统容量</button>
			<button class="powerGeneration" @click="changeMeasurementType('发电量')"
				:class="measurementType === '发电量'? 'buttonActive' : ''">发电量测算</button>
		</view>
		<view class="dataInput">
			<Yotai-energyStorInputOfEasyVer v-if="measurementType === '储能容量'"></Yotai-energyStorInputOfEasyVer>
			<Yotai-generationInputOfEasyVer v-else></Yotai-generationInputOfEasyVer>
		</view>
		<view class="depthMeasurement" @click="depthMeasurement">
			<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
				<text>深度测算>></text>
			</navigator>
		</view>
		<Yotai-footer></Yotai-footer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 测算类型
				measurementType: '储能容量'
			};
		},
		methods: {
			// 测算类型转换
			changeMeasurementType(type) {
				this.measurementType = type
			},
			// 深度测算
			depthMeasurement() {
				uni.showToast({
					title: '此功能暂未开放，敬请期待！',
					icon:'none',
					duration: 1500
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.body {
		
		/deep/ .uni-navbar__header .uni-navbar__header-container text {
			margin-top: 40rpx;
		}

		.selectMeasurementType {
			display: flex;
			justify-content: space-between;
			margin: 40rpx;

			button {
				width: 320rpx;
				height: 80rpx;
				margin: 0;
				border-radius: 40rpx;
				background-color: #fff;
				font-size: 28rpx;
				line-height: 80rpx;

				&::after {
					border: none;
				}
			}

			.buttonActive {
				color: #fff;
				background-color: #28DDA7;
				box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(40, 221, 167, 0.5);
			}
		}

		.depthMeasurement {
			width: 160rpx;
			margin: 40rpx 0rpx 40rpx 546rpx;
			color: #C3C3C3;
		}
	}
</style>
