"use strict"
const db = require('../dbconfig/connection');

module.exports = db.defineModel('saishi', {
    name: {
        type: db.STRING(128)
    },
    description: db.STRING(512)
});
