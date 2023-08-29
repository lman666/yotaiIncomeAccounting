<template>
	<view class="body">
		<view class="input formStyle">
			<uni-forms ref="valiForm" :modelValue="formData" class="form">
				<uni-forms-item label="选择城市" name="city" labelWidth="220rpx">
					<input v-model="formData.city" placeholder="请选择城市"
						placeholder-style="color:#C3C3C3;font-weight:normal;" disabled />
					<view class="image" @click="selectCity">
						<image src="../../../../static/Yotai-image/dropDown02.png"></image>
					</view>
				</uni-forms-item>
				<uni-forms-item label="尖时电价" name="tipTimeElectricityPrice" labelWidth="220rpx">
					<input v-model="formData.tipTimeElectricityPrice" placeholder="请输入电价"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">元/度</text>
				</uni-forms-item>
				<uni-forms-item label="峰时电价" name="peakTimeElectricityPrice" labelWidth="220rpx">
					<input v-model="formData.peakTimeElectricityPrice" placeholder="请输入电价"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">元/度</text>
				</uni-forms-item>
				<uni-forms-item label="平时电价" name="normalTimeElectricityPrice" labelWidth="220rpx">
					<input v-model="formData.normalTimeElectricityPrice" placeholder="请输入电价"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">元/度</text>
				</uni-forms-item>
				<uni-forms-item label="谷时电价" name="valleyTimeElectricityPrice" labelWidth="220rpx">
					<input v-model="formData.valleyTimeElectricityPrice" placeholder="请输入电价"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">元/度</text>
				</uni-forms-item>
				<uni-forms-item label="系统总功率" name="totalSystemEfficiency" labelWidth="220rpx">
					<input v-model="formData.totalSystemEfficiency" placeholder="请输入系统总功率"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">%</text>
				</uni-forms-item>
				<uni-forms-item label="放电深度" name="dischargeDepth" labelWidth="220rpx">
					<input v-model="formData.dischargeDepth" placeholder="请输入放电深度"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">%</text>
				</uni-forms-item>
				<uni-forms-item label="储能系统规模" name="scaleOfEnergyStorageSystem" labelWidth="220rpx">
					<input v-model="formData.scaleOfEnergyStorageSystem" placeholder="请输入系统规模"
						placeholder-style="color:#C3C3C3;font-weight:normal;" />
					<text class="unit">度</text>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="query">
			<button @click="query">一键查询</button>
		</view>
		<view class="popup">
			<uni-popup ref="popup" backgroundColor="#fff">
				<view class="button">
					<button class="cancel" @click="cancel">取消</button>
					<button class="confirm" @click="confirm">确定</button>
				</view>
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<picker-view indicator-style="height:60px;" :value="formData.city" @change="bindChange"
						@pickstart="pickstart" @pickend="pickend" class="picker-view">
						<picker-view-column>
							<view class="item" v-for="(item,index) in citys" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>
