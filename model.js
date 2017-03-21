"use strict"
const fs = require('fs');
const db = require('./dbconfig/connection');

let files = fs.readdirSync(__dirname + '/model');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/model/' + f);
}

module.exports.sync = () => {
    db.sync();
};

module.exports.getModel = (modelname)=>{
    return module.exports[modelname];
}
