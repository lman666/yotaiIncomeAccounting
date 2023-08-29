// 非负整数正则表达式
var reg1 = /^\d+$/
// 带1位小数的正实数
var reg2 = /^[0-9]+(.[0-9]{1})?$/
// 带1-4位小数的正实数
var reg3 = /^[0-9]+(.[0-9]{1,4})?$/
// 带1-2位小数的正实数
var reg4 = /^[0-9]+(.[0-9]{1,2})?$/

// 尖峰平谷小时数校验
export function hourVerification(rule,value,data,callback) {
	if (reg1.test(value) && value >= 0 && value <= 24) {
		return true
	} else {
		callback('请输入0-24之间的整数')
	}
}

// MD放大率校验
export function magnificationVerification(rule,value,data,callback) {
	if (reg1.test(value) && value >= 1 && value <= 100) {
		return true
	} else {
		callback('请输入1-100之间的整数')
	}
}

// 用电量校验
export function powerConsumptionVerification(rule,value,data,callback) {
	if (reg1.test(value) && value >= 0 && value <= 10000000) {
		return true
	} else {
		callback('请输入0-10000000之间的整数')
	}
}

// 计费需量 & 单机功率校验
export function billingDemandVerification(rule,value,data,callback) {
	if (reg1.test(value) && value >= 1 && value <= 10000000) {
		return true
	} else {
		callback('请输入1-10000000之间的整数')
	}
}

// 系统单体规格校验
export function monomerSpecificationVerification(rule,value,data,callback) {
	if ((reg1.test(value) || reg2.test(value)) && value <= 10000000) {
		return true
	} else {
		callback('请输入0-10000000之间的数，可保留一位小数')
	}
}

// 设备数量校验
export function numberOfEquipmentVerification(rule,value,data,callback) {
	if (reg1.test(value) && value >= 1 && value <= 10000000) {
		return true
	} else {
		callback('请输入1-10000000之间的整数')
	}
}

// 尖峰平谷电价校验
export function electricityPriceVerification(rule,value,data,callback) {
	if ((reg1.test(value) || reg3.test(value)) && value <= 100) {
		return true
	} else {
		callback('请输入0-100之间的数（小数位最多4位）')
	}
}

// 系统总功率 & 放电深度 校验
export function totalSystemEfficiencyVerification(rule,value,data,callback) {
	if ((reg1.test(value) || reg4.test(value)) && value <= 100) {
		return true
	} else {
		callback('请输入0-100之间的数（小数位最多2位）')
	}
}

// 储能系统规模校验
export function scaleOfEnerStorSysVerification(rule,value,data,callback) {
	if (reg1.test(value) && value <= 10000000) {
		return true
	} else {
		callback('请输入0-10000000之间的数')
	}
}