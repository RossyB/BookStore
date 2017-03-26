/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const booksdata = window.booksdata;

((scope) => {
    const allBooks = () => {
        Promise.all([booksdata.getBooks(0, 20), templates.get("books")])
            .then(([resp, templateFunc]) => {
                debugger;
                console.log(resp);
                const books = resp;

                var intlData = {
                    "locales": "en-US"
                };
                console.log(books)
                let html = templateFunc({ books }, {
                    data: { intl: intlData }
                });
                $("#page-placeholder").html(html);
            });
    }

    scope.books = {
        allBooks
    };

})(window.controllers)