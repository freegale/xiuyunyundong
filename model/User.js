"use strict"
const db = require('../dbconfig/connection');

module.exports = db.defineModel('user', {
    name: {
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(100)
});
