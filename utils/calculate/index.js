// 简易版容量计算
export function capacityCalculate(formData) {
	let resData = {}    // 计算结果
	
	resData.totalSystemCapacity = (+formData.systemMonomerSpecification * +formData.numberOfEquipment).toFixed(1) // 系统总容量
	resData.totalProjectPower = Math.round(+formData.PCSSingleMachinePower * +formData.numberOfEquipment) // 项目总功率
	resData.peakAverageLoad = Math.round((+formData.peakPower + +formData.tipPower) / +formData.estimatedWorkingDays / (+formData.peakHourPerDay + +formData.tipHourPerDay) * +formData.estimatedMDMagnification / 100) // 峰值平均负荷
	resData.flatAverageLoad = Math.round(+formData.normalPower / +formData.estimatedWorkingDays / (+formData.peakHourPerDay + +formData.tipHourPerDay + +formData.averageHourPerDay) * +formData.estimatedMDMagnification / 100) // 平值平均负荷
	resData.valleyAverageLoad = Math.round(+formData.valleyPower / +formData.estimatedWorkingDays / +formData.dailyLengthOfValleyHour * +formData.estimatedMDMagnification / 100) // 谷值平均负荷
	resData.peakAbsorptionSurplus = Math.round(resData.peakAverageLoad - resData.totalProjectPower) // 峰期消纳剩余
	resData.remainingDuringNormalCharging = Math.round(+formData.billingdemand - resData.flatAverageLoad - resData.totalProjectPower) // 平期充电剩余
	resData.residualChargeInValleyperiod = Math.round(+formData.billingdemand - resData.valleyAverageLoad - resData.totalProjectPower) // 谷期充电剩余
	
	return resData
}

