(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/generationResOfEasyVer/generationResOfEasyVer"],{1462:function(t,n,e){"use strict";e.r(n);var a=e("baef"),u=e("c7ea");for(var l in u)["default"].indexOf(l)<0&&function(t){e.d(n,t,(function(){return u[t]}))}(l);e("a106");var i=e("f0c5"),c=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);n["default"]=c.exports},7511:function(t,n,e){"use strict";(function(t,n){var a=e("4ea4");e("d85c");a(e("66fd"));var u=a(e("1462"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(u.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},"8d9f":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("0b7a"),u={data:function(){return{calculationResults:[{city:""},{label:"尖时电价",num:"",unit:"元/度"},{label:"峰时电价",num:"",unit:"元/度"},{label:"平时电价",num:"",unit:"元/度"},{label:"谷时电价",num:"",unit:"元/度"},{label:"系统总功率",num:"",unit:"%"},{label:"放电深度",num:"",unit:"%"},{label:"储能系统规模",num:"",unit:"度"},{label:"年放电量",num:"",unit:"度"},{label:"年充电量",num:"",unit:"度"},{label:"尖峰电价期间月收益合计",num:"",unit:"元"},{label:"非尖峰电价期间月收益合计",num:"",unit:"元"},{label:"年放电收益",num:"",unit:"元"},{label:"年充电费用",num:"",unit:"元"},{label:"年利润",num:"",unit:"元"}]}},onLoad:function(t){var n=JSON.parse(decodeURIComponent(t.formData));this.calculate(n)},methods:{calculate:function(t){var n=(0,a.powerGenerationCalculate)(t);this.calculationResults[0].city=t.city,this.calculationResults[1].num=t.tipTimeElectricityPrice,this.calculationResults[2].num=t.peakTimeElectricityPrice,this.calculationResults[3].num=t.normalTimeElectricityPrice,this.calculationResults[4].num=t.valleyTimeElectricityPrice,this.calculationResults[5].num=t.totalSystemEfficiency,this.calculationResults[6].num=t.dischargeDepth,this.calculationResults[7].num=t.scaleOfEnergyStorageSystem,this.calculationResults[8].num=n.annualDischarge,this.calculationResults[9].num=n.annualCharge,this.calculationResults[10].num=n.totalMonIncDurPeakElePriPeriod,this.calculationResults[11].num=n.totalMonIncDurNonPeakElePriPeriod,this.calculationResults[12].num=n.annualDischargeIncome,this.calculationResults[13].num=n.annualChargingCost,this.calculationResults[14].num=n.annualProfit},depthMeasurement:function(){t.showToast({title:"此功能暂未开放，敬请期待！",icon:"none",duration:1500})}}};n.default=u}).call(this,e("543d")["default"])},a106:function(t,n,e){"use strict";var a=e("c132"),u=e.n(a);u.a},baef:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return l})),e.d(n,"a",(function(){return a}));var a={YotaiRowCell:function(){return e.e("uni_modules/Yotai-rowCell/components/Yotai-rowCell/Yotai-rowCell").then(e.bind(null,"b5e3"))},YotaiFooter:function(){return e.e("uni_modules/Yotai-footer/components/Yotai-footer/Yotai-footer").then(e.bind(null,"fa1c"))}},u=function(){var t=this.$createElement;this._self._c},l=[]},c132:function(t,n,e){},c7ea:function(t,n,e){"use strict";e.r(n);var a=e("8d9f"),u=e.n(a);for(var l in a)["default"].indexOf(l)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(l);n["default"]=u.a}},[["7511","common/runtime","common/vendor"]]]);