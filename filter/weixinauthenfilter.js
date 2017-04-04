"use strict"
let crypto = require("crypto");
let util = require("../util");
const wexinapi = require("../api/wechatapi");
const model = require("../model");

//
let sha1 = (str)=>{
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}
// 校验微信网页授权，一般仅试用1次
let processAuthen = async (ctx,next)=> {
  var params = ctx.query;
  var openid = params.openid;
  var signature = params.signature;
  console.log("请求路径："+JSON.stringify(ctx.protocol+"://"+ctx.host+"/"+ctx.url));
  if(signature&!openid){
    var echostr = params.echostr;
    var timestamp = params.timestamp;
    var nonce = params.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = util.getToken();
    console.log("handle get token success:"+oriArray[2]);
    oriArray.sort();
    var original = oriArray.join("");
    console.log("original str :"+original);
    console.log("signature :"+signature);
    var scyptoString = sha1(original);
    if(signature = scyptoString){
      console.log("echostr send back:"+echostr);
      ctx.response.body = echostr;
      console.log("Confirm and send echo back!");
    }else{
      ctx.response.body = false;
      console.log("Failed!");
    }
  }else{
    await next();
  }
};
module.exports = processAuthen;