// 简易版发电量计算
export function powerGenerationCalculate(formData) {
	let resData = {}   // 计算结果
	
	// 四地年放电量
	let annualDischarge = (+formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 2 * 28 * 12).toFixed(2)
	// 四地年充电量
	let annualCharge = (+formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * 2 * 28 * 12).toFixed(2)
	
	resData.city = formData.city
	resData.annualDischarge = annualDischarge
	resData.annualCharge = annualCharge
	
	// 过程数据计算
	// 广东省1  湖南省2  重庆市3  浙江省4  共同0
	// 尖峰电价期间1  非尖峰电价期间2  无电价期间0
	// 第一次1  第二次2
	
	if (formData.city === '广东省') {
		// 尖峰电价期间第一次
		
		// 广东省尖峰期放电收益
		let tipPeakDischargeIncome111 = +formData.scaleOfEnergyStorageSystem * (+formData.tipTimeElectricityPrice + +formData.peakTimeElectricityPrice) / 2 * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 谷期充电成本
		let valleyChargingCost0 = +formData.scaleOfEnergyStorageSystem * +formData.valleyTimeElectricityPrice * +formData.dischargeDepth / 100
		// 广东省尖、峰谷循环收益
		let tipPeakValleyCycleIncome111 = 0 + tipPeakDischargeIncome111 - valleyChargingCost0
		// 广东省每天第一次循环收益
		let dailyFirstCycleIncome111 = tipPeakValleyCycleIncome111
		
		// 尖峰电价期间第二次
		
		// 广东省尖峰期放电收益
		let tipPeakDischargeIncome112 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * +formData.tipTimeElectricityPrice
		// 广东省湖南省浙江省峰期放电收益
		let peakDischargeIncome12412 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 0
		// 广东省湖南省重庆市平期充电成本
		let flatChargeCost12312 = +formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * +formData.normalTimeElectricityPrice
		// 广东省峰平循环收益
		let peakAndFlatCycleIncome112 = peakDischargeIncome12412 + tipPeakDischargeIncome112 - flatChargeCost12312
		// 广东省每天第二次循环收益
		let dailySecondCycleIncome112 = peakAndFlatCycleIncome112
		
		
		// 广东省每天循环收益合计
		let totalDailyRecurringIncome11 = dailyFirstCycleIncome111 + dailySecondCycleIncome112
		
		// 广东省尖峰电价期间月收益合计
		let totalMonIncDurPeakElePriPeriod11 = totalDailyRecurringIncome11 * 28
		
		// 非尖峰电价期间第一次
		
		// 广东省湖南省重庆市 峰期放电收益
		let peakDischargeIncome12321 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市谷期充电成本
		let valleyChargingCost12321 = +formData.scaleOfEnergyStorageSystem * +formData.valleyTimeElectricityPrice * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市峰谷循环收益
		let peakValleyCycleIncome12321 = peakDischargeIncome12321 - valleyChargingCost12321
		// 广东省湖南省重庆市 每天第一次循环收益
		let dailyFirstCycleIncome12321 = peakValleyCycleIncome12321
		
		// 非尖峰电价期间第二次
		
		// 广东省湖南省重庆市 峰期放电收益
		let peakDischargeIncome12322 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市平期充电成本
		let flatChargeCost12322 = +formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * +formData.normalTimeElectricityPrice
		// 广东省湖南省重庆市峰平循环收益
		let peakAndFlatCycleIncome12322 = peakDischargeIncome12322 - flatChargeCost12322
		// 广东省湖南省重庆市每天第二次循环收益
		let dailySecondCycleIncome12322 = peakAndFlatCycleIncome12322
		
		// 广东省湖南省重庆市每天循环收益合计
		let totalDailyRecurringIncome1232 = dailyFirstCycleIncome12321 + dailySecondCycleIncome12322
		// 广东省湖南省重庆市 非尖峰电价期间月收益合计
		let totalMonIncDurNonPeakElePriPeriod1232 = totalDailyRecurringIncome1232 * 28
		
		
		// 广东省 
		// 年放电收益
		let annualDischargeIncome1 = (tipPeakDischargeIncome111 + tipPeakDischargeIncome112) * 28 * 4 + (peakDischargeIncome12321 + peakDischargeIncome12322) * 28 * 8
		// 年充电费用
		let annualChargingCost1 = (valleyChargingCost0 + flatChargeCost12312) * 28 * 12
		// 年利润
		let annualProfit1 = annualDischargeIncome1 - annualChargingCost1
		
		resData.totalMonIncDurPeakElePriPeriod = totalMonIncDurPeakElePriPeriod11.toFixed(4)    // 尖峰电价期间月收益合计
		resData.totalMonIncDurNonPeakElePriPeriod = totalMonIncDurNonPeakElePriPeriod1232.toFixed(4)   // 非尖峰电价期间月收益合计
		resData.annualDischargeIncome = annualDischargeIncome1.toFixed(2)   // 年放电收益
		resData.annualChargingCost = annualChargingCost1.toFixed(2)    // 年充电费用
		resData.annualProfit = annualProfit1.toFixed(2)     // 年利润
		
	} else if (formData.city === '浙江省') {
		// 尖峰电价期间第一次
		
		// 浙江省尖峰期放电收益
		let tipPeakDischargeIncome401 = +formData.scaleOfEnergyStorageSystem * +formData.tipTimeElectricityPrice * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 1
		// 浙江省峰期放电收益
		let peakDischargeIncome411 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 0
		// 谷期充电成本
		let valleyChargingCost0 = +formData.scaleOfEnergyStorageSystem * +formData.valleyTimeElectricityPrice * +formData.dischargeDepth / 100
		// 浙江省尖、峰谷循环收益
		let tipPeakValleyCycleIncome401 = peakDischargeIncome411 + tipPeakDischargeIncome401 - valleyChargingCost0
		// 浙江省每天第一次循环收益
		let dailyFirstCycleIncome401 = tipPeakValleyCycleIncome401
		
		// 尖峰电价期间第二次
		
		// 浙江省湖南省尖期放电收益
		let tipDischargeIncome4212 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * +formData.tipTimeElectricityPrice
		// 广东省湖南省浙江省峰期放电收益
		let peakDischargeIncome12412 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 0
		// 浙江省谷期充电成本
		let valleyChargeCost402 = +formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * +formData.valleyTimeElectricityPrice
		// 浙江省峰谷循环收益
		let peakAndValleyCycleIncome402 = peakDischargeIncome12412 + tipDischargeIncome4212 - valleyChargeCost402
		// 浙江省每天第二次循环收益
		let dailySecondCycleIncome402 = peakAndValleyCycleIncome402
		
		// 浙江省每天循环收益合计
		let totalDailyRecurringIncome4 = dailyFirstCycleIncome401 + dailySecondCycleIncome402
		
		// 浙江省尖峰电价期间月收益合计
		let totalMonIncDurPeakElePriPeriod40 = totalDailyRecurringIncome4 * 28
		
		// 年放电收益
		let annualDischargeIncome4 = (tipPeakDischargeIncome401 + tipDischargeIncome4212) * 28 * 12
		// 年充电费用
		let annualChargingCost4 = (valleyChargingCost0 + valleyChargeCost402) * 28 * 12
		// 年利润
		let annualProfit4 = annualDischargeIncome4 - annualChargingCost4
		
		resData.totalMonIncDurPeakElePriPeriod = totalMonIncDurPeakElePriPeriod40.toFixed(4)
		resData.annualDischargeIncome = annualDischargeIncome4.toFixed(2)
		resData.annualChargingCost = annualChargingCost4.toFixed(2)
		resData.annualProfit = annualProfit4.toFixed(2)
		
	} else if(formData.city === '湖南省') {
		// 尖峰电价期间第一次
		
		// 湖南省尖峰期放电收益
		let tipPeakDischargeIncome211 = +formData.scaleOfEnergyStorageSystem * (+formData.tipTimeElectricityPrice + +formData.peakTimeElectricityPrice) / 2 * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 0
		// 湖南省峰期放电收益
		let peakDischargeIncome211 = (+formData.peakTimeElectricityPrice * 3 + +formData.normalTimeElectricityPrice * 1) / 4 * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 1
		// 谷期充电成本
		let valleyChargingCost0 = +formData.scaleOfEnergyStorageSystem * +formData.valleyTimeElectricityPrice * +formData.dischargeDepth / 100
		// 湖南省尖、峰谷循环收益
		let tipPeakValleyCycleIncome211 = peakDischargeIncome211 + tipPeakDischargeIncome211 - valleyChargingCost0
		// 湖南省每天第一次循环收益
		let dailyFirstCycleIncome211 = tipPeakValleyCycleIncome211
		
		
		// 尖峰电价期间第二次
		
		// 浙江省湖南省尖期放电收益
		let tipDischargeIncome4212 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * +formData.tipTimeElectricityPrice
		// 广东省湖南省浙江省峰期放电收益
		let peakDischargeIncome12412 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 0
		// 广东省湖南省重庆市平期充电成本
		let flatChargeCost12312 = +formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * +formData.normalTimeElectricityPrice
		// 湖南省峰平循环收益
		let peakAndFlatCycleIncome212 = peakDischargeIncome12412 + tipDischargeIncome4212 - flatChargeCost12312
		// 湖南省每天第二次循环收益
		let dailySecondCycleIncome212 = peakAndFlatCycleIncome212
		
		// 湖南省每天循环收益合计
		let totalDailyRecurringIncome21 = dailyFirstCycleIncome211 + dailySecondCycleIncome212
		
		// 湖南省尖峰电价期间月收益合计
		let totalMonIncDurPeakElePriPeriod21 = totalDailyRecurringIncome21 * 28
		
		
		// 非尖峰电价期间第一次
		
		// 广东省湖南省重庆市 峰期放电收益
		let peakDischargeIncome12321 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市谷期充电成本
		let valleyChargingCost12321 = +formData.scaleOfEnergyStorageSystem * +formData.valleyTimeElectricityPrice * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市峰谷循环收益
		let peakValleyCycleIncome12321 = peakDischargeIncome12321 - valleyChargingCost12321
		// 广东省湖南省重庆市 每天第一次循环收益
		let dailyFirstCycleIncome12321 = peakValleyCycleIncome12321
		
		// 非尖峰电价期间第二次
		
		// 广东省湖南省重庆市 峰期放电收益
		let peakDischargeIncome12322 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市平期充电成本
		let flatChargeCost12322 = +formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * +formData.normalTimeElectricityPrice
		// 广东省湖南省重庆市峰平循环收益
		let peakAndFlatCycleIncome12322 = peakDischargeIncome12322 - flatChargeCost12322
		// 广东省湖南省重庆市每天第二次循环收益
		let dailySecondCycleIncome12322 = peakAndFlatCycleIncome12322
		
		// 广东省湖南省重庆市每天循环收益合计
		let totalDailyRecurringIncome1232 = dailyFirstCycleIncome12321 + dailySecondCycleIncome12322
		// 广东省湖南省重庆市 非尖峰电价期间月收益合计
		let totalMonIncDurNonPeakElePriPeriod1232 = totalDailyRecurringIncome1232 * 28
		
		// 年放电收益
		let annualDischargeIncome2 = (peakDischargeIncome211 + tipDischargeIncome4212) * 28 * 5 + (peakDischargeIncome12321 + peakDischargeIncome12322) * 28 * 7
		// 年充电费用
		let annualChargingCost2 = (valleyChargingCost0 + flatChargeCost12312) * 28 * 12
		// 年利润
		let annualProfit2 = annualDischargeIncome2 - annualChargingCost2
		
		resData.totalMonIncDurPeakElePriPeriod = totalMonIncDurPeakElePriPeriod21.toFixed(4)
		resData.totalMonIncDurNonPeakElePriPeriod = totalMonIncDurNonPeakElePriPeriod1232.toFixed(4)
		resData.annualDischargeIncome = annualDischargeIncome2.toFixed(2)
		resData.annualChargingCost = annualChargingCost2.toFixed(2)
		resData.annualProfit = annualProfit2.toFixed(2)
		
	} else if(formData.city === '重庆市') {
		// 尖峰电价期间第一次
		
		// 重庆市尖峰期放电收益
		let tipPeakDischargeIncome311 = +formData.scaleOfEnergyStorageSystem * +formData.tipTimeElectricityPrice * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 重庆市峰期放电收益
		let peakDischargeIncome311 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 0
		// 谷期充电成本
		let valleyChargingCost0 = +formData.scaleOfEnergyStorageSystem * +formData.valleyTimeElectricityPrice * +formData.dischargeDepth / 100
		// 重庆市尖、峰谷循环收益
		let tipPeakValleyCycleIncome311 = peakDischargeIncome311 + tipPeakDischargeIncome311 - valleyChargingCost0
		// 重庆市每天第一次循环收益
		let dailyFirstCycleIncome311 = tipPeakValleyCycleIncome311
		
		// 尖峰电价期间第二次
		
		// 重庆市峰期放电收益
		let peakDischargeIncome312 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * +formData.peakTimeElectricityPrice
		// 重庆市尖期放电收益
		let tipDischargeIncome312 = +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100 * 0
		// 广东省湖南省重庆市平期充电成本
		let flatChargeCost12312 = +formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * +formData.normalTimeElectricityPrice
		// 重庆市峰平循环收益
		let peakAndFlatCycleIncome312 = peakDischargeIncome312 + tipDischargeIncome312 - flatChargeCost12312
		// 重庆市每天第二次循环收益
		let dailySecondCycleIncome312 = peakAndFlatCycleIncome312
		
		// 重庆市每天循环收益合计
		let totalDailyRecurringIncome31 = dailyFirstCycleIncome311 + dailySecondCycleIncome312
		
		// 重庆市尖峰电价期间月收益合计
		let totalMonIncDurPeakElePriPeriod31 = totalDailyRecurringIncome31 * 28
		
		
		// 非尖峰电价期间第一次
		
		// 广东省湖南省重庆市 峰期放电收益
		let peakDischargeIncome12321 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市谷期充电成本
		let valleyChargingCost12321 = +formData.scaleOfEnergyStorageSystem * +formData.valleyTimeElectricityPrice * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市峰谷循环收益
		let peakValleyCycleIncome12321 = peakDischargeIncome12321 - valleyChargingCost12321
		// 广东省湖南省重庆市 每天第一次循环收益
		let dailyFirstCycleIncome12321 = peakValleyCycleIncome12321
		
		// 非尖峰电价期间第二次
		
		// 广东省湖南省重庆市 峰期放电收益
		let peakDischargeIncome12322 = +formData.peakTimeElectricityPrice * +formData.scaleOfEnergyStorageSystem * +formData.totalSystemEfficiency / 100 * +formData.dischargeDepth / 100
		// 广东省湖南省重庆市平期充电成本
		let flatChargeCost12322 = +formData.scaleOfEnergyStorageSystem * +formData.dischargeDepth / 100 * +formData.normalTimeElectricityPrice
		// 广东省湖南省重庆市峰平循环收益
		let peakAndFlatCycleIncome12322 = peakDischargeIncome12322 - flatChargeCost12322
		// 广东省湖南省重庆市每天第二次循环收益
		let dailySecondCycleIncome12322 = peakAndFlatCycleIncome12322
		
		// 广东省湖南省重庆市每天循环收益合计
		let totalDailyRecurringIncome1232 = dailyFirstCycleIncome12321 + dailySecondCycleIncome12322
		// 广东省湖南省重庆市 非尖峰电价期间月收益合计
		let totalMonIncDurNonPeakElePriPeriod1232 = totalDailyRecurringIncome1232 * 28
		
		// 年放电收益
		let annualDischargeIncome3 = (tipPeakDischargeIncome311 + peakDischargeIncome312) * 28 * 4 + (peakDischargeIncome12321 + peakDischargeIncome12322) * 28 * 8
		// 年充电费用
		let annualChargingCost3 = (valleyChargingCost0 + flatChargeCost12312) * 28 * 12
		// 年利润
		let annualProfit3 = annualDischargeIncome3 - annualChargingCost3
		
		resData.totalMonIncDurPeakElePriPeriod = totalMonIncDurPeakElePriPeriod31.toFixed(4)
		resData.totalMonIncDurNonPeakElePriPeriod = totalMonIncDurNonPeakElePriPeriod1232.toFixed(4)
		resData.annualDischargeIncome = annualDischargeIncome3.toFixed(2)
		resData.annualChargingCost = annualChargingCost3.toFixed(2)
		resData.annualProfit = annualProfit3.toFixed(2)
	}
	
	return resData
}