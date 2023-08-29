#简易版录入页面ui实现
##组件模块划分

页面顶部logo部分
```html
<Yotai-logo></Yotai-logo>
```
选择测算类型按钮部分
```html
<view class="selectMeasurementType">
	<button class="energyStorage">储能系统容量</button>
	<button class="powerGeneration">发电量测算</button>
</view>
```
录入测算数据部分
```html
<view class="dataInput">
	<Yotai-energyStorInputOfEasyVer><Yotai-energyStorInputOfEasyVer>
	<Yotai-generationInputOfEasyVer><Yotai-generationInputOfEasyVer>
</view>
```
跳转正式版链接部分
```html
<view class="depthMeasurement">
	<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
	    <text>深度测算>></text>
	</navigator>
</view>
```
底部二维码部分
```html
<Yotai-footer></Yotai-footer>
```
##功能逻辑

