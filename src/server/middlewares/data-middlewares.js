'use strict';

const data = require('../data');

module.exports = {
    bookById(req, res, next) {
        data.bookById(req.params.bookId)
            .then(book => {
                if (!book) {
                    res.status(404).json({ message: 'No book with such id!' });
                    return;
                }

                req.data = req.data || {};
                req.data.book = book;
                next();
            })
            .catch(error => res.status(500).json({ message: 'It broke!(again)' }));
    },
};