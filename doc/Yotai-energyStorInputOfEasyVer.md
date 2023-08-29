#储能容量录入组件实现
##组件模块划分
```html
<view class="body">
    // 表单组件
	<uni-forms>
        // 时间输入卡片
		<view class="timeInput common">
            // 表单项
			<uni-forms-item>
				<input/>
				<text>小时</text>
			</uni-forms-item>
		</view>
		<text class="title">月用电量信息</text>
        // 月用电量信息输入卡片
		<view class="monthlyEleConsump common">
            // 表单项
			<uni-forms-item>
				<input/>
				<text>度</text>
			</uni-forms-item>
		</view>
		<text class="title">请您输入接入的储能信息</text>
        // 储能信息输入卡片
		<view class="energyStorInfo common">
            // 表单项
			<uni-forms-item >
				<input/>
				<text>KW</text>
			</uni-forms-item>
		</view>
	</uni-forms>
    // 查询按钮部分
	<view class="query">
		<button>一键查询</button>
	</view>
</view>
```