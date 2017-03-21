"use strict"
const db = require('../dbconfig/connection');

module.exports = db.defineModel('saishi', {
    category:db.STRING(128),
    name: db.STRING(128),
    master: db.STRING(512),
    personlimit: db.STRING(32),
    fee: db.STRING(32),
    city: db.STRING(32),
    address: db.STRING(32),
    submaster: db.STRING(32),
    gamerule: db.STRING(32),
    grouprule: db.STRING(32)
});
