'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
var Campus = require('./Campus');


module.exports = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
    	type: Sequelize.STRING,
    	allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    defaultScope: {
        include: [
            { model: Campus }
        ]
    }
});