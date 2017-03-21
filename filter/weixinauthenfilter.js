"use strict"
let crypto = require("crypto");
let util = require("../util");
const wexinapi = require("../api/wechatapi");
const model = require("../model");

let sha1 = (str)=>{
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

let processAuthen = async (ctx,next)=> {
  var params = ctx.query;
  console.log("请求信息："+JSON.stringify(ctx.request));
  console.log("参数信息："+JSON.stringify(ctx.query));
  var openid = params.openid;
  var signature = params.signature;
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
  }else if(openid){
    console.log("获取用户OpenId成功："+openid);
    ctx.cookies.set("useropenid",openid);
    // wexinapi.getUser(openid,async function(err,result){
    //   console.log("获取用户信息成功："+JSON.stringify(result));
    //   // 保存用户信息
    //   var user = model.User;
    //   await user.create({
    //     name:result.openid,
    //     password:""
    //   });
    // });
  }else{
    await next();
  }
};
module.exports = processAuthen;
