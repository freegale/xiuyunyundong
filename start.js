"use strict"
const register = require("babel-core/register");

const model = require("./model");
register({
  presets:['stage-3']
});

require("./app.js");
