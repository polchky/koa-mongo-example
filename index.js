const Koa = require('koa');
const Router = require('koa-router');
const Mongoose = require('mongoose');   


// Create the Koa app
const app = new Koa();

const router = new Router();

// Options to use with mongoose (mainly to avoid deprecacy warnings)
const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
};
// Connect to the MongoDB database
Mongoose.connect('mongodb://localhost:27017/koa-mongo-example', mongooseOptions);

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

Mongoose.model('User', userSchema);
const User = Mongoose.model('User');


router.get('/callbacks', (ctx) => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, users) => {
            if (err) {/* Manage error... */}
            User.find({}, (err, users) => {
                if (err) {/* Manage error... */}
                User.find({}, (err, users) => {
                    if (err) {/* Manage error... */}
                    User.find({}, (err, users) => {
                        if (err) {/* Manage error... */}
                        ctx.body = users;
                        resolve();
                    });
                });
            });
        });
    });
    
});

router.get('/promises', (ctx) => {
    return User.find()
        .then((users) => {
            return User.find({}).exec();
        }).then((users) => {
            return User.find({}).exec();
        }).then((users) => {
            return User.find({}).exec();
        }).then((users) => {
            ctx.body = users;
        }).catch((err) => {
            /* Manage error... */
        })
});

router.get('/async', async (ctx) => {
    try{
        let users = await User.find({});
        users = await User.find({});
        users = await User.find({});
        users = await User.find({});
        ctx.body = users;
    } catch (err) {
        /* Manage error... */
    }
});

app
    .use(router.routes())
    .listen(3000);
