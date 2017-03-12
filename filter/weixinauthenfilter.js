"use strict"
let crypto = require("crypto");

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
  var signature = params.signature;
  if(signature){
    var echostr = params.echostr;
    var timestamp = params.timestamp;
    var nonce = params.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "SI3TlR_s654d5y9rVsRTz1JxvK7pdDWKiradC_-5iu8erDp02eDbhceTHj0b2sfDqK3-l2mDxAK0LICDIHtvcg8EpzoCDLpogaf9fLza9AcatIvesa5A4tMdObvSDqEeWNJcAEAEVR"
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
      let requestUrl = "https://"+ctx.request.header.host+ctx.request.url;
      let redirectUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4d339295eeeae22b&redirect_uri="+requestUrl+"&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect";
      console.log(redirectUrl);
      ctx.response.status = 301;
      ctx.response.redirect(redirectUrl);
      console.log("重定向完成！");
      await next();
  }

};
module.exports = processAuthen;
