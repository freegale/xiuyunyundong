"use strict"
let crypto = require("crypto");
let util = require("../util");
const wexinapi = require("../api/wechatapi");

// 根据微信服务器传来的code获取微信用户openid
let processAuthen = async (ctx,next)=> {
  var params = ctx.query;
  if(ctx.path.indexOf("/api")>=0){
    await next();
  }else if(ctx.path.indexOf("/view")!=-1&&ctx.query.code){
    console.log("重定向完成，当前请求为:"+JSON.stringify(ctx.request));
    ctx.currentUserOpenId = await wexinapi.getCurrentUser(ctx.query.code);
    console.log("已经获取当前用户的openid信息:"+JSON.stringify(ctx.currentUserOpenId));
    await next();
  }else{
    var redirectUrl = ctx.protocol+"://"+ctx.host+ctx.path;
    console.log("用户请求路径为:"+redirectUrl+",即将跳转到微信认证页面...");
    var response = ctx.response;
    response.status = 302;
    response.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2eb32ceee035b52f&redirect_uri='+redirectUrl+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
  }
}
module.exports = processAuthen;
