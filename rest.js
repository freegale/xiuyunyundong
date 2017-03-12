"use strict"
module.exports = {
  APIError:function(code,message){
    this.code = code||"internal:unknown_error";
    this.message = message||"";
  },
  restify:(pathPrefix)=>{
    pathPrefix = pathPrefix||"/api/";
    return async(ctx,next)=>{
      // 如果是rest请求，就为ctx添加rest方法，然后继续执行
      if(ctx.request.path.startsWith(pathPrefix)){
        console.log("Process API ${ctx.request.method} $(ctx.request.url)...");
        ctx.rest = (data)=>{
          ctx.response.type = "application/json";
          ctx.response.body = data;
        }
        try{
          await next();
        }catch(e){
          console.log("Processing API Error...");
          ctx.response.status = 400;
          ctx.response.type = "application/json";
          ctx.response.body = {
            code:e.code||"internal:unknown_error",
            message:e.message||""
          }
        }
      }
      // 如果不是rest请求，直接执行下一个操作
      else{
        await next();
      }
    }
  }
};
