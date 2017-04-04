"use strict"
const APIError = require("../rest").APIError;
let model = require("../model");
let wechatapi = require("../api/wechatapi");

let fn_weixin_user_save = async (ctx,next)=>{
  var user_open_id = ctx.currentUserOpenId;

  var user = null;
  var User = model.User;

  if(user_open_id){
    user = await User.findAll({
      where:{
        openid:user_open_id
      }
    });
    // 如果没有用户，就将当前用户的信息存储到数据库
    if(user.length==0){
      wechatapi.getUser(user_open_id, async function(err,result){
        user = await User.create({
          openid:result.openid,
          tel:"",
          name:"",
          sex:result.sex,
          nickname:"nickname",
          headimgurl:result.headimgurl
        });
      });
    }
  }

  await next();

};
module.exports = fn_weixin_user_save;
