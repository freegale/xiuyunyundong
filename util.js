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
  return tokens[0];
};
module.exports = util;
