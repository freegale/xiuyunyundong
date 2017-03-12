"use strict"
const nunjucks = require("nunjucks");

let createEnv = (path,opts) => {
  let autoScape = opts.autoScope||true,
      noCache = opts.noCache||false,
      watch = opts.watch||false,
      throwOnUndefined = opts.throwOnUndefined||false,
      env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path||'view',{
          noCache:noCache,
          watch:watch
        }),{
          autoScape:autoScape,
          throwOnUndefined,throwOnUndefined
        }
      );
  if(opts.filters){
    for(let f in opts.filters){
      env.addFilter(f,opts.filters[f]);
    }
  }
  return env;
}

let templating = (path,opts)=>{
  var path = path||"view";
  var opts = opts||{};
  var env = createEnv(path,opts);
  return async (ctx,next) => {
    ctx.render = (view,model)=>{
      ctx.response.type = "text/html";
      ctx.response.body = env.render(view,Object.assign({},ctx.state||{},model||{}));
    }
    await next();
  }
}

module.exports = templating;
