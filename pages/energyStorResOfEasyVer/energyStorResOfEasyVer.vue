<template>
	<view class="body">
		<view class="topic">
			<text>储能系统容量测算报告</text>
		</view>
		<view class="infoInput">
			<text class="title">您接入的储能</text>
			<view class="energyStorInfo formStyle">
				<uni-forms ref="valiForm" :modelValue="formData">
					<uni-forms-item label="PCS单机功率" name="PCSSingleMachinePower" labelWidth="220rpx">
						<input v-model="formData.PCSSingleMachinePower" placeholder="请输入PCS单机功率"
							placeholder-style="color:#C3C3C3;font-weight:normal;" />
						<text class="unit">KW</text>
					</uni-forms-item>
					<uni-forms-item label="系统单体规格" name="systemMonomerSpecification" labelWidth="220rpx">
						<input v-model="formData.systemMonomerSpecification" placeholder="请输入单体规格"
							placeholder-style="color:#C3C3C3;font-weight:normal;" />
						<text class="unit">MWh</text>
					</uni-forms-item>
					<uni-forms-item label="设备数量" name="numberOfEquipment" labelWidth="220rpx">
						<input v-model="formData.numberOfEquipment" placeholder="请输入设备数量"
							placeholder-style="color:#C3C3C3;font-weight:normal;" />
						<text class="unit">套</text>
					</uni-forms-item>
				</uni-forms>
			</view>
		</view>
		<view class="recalculate">
			<button @click="recalculate">点击重新计算</button>
		</view>
		<view class="result">
			<view class="targetResults1">
				<block v-for="(item, i) in calculationResults" :key="i">
					<Yotai-rowCell v-if="i <= 1" :label="item.label" :num="item.num" :unit="item.unit"></Yotai-rowCell>
				</block>
			</view>
			<view class="targetResults2">
				<view class="surplus">
					<text class="title">消纳及充电剩余（kW）</text>
					<view class="res">
						<block v-for="(item, i) in calculationResults" :key="i">
							<Yotai-blockCell v-if="i >=2 && i <= 4" :label="item.label" :num="item.num">
							</Yotai-blockCell>
						</block>
					</view>
				</view>
				<view class="load">
					<text class="title">估计平均负荷（kW）</text>
					<view class="res">
						<block v-for="(item, i) in calculationResults" :key="i">
							<Yotai-blockCell v-if="i >= 5 && i <= 7" :label="item.label" :num="item.num">
							</Yotai-blockCell>
						</block>
					</view>
				</view>
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
		billingDemandVerification,
		monomerSpecificationVerification,
		numberOfEquipmentVerification
	} from '../../utils/validateFunc/index.js'
	import {
		capacityCalculate
	} from '../../utils/calculate/index.js'
	
	export default {
		data() {
			return {
				calculationResults: [{
					label: '系统总容量',
					num: '',
					unit: 'MWh'
				}, {
					label: '项目总功率',
					num: '',
					unit: 'KW'
				}, {
					label: '峰期消纳剩余',
					num: '',
					unit: 'KW'
				}, {
					label: '平期充电剩余',
					num: '',
					unit: 'KW'
				}, {
					label: '谷期充电剩余',
					num: '',
					unit: 'KW'
				}, {
					label: '峰值平均负荷',
					num: '',
					unit: 'KW'
				}, {
					label: '平值平均负荷',
					num: '',
					unit: 'KW'
				}, {
					label: '谷值平均负荷',
					num: '',
					unit: 'KW'
				}],
				formData: {},
				// 校验规则
				rules: {
					// PCS单机功率校验
					PCSSingleMachinePower: {
						rules: [{
								required: true,
								errorMessage: '请输入PCS单机功率'
							},
							{
								validateFunction: billingDemandVerification
							}
						]
					},
					// 系统单体规格校验
					systemMonomerSpecification: {
						rules: [{
								required: true,
								errorMessage: '请输入单体规格'
							},
							{
								validateFunction: monomerSpecificationVerification
							}
						]
					},
					// 设备数量校验
					numberOfEquipment: {
						rules: [{
								required: true,
								errorMessage: '请输入设备数量'
							},
							{
								validateFunction: numberOfEquipmentVerification
							}
						]
					}
				}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.valiForm.setRules(this.rules)
		},
		onLoad(options) {
			this.formData = JSON.parse(decodeURIComponent(options.formData))
			this.formData.peakPower = this.formData.peakPower === '' ? 0 : this.formData.peakPower
			this.formData.tipPower = this.formData.tipPower === '' ? 0 : this.formData.tipPower
			this.formData.normalPower = this.formData.normalPower === '' ? 0 : this.formData.normalPower
			this.formData.valleyPower = this.formData.valleyPower === '' ? 0 : this.formData.valleyPower
			this.calculate(this.formData)
		},
		methods: {
			// 计算
			calculate(formData) {
				let resData = capacityCalculate(formData)
				this.calculationResults[0].num = resData.totalSystemCapacity   // 系统总容量
				this.calculationResults[1].num = resData.totalProjectPower    // 项目总功率
				this.calculationResults[5].num = resData.peakAverageLoad  // 峰值平均负荷
				this.calculationResults[6].num = resData.flatAverageLoad   // 平值平均负荷
				this.calculationResults[7].num = resData.valleyAverageLoad   // 谷值平均负荷
				this.calculationResults[2].num = resData.peakAbsorptionSurplus  // 峰期消纳剩余
				this.calculationResults[3].num = resData.remainingDuringNormalCharging   // 平期充电剩余
				this.calculationResults[4].num = resData.residualChargeInValleyperiod  // 谷期充电剩余
			},
			// 重新计算
			recalculate() {
				this.$refs.valiForm.validate().then(res => {
					this.calculate(this.formData)
				}).catch(err => {
					console.log('表单错误信息：', err)
				})
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
	@import url('@/assets/less/index.less');
	
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;

		.topic {
			font-weight: bold;
			font-size: 32rpx;
			margin: 48rpx 0;
		}

		.infoInput {
			.title {
				display: block;
				margin-left: 40rpx;
				margin-bottom: 20rpx;
				font-size: 28rpx;
			}

			.energyStorInfo {
				height: 320rpx;
			}
		}

		.recalculate {
			width: 100%;
			height: 160rpx;
			background-color: #fff;
			margin: 40rpx 0;

			button {
				width: 670rpx;
				height: 80rpx;
				margin: 40rpx auto;
				border-radius: 40rpx;
				border: 2rpx solid #28DDA7;
				background-color: #fff;
				color: #28DDA7;
				font-size: 32rpx;
				line-height: 76rpx;

				&::after {
					border: unset;
				}
			}
		}

		.result {
			width: 100%;

			.targetResults1 {
				box-sizing: border-box;
				padding: 0 40rpx;
				height: 220rpx;
				background-color: #fff;
			}

			.targetResults2 {

				.surplus,
				.load {
					width: 100%;
					height: 325rpx;

					.title {
						display: inline-block;
						padding: 40rpx 0 20rpx 40rpx;
					}

					.res {
						display: flex;
						height: 236rpx;
						background-color: #fff;

						yotai-block-cell {
							flex: 1;
						}
					}
				}
			}
		}

		.depthMeasurement {
			width: 160rpx;
			margin: 40rpx 0rpx 40rpx 546rpx;
			color: #C3C3C3;
		}
	}
</style>
