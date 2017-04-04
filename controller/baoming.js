"use strict"
const APIError = require("../rest").APIError;
let model = require("../model");

let fn_create_baoming = async (ctx,next)=>{
  let BaoMing = model.BaoMing,
  baoming = ctx.request.body;
  console.log("将下列信息存储为报名："+JSON.stringify(baoming));
  baoming = await BaoMing.create({
      name: baoming.name.trim(),
      tel:baoming.tel.trim(),
      remark:baoming.remark.trim(),
      saishiid:baoming.saishiid.trim(),
      creator:baoming.openid.trim()
  });
  ctx.rest(baoming);
};

let fn_get_userlist = async(ctx,next)=>{
  let BaoMing = model.BaoMing,baoming;
  let saishiid = ctx.query.saishiid;
  console.log("saishiid",saishiid);
  let User = model.User;
  let user = null;
  let returnList = [];
  if(saishiid){
    baoming = await BaoMing.findAll({
      where:{
        saishiid:saishiid
      }
    });
    let userOpenIdArray = [];
    for(var i=0,j=baoming.length;i<j;i++){
      userOpenIdArray.push(baoming[i].dataValues.creator);
    }
    if(userOpenIdArray.length>0){
      user = await User.findAll({
        where:{
          openid:{
            $in:userOpenIdArray
          }
        }
      });

      if(user.length>0){
        for(var i=0,j=user.length;i<j;i++){
          returnList.push(user[i].dataValues);
        }
      }
    }
  }
  ctx.rest(JSON.stringify(returnList));
};

module.exports = {
  "POST /api/baoming":fn_create_baoming,
  "GET /api/baoming/userlist":fn_get_userlist
};
