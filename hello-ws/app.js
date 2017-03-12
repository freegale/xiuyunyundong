"use strict"
const WebSocket = require("ws");

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
  port:3000
});
