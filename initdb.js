"use strict"
const register = require("babel-core/register");
register({
  presets:['stage-3']
});
console.log('start init db');

var initdb = require("./dbconfig/initdb");
initdb();

console.log('init db ok.');
