/* globals $ */
"use strict";

const http = window.http;
const booksdata = window.booksdata;
const templates = window.templates;

((scope) => {
    const $pagePlaceholder = $("#page-placeholder");

    const initial = () => {
        Promise.all([booksdata.getBooks(), templates.getPage("home")])
            .then(([resp, templateFunc]) => {
                const books = resp;
                let html = templateFunc({ books });

                $pagePlaceholder.html(html);

            });
    };

    scope.home = {
        initial
    };
})(window.controllers = window.controllers || {});