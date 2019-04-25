const Mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

const userSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        password: {
            type: String,
            required: true,
        },
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

userSchema.plugin(AutoIncrement.plugin, {
    model: 'User',
    startAt: 1,
});

Mongoose.model('User', userSchema);

module.exports = Mongoose.model('User');