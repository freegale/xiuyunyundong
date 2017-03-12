const model = require("./model");
const wexinapi = require("./api/wechatapi");
let util = {};
/**
 * [getToken 获取用户合法Toke]
 * @method getToken
 * @param  {[]} async []
 * @return {[model.Token]}    [返回Token对象]
 */
util.getToken = async ()=> {
  let tokens = null;
  let myToken = model.Token;
  tokens = await myToken.findAll();
  if(!tokens||tokens.length===0){
    console.log("手动调用更新Token");
    wexinapi.getLatestToken(async function(err,token){
      if(err){
        console.log("从微信服务器获取token失败:"+JSON.stringify(err));
      }else{
        console.log("从微信服务器获取token成功:"+JSON.stringify(token));
        let tokens = null;
        let myToken = model.Token;

        console.log("start create token!");
        await myToken.create({
          token:token.accessToken,
          expiretime:token.expireTime
        });
        console.log("create token complete!");
      }
    })
  }else{
    return tokens[0];
  }
};
module.exports = util;
