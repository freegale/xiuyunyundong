"use strict"
let fs = require("fs");

// 处理每个文件中的url属性，将属性值代表的async function添加到router中
let addMapping = (router,mapping)=>{
  for(let url in mapping){
    let path = "";
    if(url.startsWith("GET ")){
      path = url.substring(4);
      router.get(path,mapping[url]);
    }else if(url.startsWith("POST ")){
      path = url.substring(5);
      router.post(path,mapping[url]);
    }else if(url.startsWith("PUT ")){
      path = url.substring(4);
      router.put(path,mapping[url]);
    }else if(url.startsWith("DELETE ")){
      path = url.substring(7);
      router.del(path,mapping[url]);
    }
    console.log("path is: "+path+" and mapping to: "+mapping[url])
  }
}

// 读取目录中所有js代表的控制器，并将控制器添加到router中。
let addController = (router,dir) => {
  fs.readdirSync(__dirname+"/"+dir).filter((f)=>{
    return f.endsWith(".js");
  }).forEach((f)=>{
    let mapping = require(__dirname+"/"+dir+"/"+f);
    addMapping(router,mapping);
  });
}

module.exports = function(controllerdir){
  let controller_dir = controllerdir||"controller",
      router = require("koa-router")();
  addController(router,controller_dir);
  return router.routes();
};
