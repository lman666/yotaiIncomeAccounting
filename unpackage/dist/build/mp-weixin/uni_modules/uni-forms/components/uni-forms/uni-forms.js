(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-forms/components/uni-forms/uni-forms"],{"1a94":function(e,t,a){"use strict";a.r(t);var n=a("decc"),r=a("7f1c");for(var i in r)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return r[e]}))}(i);a("7067");var u=a("f0c5"),l=Object(u["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=l.exports},"45f6":function(e,t,a){"use strict";var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("2eee")),i=n(a("c973")),u=n(a("9523")),l=n(a("7770")),s=a("8165"),o=n(a("66fd"));o.default.prototype.binddata=function(e,t,a){if(a)this.$refs[a].setValue(e,t);else{var n;for(var r in this.$refs){var i=this.$refs[r];if(i&&i.$options&&"uniForms"===i.$options.name){n=i;break}}if(!n)return console.error("当前 uni-froms 组件缺少 ref 属性");n.setValue(e,t)}};var f={name:"uniForms",emits:["validate","submit"],options:{virtualHost:!0},props:{value:{type:Object,default:function(){return null}},modelValue:{type:Object,default:function(){return null}},model:{type:Object,default:function(){return null}},rules:{type:Object,default:function(){return{}}},errShowType:{type:String,default:"undertext"},validateTrigger:{type:String,default:"submit"},labelPosition:{type:String,default:"left"},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:"left"},border:{type:Boolean,default:!1}},provide:function(){return{uniForm:this}},data:function(){return{formData:{},formRules:{}}},computed:{localData:function(){var e=this.model||this.modelValue||this.value;return e?(0,s.deepCopy)(e):{}}},watch:{rules:{handler:function(e,t){this.setRules(e)},deep:!0,immediate:!0}},created:function(){this.childrens=[],this.inputChildrens=[],this.setRules(this.rules)},methods:{setRules:function(e){this.formRules=Object.assign({},this.formRules,e),this.validator=new l.default(e)},setValue:function(e,t){var a=this.childrens.find((function(t){return t.name===e}));return a?(this.formData[e]=(0,s.getValue)(e,t,this.formRules[e]&&this.formRules[e].rules||[]),a.onFieldChange(this.formData[e])):null},validate:function(e,t){return this.checkAll(this.formData,e,t)},validateField:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0;t=[].concat(t);var n={};return this.childrens.forEach((function(a){var r=(0,s.realName)(a.name);-1!==t.indexOf(r)&&(n=Object.assign({},n,(0,u.default)({},r,e.formData[r])))})),this.checkAll(n,[],a)},clearValidate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e=[].concat(e),this.childrens.forEach((function(t){if(0===e.length)t.errMsg="";else{var a=(0,s.realName)(t.name);-1!==e.indexOf(a)&&(t.errMsg="")}}))},submit:function(e,t,a){var n=this,r=function(e){var t=n.childrens.find((function(t){return t.name===e}));t&&void 0===n.formData[e]&&(n.formData[e]=n._getValue(e,n.dataValue[e]))};for(var i in this.dataValue)r(i);return a||console.warn("submit 方法即将废弃，请使用validate方法代替！"),this.checkAll(this.formData,e,t,"submit")},checkAll:function(e,t,a,n){var u=this;return(0,i.default)(r.default.mark((function i(){var l,o,f,c,d,h,m,v,p,b,g;return r.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(u.validator){i.next=2;break}return i.abrupt("return");case 2:for(f in l=[],o=function(e){var t=u.childrens.find((function(t){return(0,s.realName)(t.name)===e}));t&&l.push(t)},e)o(f);a||"function"!==typeof t||(a=t),!a&&"function"!==typeof a&&Promise&&(c=new Promise((function(e,t){a=function(a,n){a?t(a):e(n)}}))),d=[],h=JSON.parse(JSON.stringify(e)),i.t0=r.default.keys(l);case 10:if((i.t1=i.t0()).done){i.next=23;break}return m=i.t1.value,v=l[m],p=(0,s.realName)(v.name),i.next=16,v.onFieldChange(h[p]);case 16:if(b=i.sent,!b){i.next=21;break}if(d.push(b),"toast"!==u.errShowType&&"modal"!==u.errShowType){i.next=21;break}return i.abrupt("break",23);case 21:i.next=10;break;case 23:if(Array.isArray(d)&&0===d.length&&(d=null),Array.isArray(t)&&t.forEach((function(e){var t=(0,s.realName)(e),a=(0,s.getDataValue)(e,u.localData);void 0!==a&&(h[t]=a)})),"submit"===n?u.$emit("submit",{detail:{value:h,errors:d}}):u.$emit("validate",d),{},g=(0,s.rawData)(h,u.name),a&&"function"===typeof a&&a(d,g),!c||!a){i.next=33;break}return i.abrupt("return",c);case 33:return i.abrupt("return",null);case 34:case"end":return i.stop()}}),i)})))()},validateCheck:function(e){this.$emit("validate",e)},_getValue:s.getValue,_isRequiredField:s.isRequiredField,_setDataValue:s.setDataValue,_getDataValue:s.getDataValue,_realName:s.realName,_isRealName:s.isRealName,_isEqual:s.isEqual}};t.default=f},5259:function(e,t,a){},7067:function(e,t,a){"use strict";var n=a("5259"),r=a.n(n);r.a},"7f1c":function(e,t,a){"use strict";a.r(t);var n=a("45f6"),r=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=r.a},decc:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){}));var n=function(){var e=this.$createElement;this._self._c},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-forms/components/uni-forms/uni-forms-create-component',
    {
        'uni_modules/uni-forms/components/uni-forms/uni-forms-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1a94"))
        })
    },
    [['uni_modules/uni-forms/components/uni-forms/uni-forms-create-component']]
]);
