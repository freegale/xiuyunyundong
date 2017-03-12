"use strict"
const APIError = require("../rest").APIError;
let model = require("../model");

/**
 * [fn_create_saishi 创建赛事]
 * @method fn_create_saishi
 * @param  {[type]}         ctx  [koa上下文]
 * @param  {Function}       next [下一个Promise对象]
 * @return {Promise}             [koa的Promise对象]
 */
let fn_create_saishi_page = async (ctx,next)=>{
  ctx.render("saishiluru.html",{
    title:"赛事录入",
    saishi_name:"赛事名称",
    saishi_description:"赛事说明",
    saishi_save_btn_text:"保存赛事"
  })
};

let fn_create_saishi = async (ctx,next)=>{
  var saishi=ctx.request.body,saishi;
  if(!saishi.name||!saishi.name.trim()){
    throw new APIError("invalid_input","missing saishi name!");
  }

  if(!saishi.description||!saishi.description){
    throw new APIError("invalid_input","missing saishi description!");
  }

  let SaiShi = model.SaiShi;
  await (async () => {
      saishi = await SaiShi.create({
          name: saishi.name.trim(),
          description:saishi.description.trim()
      });
      console.log('created: ' + JSON.stringify(saishi));
  })();

  ctx.rest(saishi);
};

let fn_get_saishi = async (ctx,next)=>{

};

let fn_update_saishi = async(ctx,next)=>{

};

let fn_delete_saishi = async(ctx,next)=>{

}

module.exports = {
  "GET /api/saishi/createpage":fn_create_saishi_page,
  "POST /api/saishi":fn_create_saishi,
  "GET /api/saishi":fn_get_saishi,
  "PUT /api/saishi":fn_update_saishi,
  "DELETE /api/saishi":fn_delete_saishi
};
