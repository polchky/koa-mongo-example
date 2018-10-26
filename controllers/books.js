const Book = require('../models/book');


let controller = {
    create: async (ctx) => {
        const book = new Book(ctx.request.body);
        await book.save();
        ctx.body = todo;
    }, 

    read: (ctx) => {

    },
    
    update: (ctx) => {

    },
    
    delete: (ctx) => {

    },
    
    list: (ctx) => {

    },
    
    clear: (ctx) => {

    }
}

module.exports = controller;