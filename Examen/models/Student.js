var mongoose = require('mongoose');
Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: {type: String},
    address: {type: String},
    phones: [{
        name: String,
        tlf: String
    }]
});

module.exports = mongoose.model('Student', studentSchema);
