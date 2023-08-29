<template>
	<view class="body">
		<view class="topic">
			<text>发电量测算报告</text>
		</view>
		<view class="provincialInfo">
			<text class="title">{{calculationResults[0].city}}</text>
			<view class="info">
				<block v-for="(item, i) in calculationResults" :key="i">
					<Yotai-rowCell v-if="i >= 1 && i <= 7 && i !== 5" :label="item.label" :num="item.num"
						:unit="item.unit"></Yotai-rowCell>
					<Yotai-rowCell v-if="i === 5" :label="item.label" :num="item.num" :unit="item.unit"
						:isTotalSystemPower="true"></Yotai-rowCell>
				</block>
			</view>
		</view>
		<view class="chargeAndDischargeCapacity">
			<text class="title">充放电量</text>
			<view class="info">
				<block v-for="(item, i) in calculationResults" :key="i">
					<Yotai-rowCell v-if="i >= 8 && i <= 9" :label="item.label" :num="item.num" :unit="item.unit">
					</Yotai-rowCell>
				</block>
			</view>
		</view>
		<view class="income">
			<text class="title">收益</text>
			<view class="info">
				<block v-for="(item, i) in calculationResults" :key="i">
					<Yotai-rowCell v-if="i >= 10 && i <= 14 && item.num !== undefined" :label="item.label" :num="item.num" :unit="item.unit"></Yotai-rowCell>
				</block>
			</view>
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
	import {
		powerGenerationCalculate
	} from '../../utils/calculate/index.js'
	
	export default {
		data() {
			return {
				calculationResults: [{
					city: ''
				}, {
					label: '尖时电价',
					num: '',
					unit: '元/度'
				}, {
					label: '峰时电价',
					num: '',
					unit: '元/度'
				}, {
					label: '平时电价',
					num: '',
					unit: '元/度'
				}, {
					label: '谷时电价',
					num: '',
					unit: '元/度'
				}, {
					label: '系统总功率',
					num: '',
					unit: '%'
				}, {
					label: '放电深度',
					num: '',
					unit: '%'
				}, {
					label: '储能系统规模',
					num: '',
					unit: '度'
				}, {
					label: '年放电量',
					num: '',
					unit: '度'
				}, {
					label: '年充电量',
					num: '',
					unit: '度'
				}, {
					label: '尖峰电价期间月收益合计',
					num: '',
					unit: '元'
				}, {
					label: '非尖峰电价期间月收益合计',
					num: '',
					unit: '元'
				}, {
					label: '年放电收益',
					num: '',
					unit: '元'
				}, {
					label: '年充电费用',
					num: '',
					unit: '元'
				}, {
					label: '年利润',
					num: '',
					unit: '元'
				}]
			}

		},
		onLoad(options) {
			let formData = JSON.parse(decodeURIComponent(options.formData))
			this.calculate(formData)
		},
		methods: {
			// 计算
			calculate(formData) {
				let resData = powerGenerationCalculate(formData)
				
				this.calculationResults[0].city = formData.city    // 城市
				this.calculationResults[1].num = formData.tipTimeElectricityPrice   // 尖时电价
				this.calculationResults[2].num = formData.peakTimeElectricityPrice   // 峰时电价
				this.calculationResults[3].num = formData.normalTimeElectricityPrice   // 平时电价
				this.calculationResults[4].num = formData.valleyTimeElectricityPrice    // 谷时电价
				this.calculationResults[5].num = formData.totalSystemEfficiency   // 系统总功率
				this.calculationResults[6].num = formData.dischargeDepth    // 放电深度
				this.calculationResults[7].num = formData.scaleOfEnergyStorageSystem    //储能系统规模
				this.calculationResults[8].num = resData.annualDischarge   // 年放电量
				this.calculationResults[9].num = resData.annualCharge    // 年充电量
				this.calculationResults[10].num = resData.totalMonIncDurPeakElePriPeriod   // 尖峰电价期间月收益合计
				this.calculationResults[11].num = resData.totalMonIncDurNonPeakElePriPeriod   // 非尖峰电价期间月收益合计
				this.calculationResults[12].num = resData.annualDischargeIncome   // 年放电收益
				this.calculationResults[13].num = resData.annualChargingCost   // 年充电费用
				this.calculationResults[14].num = resData.annualProfit   // 年利润
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

<style lang="less">
	.body {
		.topic {
			font-weight: bold;
			font-size: 32rpx;
			margin-top: 40rpx;
			text-align: center;
		}

		.title {
			display: inline-block;
			padding: 40rpx 0 20rpx 40rpx;
		}

		.info {
			padding: 0 40rpx 40rpx 40rpx;
			background-color: #fff;
		}

		.depthMeasurement {
			width: 160rpx;
			margin: 40rpx 0rpx 40rpx 546rpx;
			color: #C3C3C3;
		}
	}
</style>
