const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            index: {
                unique: true,
            },
        },
        password: {type: String},
    }, 
    {timestamps: true}
);

userSchema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;

    // Delete fields
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.password;

    return obj;
});

Mongoose.model('User', userSchema);

module.exports = Mongoose.model('User');