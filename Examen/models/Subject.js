var mongoose = require('mongoose');
Schema = mongoose.Schema;
var Student = require('../models/Student.js')
var Student = mongoose.model('Student');

var subjectSchema = new Schema({
    name: {type: String},
    students: [{type : mongoose.Schema.Types.ObjectId, ref:"Student"}]
});

module.exports = mongoose.model('Subject', subjectSchema);