"use strict"

const model = require('../model.js');

let initdb = async () => {
    await model.sync();
};

module.exports=initdb;
