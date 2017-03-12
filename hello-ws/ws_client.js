"use strict"
var ws = new WebSocket("ws://localhost:3000/ws/chat");

var vmMessageList = new Vue({
  el:"#message-list",
  data:{
    messages:[]
  }
});

var vmUserList = new Vue({
  el:"#user-list",
  data:{
    users:[]
  }
});

ws.onmessage = function(event){
  var data = event.data;
  console.log(data);
  var msg = JSON.parse(data);
  if(msg.type === "list"){
    vmUserList.users = msg.data;
  }else if(msg.type === "join"){
    addToUserList(vmUserList.users,msg.user);
    addMessage(vmMessageList.messages,msg);
  }else if(msg.type==="left"){
    removeFromUserList(vmUserList.users,msg.user);
    addMessage(vmMessageList.messages,msg);
  }else if(msg.type==="chat"){
    addMessage(vmMessageList.messages,msg);
  }
}
