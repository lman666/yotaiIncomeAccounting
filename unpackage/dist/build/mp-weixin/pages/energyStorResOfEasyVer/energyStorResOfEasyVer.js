(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/energyStorResOfEasyVer/energyStorResOfEasyVer"],{"0ea4":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var a={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(n.bind(null,"1a94"))},uniFormsItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(n.bind(null,"9801"))},YotaiRowCell:function(){return n.e("uni_modules/Yotai-rowCell/components/Yotai-rowCell/Yotai-rowCell").then(n.bind(null,"b5e3"))},YotaiBlockCell:function(){return n.e("uni_modules/Yotai-blockCell/components/Yotai-blockCell/Yotai-blockCell").then(n.bind(null,"8651"))},YotaiFooter:function(){return n.e("uni_modules/Yotai-footer/components/Yotai-footer/Yotai-footer").then(n.bind(null,"fa1c"))}},o=function(){var e=this.$createElement;this._self._c},i=[]},"0fc7":function(e,t,n){},"23b4":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("675a"),o=n("0b7a"),i={data:function(){return{calculationResults:[{label:"系统总容量",num:"",unit:"MWh"},{label:"项目总功率",num:"",unit:"KW"},{label:"峰期消纳剩余",num:"",unit:"KW"},{label:"平期充电剩余",num:"",unit:"KW"},{label:"谷期充电剩余",num:"",unit:"KW"},{label:"峰值平均负荷",num:"",unit:"KW"},{label:"平值平均负荷",num:"",unit:"KW"},{label:"谷值平均负荷",num:"",unit:"KW"}],formData:{},rules:{PCSSingleMachinePower:{rules:[{required:!0,errorMessage:"请输入PCS单机功率"},{validateFunction:a.billingDemandVerification}]},systemMonomerSpecification:{rules:[{required:!0,errorMessage:"请输入单体规格"},{validateFunction:a.monomerSpecificationVerification}]},numberOfEquipment:{rules:[{required:!0,errorMessage:"请输入设备数量"},{validateFunction:a.numberOfEquipmentVerification}]}}}},onReady:function(){this.$refs.valiForm.setRules(this.rules)},onLoad:function(e){this.formData=JSON.parse(decodeURIComponent(e.formData)),this.formData.peakPower=""===this.formData.peakPower?0:this.formData.peakPower,this.formData.tipPower=""===this.formData.tipPower?0:this.formData.tipPower,this.formData.normalPower=""===this.formData.normalPower?0:this.formData.normalPower,this.formData.valleyPower=""===this.formData.valleyPower?0:this.formData.valleyPower,this.calculate(this.formData)},methods:{calculate:function(e){var t=(0,o.capacityCalculate)(e);this.calculationResults[0].num=t.totalSystemCapacity,this.calculationResults[1].num=t.totalProjectPower,this.calculationResults[5].num=t.peakAverageLoad,this.calculationResults[6].num=t.flatAverageLoad,this.calculationResults[7].num=t.valleyAverageLoad,this.calculationResults[2].num=t.peakAbsorptionSurplus,this.calculationResults[3].num=t.remainingDuringNormalCharging,this.calculationResults[4].num=t.residualChargeInValleyperiod},recalculate:function(){var e=this;this.$refs.valiForm.validate().then((function(t){e.calculate(e.formData)})).catch((function(e){console.log("表单错误信息：",e)}))},depthMeasurement:function(){e.showToast({title:"此功能暂未开放，敬请期待！",icon:"none",duration:1500})}}};t.default=i}).call(this,n("543d")["default"])},"7dd7":function(e,t,n){"use strict";var a=n("0fc7"),o=n.n(a);o.a},e105:function(e,t,n){"use strict";n.r(t);var a=n("23b4"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},ed25:function(e,t,n){"use strict";(function(e,t){var a=n("4ea4");n("d85c");a(n("66fd"));var o=a(n("f368"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},f368:function(e,t,n){"use strict";n.r(t);var a=n("0ea4"),o=n("e105");for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("7dd7");var r=n("f0c5"),l=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=l.exports}},[["ed25","common/runtime","common/vendor"]]]);