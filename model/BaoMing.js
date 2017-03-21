"use strict"
const db = require('../dbconfig/connection');

module.exports = db.defineModel('baoming', {
    name: {
        type: db.STRING(128)
    },
    tel: db.STRING(512),
    remark: db.STRING(512),
    saishiid:db.STRING(64)
});
