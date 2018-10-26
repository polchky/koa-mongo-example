const Mongoose = require('mongoose');

const authorSchema = new Mongoose.Schema(
    {
        firstname: {type: String},
        lastname: {type: String}
    }, 
    {timestamps: true}
);

Mongoose.model('Author', authorSchema);

module.exports = Mongoose.model('Author');