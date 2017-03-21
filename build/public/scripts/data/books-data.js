"use strict";

/* globals  */

var http = window.http;

(function (scope) {

    scope.booksdata = {
        getBooks: function getBooks() {
            return http.getJSON("/api/books");
        },
        getBookById: function getBookById(id) {
            return http.getJSON("/api/books/" + id);
        },
        addBook: function addBook(book) {
            return http.postJSON("/api/books", book);
        },
        addComment: function addComment(bookId, comment) {
            return http.putJSON("/api/books/" + bookId + "/comments", comment);
        }
    };
})(window);