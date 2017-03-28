'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    },
    bookImageUrl: {
        type: String
    },
    category: {
        type: String
    },
    owner: {
        username: String,
        userImageUrl: String,
        userRoles: [String]
    },
    addedAt: {
        type: Date
    },
    comments: [{
        content: {
            type: String,
            required: true,
            minlength: 5
        },
        author: {
            username: String
        }
    }]
});

mongoose.model('Book', bookSchema);

module.exports = mongoose.model('Book');