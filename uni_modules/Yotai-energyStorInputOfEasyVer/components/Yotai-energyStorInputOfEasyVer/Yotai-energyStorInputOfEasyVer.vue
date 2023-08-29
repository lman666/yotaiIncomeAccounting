<template>
	<view class="body">
		<uni-forms ref="valiForm" :modelValue="formData">
			<view class="timeInput formStyle">
				<uni-forms-item label="尖时每天时长" name="tipHourPerDay" labelWidth="220rpx">
					<input v-model="formData.tipHourPerDay" placeholder="请输入小时数"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">小时</text>
				</uni-forms-item>
				<uni-forms-item label="峰时每天时长" name="peakHourPerDay" labelWidth="220rpx">
					<input v-model="formData.peakHourPerDay" placeholder="请输入小时数"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">小时</text>
				</uni-forms-item>
				<uni-forms-item label="平时每天时长" name="averageHourPerDay" labelWidth="220rpx">
					<input type="textarea" v-model="formData.averageHourPerDay" placeholder="请输入小时数"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">小时</text>
				</uni-forms-item>
				<uni-forms-item label="谷时每天时长" name="dailyLengthOfValleyHour" labelWidth="220rpx">
					<input type="textarea" v-model="formData.dailyLengthOfValleyHour" placeholder="请输入小时数"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">小时</text>
				</uni-forms-item>
				<uni-forms-item label="估计工作天数" name="estimatedWorkingDays" labelWidth="220rpx">
					<input type="textarea" v-model="formData.estimatedWorkingDays" disabled class="disabled" />
					<text class="unit">天</text>
				</uni-forms-item>
				<uni-forms-item label="估计MD放大率" name="estimatedMDMagnification" labelWidth="220rpx">
					<input type="textarea" v-model="formData.estimatedMDMagnification" placeholder="请输入放大率"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">%</text>
				</uni-forms-item>
			</view>
			<text class="title">月用电量信息</text>
			<view class="monthlyEleConsump formStyle">
				<uni-forms-item label="尖时电量" name="tipPower" labelWidth="220rpx">
					<input v-model="formData.tipPower" placeholder="请输入电量"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">度</text>
				</uni-forms-item>
				<uni-forms-item label="峰时电量" name="peakPower" labelWidth="220rpx">
					<input v-model="formData.peakPower" placeholder="请输入电量"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">度</text>
				</uni-forms-item>
				<uni-forms-item label="平时电量" name="normalPower" labelWidth="220rpx">
					<input v-model="formData.normalPower" placeholder="请输入电量"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">度</text>
				</uni-forms-item>
				<uni-forms-item label="谷时电量" name="valleyPower" labelWidth="220rpx">
					<input v-model="formData.valleyPower" placeholder="请输入电量"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">度</text>
				</uni-forms-item>
				<uni-forms-item label="计费需量" name="billingdemand" labelWidth="220rpx">
					<input v-model="formData.billingdemand" placeholder="请输入计费需量或容器kVA"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">KW</text>
				</uni-forms-item>
			</view>
			<text class="title">请您输入接入的储能信息</text>
			<view class="energyStorInfo formStyle">
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
			</view>
		</uni-forms>
		<view class="query">
			<button @click="query">一键查询</button>
		</view>
	</view>
</template>
<script>
	import {
		hourVerification,
		magnificationVerification,
		powerConsumptionVerification,
		billingDemandVerification,
		monomerSpecificationVerification,
		numberOfEquipmentVerification
	} from '../../../../utils/validateFunc/index.js'
	
	export default {
		data() {
			return {
				// 表单数据
				formData: {
					tipHourPerDay: '',
					peakHourPerDay: '',
					averageHourPerDay: '',
					dailyLengthOfValleyHour: '',
					estimatedWorkingDays: 30,
					estimatedMDMagnification: 100,
					tipPower: '',
					peakPower: '',
					normalPower: '',
					valleyPower: '',
					billingdemand: '',
					PCSSingleMachinePower: '',
					systemMonomerSpecification: '',
					numberOfEquipment: ''
				},
				// 校验规则
				rules: {
					// 尖时每天时长校验
					tipHourPerDay: {
						rules: [{
								required: true,
								errorMessage: '请输入小时数'
							},
							{
								validateFunction: hourVerification
							}
						]
					},
					// 峰时每天时长校验
					peakHourPerDay: {
						rules: [{
								required: true,
								errorMessage: '请输入小时数'
							},
							{
								validateFunction: hourVerification
							}
						]
					},
					// 平时每天时长校验
					averageHourPerDay: {
						rules: [{
								required: true,
								errorMessage: '请输入小时数'
							},
							{
								validateFunction: hourVerification
							}
						]
					},
					// 谷时每天时长校验
					dailyLengthOfValleyHour: {
						rules: [{
								required: true,
								errorMessage: '请输入小时数'
							},
							{
								validateFunction: hourVerification
							}
						]
					},
					// 估计MD放大率校验
					estimatedMDMagnification: {
						rules: [{
								required: true,
								errorMessage: '请输入放大率'
							},
							{
								validateFunction: magnificationVerification
							}
						]
					},
					// 尖时电量校验
					tipPower: {
						rules: [{
							validateFunction: powerConsumptionVerification
						}]
					},
					// 峰时电量校验
					peakPower: {
						rules: [{
							validateFunction: powerConsumptionVerification
						}]
					},
					// 平时电量校验
					normalPower: {
						rules: [{
							validateFunction: powerConsumptionVerification
						}]
					},
					// 谷时电量校验
					valleyPower: {
						rules: [{
							validateFunction: powerConsumptionVerification
						}]
					},
					// 计费需量校验
					billingdemand: {
						rules: [{
								required: true,
								errorMessage: '请输入计费需量或容器kVA'
							},
							{
								validateFunction: billingDemandVerification
							}
						]
					},
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
			this.$refs.valiForm.setRules(this.rules)
		},
		methods: {
			query() {
				this.$refs.valiForm.validate().then(res => {
					uni.navigateTo({
						url: '/pages/energyStorResOfEasyVer/energyStorResOfEasyVer?formData=' + encodeURIComponent(JSON.stringify(this.formData))
					
					})
				}).catch(err => {
					console.log('表单错误信息：', err)
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>
<style lang="less" scoped>
	@import url('@/assets/less/index.less');
	
	.body {

		.timeInput {
			height: 660rpx;

			/deep/ .uni-forms-item {
				&:nth-last-of-type(-n+2) {
					height: 130rpx;
					padding-top: 80rpx;
				}
			}
		}

		.monthlyEleConsump {
			height: 530rpx;

			/deep/ .uni-forms-item {
				&:nth-last-of-type(-n+1) {
					height: 130rpx;
					padding-top: 80rpx;
				}
			}
		}

		.energyStorInfo {
			height: 310rpx;
		}

		.title {
			display: inline-block;
			margin: 40rpx 0 20rpx 40rpx;
			font-weight: bold;
		}
	}
</style>
