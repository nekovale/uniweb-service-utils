!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("axios")):"function"==typeof define&&define.amd?define(["exports","axios"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).UniwebService={},t.axios)}(this,(function(t,e){"use strict";function n(t,e,n,a,r,u,o){try{var i=t[u](o),s=i.value}catch(t){return void n(t)}i.done?e(s):Promise.resolve(s).then(a,r)}function a(t){return function(){var e=this,a=arguments;return new Promise((function(r,u){var o=t.apply(e,a);function i(t){n(o,r,u,i,s,"next",t)}function s(t){n(o,r,u,i,s,"throw",t)}i(void 0)}))}}function r(){return r=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},r.apply(this,arguments)}var u={en:"en",zh:"zh"},o=function(){function t(){var t,e=this;this.url="",this.lang=u.en,this.authKey=null,this.setAuth=function({key:t}){e.authKey=t},this.config=function({url:t,lang:n}){t&&(e.url=t),n&&(e.lang=n)},this.auth={login:(t=a((function*(t){var n,a=yield e.request({method:"POST",endpoint:"/auth/login",data:t});return 200===a.status&&a.data&&e.setAuth({key:null==(n=a.data)?void 0:n.access_token}),a})),function(e){return t.apply(this,arguments)})},this.manage={user:{create:function(t){return e.request({method:"POST",endpoint:"/manage/create-user",data:t})},update:function(t){return e.request({method:"POST",endpoint:"/manage/update-user",data:t})},remove:function(t){return e.request({method:"POST",endpoint:"/manage/remove-user",data:t})},list:function(){return e.request({method:"GET",endpoint:"/manage/list-user"})}},struct:{init:function(t){return e.request({method:"POST",endpoint:"/manage/init-struct",data:t})},create:function(t){return e.request({method:"POST",endpoint:"/manage/add-struct",data:t})},update:function(t){return e.request({method:"POST",endpoint:"/manage/update-struct",data:t})},remove:function(t){return e.request({method:"POST",endpoint:"/manage/remove-struct",data:t})}},template:{create:function(t){return e.request({method:"POST",endpoint:"/manage/create-template",data:t})},update:function(t){return e.request({method:"POST",endpoint:"/manage/update-template",data:t})},remove:function(t){return e.request({method:"POST",endpoint:"/manage/remove-template",data:t})},list:function(){return e.request({method:"GET",endpoint:"/manage/list-template"})},listValue:function(t){return e.request({method:"GET",endpoint:"/manage/list-template-value",data:t})},createValue:function(t){return e.request({method:"POST",endpoint:"/mutation/create-template-value",data:t})}},group:{create:function(t){return e.request({method:"POST",endpoint:"/mutation/create-group",data:t})},update:function(t){return e.request({method:"POST",endpoint:"/mutation/update-group",data:t})},remove:function(t){return e.request({method:"POST",endpoint:"/mutation/remove-group",data:t})},get:function(t){return e.request({method:"GET",endpoint:"/query/group",data:t})}}}}return t.prototype.request=function(){var t=a((function*({method:t,endpoint:n,data:a}){return e.request({method:t,url:n,baseURL:this.url,headers:r({"Content-Type":"application/json","Accept-Language":this.lang},this.authKey&&{Authorization:"Bearer "+this.authKey}),params:"GET"===t?a:void 0,data:"GET"===t?void 0:a}).then((function(t){return{status:200,data:t.data}})).catch((function(t){var e,n;return{status:null==(e=t.response)?void 0:e.status,message:null==(n=t.response)?void 0:n.data.message}}))}));return function(e){return t.apply(this,arguments)}}(),t}(),i=new o;t.Group={list:1},t.Lang=u,t.Resource={text:1,image:2,video:3,rich:4},t.Role={admin:1,user:2,super:3},t.UniwebInstance=i,t.UniwebService=o}));
//# sourceMappingURL=index.production.js.map
