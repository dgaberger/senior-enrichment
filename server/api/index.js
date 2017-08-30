'use strict'
const api = require('express').Router()
const db = require('../../db')

api.use('/campuses', require('./campuses'));
api.use('/students', require('./students'));

api.use((req, res, next) => {
  res.status(404).send('Not found');
});

module.exports = api