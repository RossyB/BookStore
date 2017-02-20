'use strict';

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        unique: true
    },
    books: []
});

mongoose.model('Category', categorySchema);

module.exports = mongoose.model('Category');