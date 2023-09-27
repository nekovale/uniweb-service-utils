!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("axios")):"function"==typeof define&&define.amd?define(["exports","axios"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).UniwebService={},e.axios)}(this,(function(e,t){"use strict";function n(e,t,n,r,a,u,o){try{var i=e[u](o),s=i.value}catch(e){return void n(e)}i.done?t(s):Promise.resolve(s).then(r,a)}function r(e){return function(){var t=this,r=arguments;return new Promise((function(a,u){var o=e.apply(t,r);function i(e){n(o,a,u,i,s,"next",e)}function s(e){n(o,a,u,i,s,"throw",e)}i(void 0)}))}}function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(this,arguments)}var u=function(){function e(){var e,t=this;this.url="",this.authKey=null,this.setAuth=function({key:e}){t.authKey=e},this.config=function({url:e}){e&&(t.url=e)},this.auth={login:(e=r((function*(e){var n,r=yield t.request({method:"POST",endpoint:"/auth/login",data:e});return 200===r.status&&r.data&&t.setAuth({key:null==(n=r.data)?void 0:n.access_token}),r})),function(t){return e.apply(this,arguments)}),verifyEmail:function(e){return t.request({method:"POST",endpoint:"/auth/verify-email",data:e})}},this.manage={user:{create:function(e){return t.request({method:"POST",endpoint:"/manage/create-user",data:e})},update:function(e){return t.request({method:"POST",endpoint:"/manage/update-user",data:e})},remove:function(e){return t.request({method:"POST",endpoint:"/manage/remove-user",data:e})},list:function(){return t.request({method:"GET",endpoint:"/manage/list-user"})},resendEmailInvite:function(e){return t.request({method:"POST",endpoint:"/manage/resend-email-invite",data:e})}},struct:{init:function(e){return t.request({method:"POST",endpoint:"/manage/init-struct",data:e})},create:function(e){return t.request({method:"POST",endpoint:"/manage/add-struct",data:e})},update:function(e){return t.request({method:"POST",endpoint:"/manage/update-struct",data:e})},remove:function(e){return t.request({method:"POST",endpoint:"/manage/remove-struct",data:e})}},template:{create:function(e){return t.request({method:"POST",endpoint:"/manage/create-template",data:e})},update:function(e){return t.request({method:"POST",endpoint:"/manage/update-template",data:e})},remove:function(e){return t.request({method:"POST",endpoint:"/manage/remove-template",data:e})},list:function(){return t.request({method:"GET",endpoint:"/manage/list-template"})},listValue:function(e){return t.request({method:"GET",endpoint:"/manage/list-template-value",data:e})},createValue:function(e){return t.request({method:"POST",endpoint:"/mutation/create-template-value",data:e})}},group:{create:function(e){return t.request({method:"POST",endpoint:"/mutation/create-group",data:e})},update:function(e){return t.request({method:"POST",endpoint:"/mutation/update-group",data:e})},remove:function(e){return t.request({method:"POST",endpoint:"/mutation/remove-group",data:e})},get:function(e){return t.request({method:"GET",endpoint:"/query/group",data:e})}}}}return e.prototype.request=function(){var e=r((function*({method:e,endpoint:n,data:r}){return t.request({method:e,url:n,baseURL:this.url,headers:a({"Content-Type":"application/json"},this.authKey&&{Authorization:"Bearer "+this.authKey}),params:"GET"===e?r:void 0,data:"GET"===e?void 0:r}).then((function(e){return{status:200,data:e.data}})).catch((function(e){var t,n,r;return{status:null==(t=e.response)?void 0:t.status,errors:null==(n=e.response)?void 0:n.data.errors,message:null==(r=e.response)?void 0:r.data.message}}))}));return function(t){return e.apply(this,arguments)}}(),e}(),o=new u;e.Group={list:1},e.Resource={text:1,image:2,video:3,rich:4},e.Role={admin:1,user:2,super:3},e.UniwebInstance=o,e.UniwebService=u,e.UserStatus={active:1,inactive:2}}));
//# sourceMappingURL=index.production.js.map