<script>
	import {
		electricityPriceVerification,
		totalSystemEfficiencyVerification,
		scaleOfEnerStorSysVerification
	} from '../../../../utils/validateFunc/index.js'
	export default {
		data() {
			return {
				citys: ['广东省', '湖南省', '浙江省', '重庆市'],
				isSelectCity: true,
				changeCity: '',
				isMoving: false, // 选择器是否处于滑动状态
				formData: {
					city: '',
					tipTimeElectricityPrice: '', // 尖时电价
					peakTimeElectricityPrice: '', // 峰时电价
					normalTimeElectricityPrice: '', // 平时电价
					valleyTimeElectricityPrice: '', // 谷时电价
					totalSystemEfficiency: 85, // 系统总功率
					dischargeDepth: 90, // 放电深度
					scaleOfEnergyStorageSystem: '' // 储能系统规模
				},
				// 校验规则
				rules: {
					// 城市校验
					city: {
						rules: [{
							required: true,
							errorMessage: '请选择城市'
						}]
					},
					// 尖时电价校验
					tipTimeElectricityPrice: {
						rules: [{
								required: true,
								errorMessage: '请输入电价'
							},
							{
								validateFunction: electricityPriceVerification
							}
						]
					},
					// 峰时电价校验
					peakTimeElectricityPrice: {
						rules: [{
								required: true,
								errorMessage: '请输入电价'
							},
							{
								validateFunction: electricityPriceVerification
							}
						]
					},
					// 平时电价校验
					normalTimeElectricityPrice: {
						rules: [{
								required: true,
								errorMessage: '请输入电价'
							},
							{
								validateFunction: electricityPriceVerification
							}
						]
					},
					// 谷时电价校验
					valleyTimeElectricityPrice: {
						rules: [{
								required: true,
								errorMessage: '请输入电价'
							},
							{
								validateFunction: electricityPriceVerification
							}
						]
					},
					// 系统总功率校验
					totalSystemEfficiency: {
						rules: [{
								required: true,
								errorMessage: '请输入系统总功率'
							},
							{
								validateFunction: totalSystemEfficiencyVerification
							}
						]
					},
					// 放电深度校验
					dischargeDepth: {
						rules: [{
								required: true,
								errorMessage: '请输入放电深度'
							},
							{
								validateFunction: totalSystemEfficiencyVerification
							}
						]
					},
					// 储能系统规模校验
					scaleOfEnergyStorageSystem: {
						rules: [{
								required: true,
								errorMessage: '请输入系统规模'
							},
							{
								validateFunction: scaleOfEnerStorSysVerification
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
			// 选择城市
			selectCity() {
				this.isSelectCity = true
				this.$refs.popup.open('bottom')
			},

			// 选择器滑动开始
			pickstart() {
				this.isSelectCity = true
				this.isMoving = true
			},
			
			// 选择器滑动结束
			pickend() {
				this.isSelectCity = true
				this.isMoving = false
			},

			// 选择器状态改变
			bindChange(e) {
				this.isSelectCity = true
				this.changeCity = this.citys[e.detail.value[0]]
			},

			// 用户取消
			cancel() {
				this.isSelectCity = false
				this.$refs.popup.close()
			},

			// 用户确认
			confirm() {
				if (!this.isMoving) {
					if (this.isSelectCity === true && this.changeCity === '') {
						this.formData.city = '广东省'
					} else {
						this.formData.city = this.changeCity
						this.changeCity = '广东省'
					}
					this.$refs.popup.close()
				} else {
					return
				}
			},

			// 测算
			query() {
				this.$refs.valiForm.validate().then(res => {
					console.log(this.formData)
					uni.navigateTo({
						url: '/pages/generationResOfEasyVer/generationResOfEasyVer?formData=' +
							encodeURIComponent(JSON.stringify(this.formData))

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
		box-sizing: border-box;
		height: 1040rpx;

		.input {
			height: 840rpx;
		}

		/deep/ .uni-forms-item {
			&:nth-last-of-type(3) {
				height: 130rpx;
				padding-top: 80rpx;
			}

			&:nth-of-type(2) {
				height: 130rpx;
				padding-top: 80rpx;
			}
		}

		/deep/ .uni-popup uni-transition:nth-of-type(2) .vue-ref {
			background-color: #fff;
			box-sizing: border-box;
			height: 580rpx;
			padding-left: 40rpx;
			padding-top: 30rpx;
			padding-right: 40rpx;


			.button {
				display: flex;
				justify-content: space-between;
				height: 50rpx;

				button {
					width: 80rpx;
					height: 50rpx;
					font-size: 28rpx;
					background-color: #fff;
					line-height: 50rpx;
					margin: 0;
					padding: 0;

					&.cancel {
						color: #C3C3C3;
					}

					&.confirm {
						color: #28DDA7;
					}

					&::after {
						border: unset;
						height: 28rpx;
					}
				}
			}

			.picker-view {
				width: 670rpx;
				box-sizing: border-box;
				height: 450rpx;
			}

			.item {
				line-height: 120rpx;
				text-align: center;
			}
		}

		/deep/ .uni-forms-item {
			.image {
				margin-left: 12rpx;
				display: inline-block;
				text-align: right;
				width: 70rpx;
				height: 40rpx;
				color: #C3C3C3;

				image {
					width: 28rpx;
					height: 14.85rpx;
					align-self: center;
				}
			}
		}
	}
</style>
