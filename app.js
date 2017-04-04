"use strict"

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const serve = require('koa-static');
const Koa = require('koa');

const url = require("url");

const Cookies = require("cookies");

const rest = require("./rest");

// 创建body解析对象
const bodyparser = require("koa-bodyparser");

// 引入controller
const controller = require("./controller");

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const fs = require("mz/fs");

const schedule = require("node-schedule");

const weixinauthenfilter = require("./filter/weixinauthenfilter");
const weixinmenufilter= require("./filter/weixinmenufilter");
const scheduleJob = require("./schedule/weixintokenupdate");
const weixinusersavefilter = require("./filter/weixinusersavefilter");
/*
在生产环境中，静态资源通常都是由node之前的反向代理服务器提供的；
而在开发环境中，通常不专门架设反向代理服务器，所以需要开发者自行处理静态资源
*/

let templating = require("./controller/templating");


const isProduction = process.env.NODE_ENV === 'production';

if (! isProduction) {
    let staticFiles = require('./controller/static_files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyparser());

// 处理日志记录
app.use(async (ctx,next) => {
  console.log(`Processing ${ctx.request.method} ${ctx.request.url} with body:${JSON.stringify(ctx.request.body)}`);
  var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
  // await next();
});

// request processing filter chain
app.use(weixinauthenfilter);  // 授权
app.use(weixinmenufilter);  //  页面授权
app.use(weixinusersavefilter);
// $ GET /package.json
app.use(serve('.'));

/*
// 聊天室应用——处理用户信息
app.use(async (ctx,next)=>{
  ctx.state.user = parseUser(ctx.cookies.get("name")||"");
  await next();
});
*/
app.use(rest.restify());
app.use(templating());

app.use(controller());

// 在端口3000监听:
let server = app.listen(80);

/*
// 创建web socket server
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

function parseUser(obj){
  if(!obj){
    return;
  }
  console.log("try parse: "+obj);
  let s = "";
  if(typeof obj === "string"){
    s = obj;
  }else if(obj.headers){
    let cookies = new Cookies(obj,null);
    s = cookies.get("name");
  }
  if(s){
    try{
      let user = JSON.parse(Buffer.from(s,'base64').toString());
      console.log(`User: ${user.name}, ID: ${user.id}`);
      return user;
    }catch(e){

    }
  }
}
*/
/*
// 创建websocket服務器
function createWebSocketServer(server,onConnection,onMessage,onClose,onError){
  let wss = new WebSocketServer({
    server:server
  });

  wss.broadcase = function(data){
    wss.clients.forEach(function(client){
      client.send(data);
    });
  };

  onConnection = onConnection||function(){
    console.log("[WebSocket] connected.");
  };

  onMessage = onMessage || function(msg){
    console.log("[WebSocket] message received: "+msg);
  };

  onClose = onClose || function(code,message){
    console.log(`[WebSocket] closed:${code}-${message}`);
  };

  onError = onError || function(err){
    console.log("[WebSocket] error:"+err);
  };

  wss.on("connection",function(ws){
    let location = url.parse(ws.upgradeReq.url,true);
    console.log("[WebSocketServer] connection: "+location.href);
    ws.on("close",onClose);
    ws.on("message",onMessage);
    ws.on("error",onError);

    if(location.pathname!=="/ws/chat"){
      ws.cloes(4000,"invalid url");
    }

    // check user
    let user = parseUser(ws.upgradeReq);
    if(!user){
      ws.close(4001,"invalid user");
    }
    ws.user = user;
    ws.wss = wss;
    onConnection.apply(ws);
  });
  console.log("WebSocketServer was attached");
  return wss;
}


var onClose= function(){
  let user = this.user;
  let msg = createMessage("left",user,`${user.name} has left.`);
  this.wss.broadcase(msg);
};

var onMessage = function(message){
  console.log(message);
  if(message&&message.trim()){
    let msg = createMessage("chat",this.user,message.trim());
    this.wss.broadcase(msg);
  }
};

var messageIndex = 0;
var createMessage = function(type,user,data){
  messageIndex ++;
  return JSON.stringify({
    id:messageIndex,
    type:type,
    user:user,
    data:data
  });
}

var onConnection = function(ws){
  let user = this.user;
  let msg = createMessage("join",user,`${user.name} joined`);
  this.wss.broadcase(msg);

  let users = this.wss.clients.map(function(client){
    return client.user;
  });

  this.send(createMessage("list",user,users));
};

app.wss = createWebSocketServer(server,onConnection,onMessage,onClose);
*/
console.log('app started at port 80...');
