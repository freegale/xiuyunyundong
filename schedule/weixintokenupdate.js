"use strict"
let schedule = require("node-schedule");
let model = require("../model");
let weixinapi = require("../api/wechatapi");

let schedulejob = async ()=>{
  console.log("请求微信服务器获取Token!");
  await weixinapi.getLatestToken(async function(err,token){
    if(err){
      console.log("从微信服务器获取token失败:"+JSON.stringify(err));
    }else{
      console.log("从微信服务器获取token成功:"+JSON.stringify(token));
      let tokens = null;
      let myToken = model.Token;
      tokens = await myToken.findAll();
      console.log("get Token from DB:"+JSON.stringify(tokens[0]));

      if(!tokens||tokens.length===0){
        console.log("start create token!");

        await myToken.create({
          token:token.accessToken,
          expiretime:token.expireTime
        });

        console.log("create token complete!");
      }else{
        console.log("start update token!");
        await myToken.update({
          token:token.accessToken,
          expiretime:token.expireTime
        },{
          where:{
            id:tokens[0].id
          }
        });
        console.log("update token complete!");
      }
    }
  });
  console.log("请求微信服务器获取Token完成！");
};

console.log("即将启动定时任务...");
var rule = new schedule.RecurrenceRule();
rule.minute = 30;
var job = schedule.scheduleJob(rule,schedulejob);
console.log("定时任务启动完成。每小时第30分钟将执行微信token更新任务！");
/**
 * [exports 返回值是schedole job本身]
 * @type {[schedule.scheduleJob]}
 */
module.exports = job;
