/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const booksdata = window.booksdata;

((scope) => {
    const bookById = (params) => {
        $("#myCarousel").addClass("hidden");
        $("#main-image").removeClass("hidden");
        var id = params.id;
        console.log(id);
        Promise.all([booksdata.getBookById(id), templates.get("book")])
            .then(([resp, templateFunc]) => {
                console.log(resp);
                const book = resp;
                var intlData = {
                    "locales": "en-US"
                };
                console.log(book)
                let html = templateFunc(book, {
                    data: { intl: intlData }
                });
                $("#page-placeholder").html(html);
            });
    }

    scope.book = {
        bookById
    };

})(window.controllers)