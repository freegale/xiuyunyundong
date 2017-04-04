"use strict"
const db = require('../dbconfig/connection');
module.exports = db.defineModel('user', {
    openid: {
        type: db.STRING(100),
        unique: true
    },
    tel: db.STRING(20),
    name: db.STRING(1),
    sex: db.STRING(400),
    nickname:db.STRING(200),
    headimgurl: db.STRING(400),
});
