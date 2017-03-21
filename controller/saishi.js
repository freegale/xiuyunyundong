"use strict"
const APIError = require("../rest").APIError;
let model = require("../model");
let wechatapi = require("../api/wechatapi");

/**
 * [fn_create_saishi 赛事申报]
 * @method fn_create_saishi
 * @param  {[type]}         ctx  [上下文]
 * @param  {Function}       next [下一个中间件]
 * @return {Promise}             [返回一个同步对象]
 */
let fn_create_saishi = async (ctx,next)=>{
  var saishi=ctx.request.body,saishi;
  let SaiShi = model.SaiShi;
  console.log('creating: ' + ctx.cookies.get("useropenid"));

  // 获取用户的openid

  await SaiShi.create({
      category:saishi.category,
      name:saishi.name,
      master:saishi.master,
      starttime:saishi.starttime,
      personlimit:saishi.personlimit,
      fee:saishi.fee,
      city:saishi.city,
      address:saishi.address,
      submaster:saishi.submaster,
      gamerule:saishi.gamerule,
      grouprule:saishi.grouprule,
      creator:ctx.cookies.get("useropenid")
  });
  console.log('created: ' + JSON.stringify(saishi));
  ctx.rest(saishi);
};

let fn_create_baoming = async (ctx,next)=>{

  var baoming=ctx.request.body.baoming;
  if(!baoming.name||!baoming.name.trim()){
    throw new APIError("invalid_input","missing baoming name!");
  }

  if(!baoming.phone||!baoming.phone){
    throw new APIError("invalid_input","missing baoming description!");
  }

  let BaoMing = model.BaoMing;
  await (async () => {
      baoming = await BaoMing.create({
          name: baoming.name.trim(),
          phone:baoming.phone.trim(),
          remark:baoming.remark.trim()
      });
      console.log('created: ' + JSON.stringify(baoming));
  })();

  ctx.rest(baoming);
};

/**
 * 根据ID获取赛事详情,如果ID为空，就获取赛事列表
 * @method fn_get_saishi
 * @param  {[type]}      ctx  上下文呢
 * @param  {Function}    next 下一个中间价
 * @return {Promise}
 */
let fn_get_saishi = async (ctx,next)=>{
  var id = ctx.params.id;
  var saishis = null;
  let SaiShi = model.SaiShi;
  if(id){
    saishis = await SaiShi.findAll({
      where:{
        id:id
      }
    });
  }else{
    saishis = await SaiShi.findAll();
  }
  ctx.rest(saishis);
};

// let fn_update_saishi = async(ctx,next)=>{
//
// };

let fn_delete_saishi = async(ctx,next)=>{

}

let fn_get_saishi_detail = async(ctx,next)=>{
  var id = ctx.params.id;
  var saishis = null;
  let SaiShi = model.SaiShi;
  if(id){
    saishis = await SaiShi.findAll({
      where:{
        id:id
      }
    });
    if(saishis.length>0){
      console.dir(saishis[0]);
      ctx.render('saishi_detail.html', saishis[0].dataValues);
    }else{
      next();
    }
  }

}

module.exports = {
  "POST /api/saishi":fn_create_saishi,
  "GET /api/saishi":fn_get_saishi,
  "GET /api/saishi/:id":fn_get_saishi_detail,
  // "PUT /api/saishi":fn_update_saishi,
  "DELETE /api/saishi":fn_delete_saishi
};
