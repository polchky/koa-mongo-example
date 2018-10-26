const Mongoose = require('mongoose');

const bookSchema = new Mongoose.Schema(
    {
        title: {type: String},
        author: {type: Mongoose.Schema.Types.ObjectId, ref: 'Author'}
    }, 
    {timestamps: true}
);

Mongoose.model('Book', bookSchema);

module.exports = Mongoose.model('Book');