"use strict"
const WechatAPI = require("wechat-api");

var appid="wx2eb32ceee035b52f";
var secret = "94ea337e2f5e6cd45ccc0b135c96a4df";

let weixinapi = new WechatAPI(appid, secret);

weixinapi.getCurrentUser = async (code)=>{
  var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";
  var request = require('sync-request');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var resData;
  var results = undefined;

  try {
      // 请求过程、返回
      resData = request('GET',url);
      if (resData.statusCode == 200){
          results = JSON.parse(resData.getBody('utf8'));
          if(results.errcode){
            console.log("请求出错:"+results.errmsg);
          }else{
            // 获取当前登录用户的信息成功
            return results.openid;
          }
      }else{
          console.log('请求出错:GET request Status is not Fine!');
      }
  } catch(e) {
      console.log('请求出错:'+e.stack);
  }
};
module.exports = weixinapi;
