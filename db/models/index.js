'use strict';

const Student = require('./Student')
const Campus = require('./Campus')

Campus.hasMany(Student, {
	onDelete: 'cascade',
	hooks: true
})

Student.belongsTo(Campus)

module.exports = {Student, Campus}
