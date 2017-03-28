"use strict";

/* globals $ Navigo controllers */

$(function () {

    var root = null;
    var useHash = true;
    var usersdata = window.usersdata;

    var router = new Navigo(root, useHash);

    // routing
    router.on("books", controllers.books.allBooks).on("books/:id", controllers.book.bookById).on("home", controllers.home.initial).on("*", controllers.home.initial).resolve();

    usersdata.isLoggedIn().then(function (isLoggedIn) {
        if (isLoggedIn) {
            $(document.body).addClass("logged-in");
        }
    });
});