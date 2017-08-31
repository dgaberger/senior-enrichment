const router = require('express').Router();
const { Student } = require('../../db/models');

module.exports = router;

router.get('/', function(req, res, next) {
    Student.findAll()
        .then(students => res.json(students))
        .catch(next);
});

router.get('/:studentId', function(req, res, next) {
    Student.findById(req.params.studentId)
        .then(student => res.json(student))
        .catch(next);
});

router.post('/', function(req, res, next) {
    Student.create(req.body)
        .then(student => res.json(student))
        .catch(next);
});

router.put('/:studentId', function(req, res, next) {
    const studentId = req.params.studentId;

    Student.findById(studentId)
        .then(student => {
            student.update(req.body)
            res.json(student)
        })
        .catch(next);
});

router.delete('/:studentId', function(req, res, next) {
    const id = req.params.studentId;

    Student.destroy({ where: { id } })
        .then(() => res.status(204).end())
        .catch(next);
});