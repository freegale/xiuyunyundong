"use strict"
const db = require('../dbconfig/connection');

module.exports = db.defineModel('token', {
    token: {
        type: db.STRING(512)
    },
    expiretime: db.BIGINT
});
