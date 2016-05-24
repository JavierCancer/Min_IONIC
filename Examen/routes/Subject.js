var fs = require('fs');
module.exports = function (app) {
    var subject = require('../models/Subject.js');
    var student = require('../models/Student.js');

    addSubject = function (req, res, next) {
        if (!req.body.name) {
            res.status(400).send('Wrong data');
        }
        else {
            var newSuject = new subject({
                name: req.body.name
            });
            subject.findOne({name: req.body.name}).exec(function(err,data){
                console.log(data);
            if (data == undefined)
            newSuject.save();
            else
            res.status(409).send('La assignatura ya existe');
            if (err) res.send(err);
            res.json(newSuject);
        })}
    };
    addStudent = function (req, res, next) {
        if (!req.body.name) {
            res.status(400).send('Wrong data');
        }
        else {
            var newstudent = new student({
                name: req.body.name,
                address: req.body.address
            });
            newstudent.phones.push({name: req.body.place, tlf: req.body.tlf});
            subject.findOneAndUpdate({name: req.params.name}, {students: newstudent._id},function(err, assig) {
                if (assig == undefined)
                    res.status(404).send("No se existe la assignatura");
                else {
                    newstudent.save(function (err) {
                        if (err) res.status(500).send('Internal server error');
                    })
                    res.json(assig);
                }})
        }
    };

    getSubject = function (req, res) {
        var resultado = res;
        if (req.params.subject_id != undefined) {
            subject.findOne({_id: req.params.subject_id}).populate('students').exec(function(err,story){
                if(err) res.send(err);
                else res.json(story);
            })
        }
        else {
            subject.find({}, {name: 1}, function (err, subj) {
                if (subj.length == 0) {
                    resultado.status(404).send('No hay assignaturas');
                }
                else if (err) res.send(err);
                else res.json(subj);
            });
        }
    };
    app.post('/subject/:name', addStudent);
    app.get('/subject\?/(:subject_id)?', getSubject);
    app.post('/subject', addSubject);
};