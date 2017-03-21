"use strict"
const APIError = require("../rest").APIError;
let model = require("../model");

let fn_create_baoming = async (ctx,next)=>{
  let BaoMing = model.BaoMing;

  console.log("get user openId:"+ctx.cookies.get("useropenid"));

  await (async () => {
      baoming = await BaoMing.create({
          name: baoming.name.trim(),
          tel:baoming.tel.trim(),
          remark:baoming.remark.trim(),
          saishiid:baoming.saishiid.trim(),
          creator:ctx.cookies.get("useropenid")
      });
  })();

  ctx.rest(baoming);
}

module.exports = {
  "POST /api/baoming":fn_create_baoming
};
