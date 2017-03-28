'use strict';

const User = require('../models/User'),
    Book = require('../models/Book'),
    mongoose = require('mongoose'),
    hashing = require('../utils/hashing');

// the next 3 lines are mongoose configuration and should be extracted in a config file
const CONNECTION_URL = 'mongodb://localhost:27017/book-store';

mongoose.connect(CONNECTION_URL);
mongoose.Promise = global.Promise;

module.exports = {
    getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find((err, users) => {
                if (err) {
                    return reject(err);
                }

                return resolve(users);
            });
        });
    },
    findById(userId) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });

    },
    findByUsername(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    },
    createUser(user) {

        // hash the password so it isn't stored in plain text
        const salt = hashing.generateSalt(),
            passHash = hashing.hashPassword(salt, user.password);

        const newUser = {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            imageUrl: user.imageUrl,
            email: user.email,
            roles: user.roles,
            salt,
            passHash
        };

        return new Promise((resolve, reject) => {
            User.create(newUser, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user);
            });
        });
    },
    createBook(book, owner) {
        const newBook = {
            title: book.title,
            author: book.author,
            description: book.description,
            price: book.price,
            bookImageUrl: book.bookImageUrl,
            category: book.category,
            addedAt: Date.now()
        };

        if (owner) {
            newBook.owner = {
                username: owner.username,
                userImageUrl: owner.imageUrl,
                userRoles: owner.roles
            }
        }

        return new Promise((resolve, reject) => {
            Book.create(newBook, (err, book) => {
                if (err) {
                    return reject(err);
                }

                return resolve(book);
            });
        });
    },

    getAllBooks() {
        return new Promise((resolve, reject) => {
            Book.find({}).sort({ addedAt: -1 }).exec((err, books) => {
                if (err) {
                    return reject(err);
                }

                return resolve(books);
            });
        });
    },
    getPagedBooks(pageNumber, pageSize, prop, arrange) {
        return new Promise((resolve, reject) => {
            Book.find({}).sort([
                [prop, arrange]
            ]).skip(pageNumber * pageSize).limit(pageSize).exec((err, books) => {
                if (err) {
                    return reject(err);
                }

                return resolve(books);
            });
        });
    },
    bookById(bookId) {
        return new Promise((resolve, reject) => {
            Book.findById(bookId, (err, book) => {
                if (err) {
                    return reject(err);
                }

                return resolve(book);
            });
        });
    },
    updateBookById(bookId, updateOptions) {
        return new Promise((resolve, reject) => {
            Book.findByIdAndUpdate(bookId, updateOptions, (err, book) => {
                if (err) {
                    return reject(err);
                }
                return resolve(book);
            });
        })
    },
    removeBookById(bookId) {
        return new Promise((resolve, reject) => {
            Book.find({ '_id': bookId }).remove().exec();
            resolve();
        });
    },
    createCommentForBook(bookId, comment, author) {

        const newComment = {
            content: comment.content
        };

        if (author) {
            newComment.author = {
                username: author.username
            };
        }

        return Book.findByIdAndUpdate(bookId, {
            $push: { comments: newComment }
        });
    }
};