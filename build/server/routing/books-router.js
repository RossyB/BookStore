'use strict';

const router = require('express').Router(),
    createBooksController = require('../controller/books-controller'),
    data = require('../data'),
    auth = require('../middlewares/auth-middleware'),
    dataMiddleware = require('../middlewares/data-middlewares');

const booksController = createBooksController(data);

module.exports = app => {
    router
        .get('/api/books', booksController.getBooks)
        .post('/api/books', auth.isAuthenticated, booksController.createBook)
        .get('/api/books/:bookId', dataMiddleware.bookById, booksController.bookById)
        .put('/api/books/:bookId', auth.isInRole('admin'), booksController.updateBook)
        .delete('/api/books/:bookId', auth.isInRole('admin'), booksController.removeBook)
        .put('/api/books/:bookId/comments', auth.isAuthenticated, dataMiddleware.bookById, booksController.createComment)


    app.use(router);
}