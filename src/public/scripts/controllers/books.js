/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}
const templates = window.templates;
const booksdata = window.booksdata;

((scope) => {

    const allBooks = () => {
        $("#myCarousel").addClass("hidden");
        $("#main-image").removeClass("hidden");
        Promise.all([booksdata.getBooks(0, 20, "addedAt", -1), templates.get("books")])
            .then(([resp, templateFunc]) => {
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

                $(document).ready(function() {
                    $(".book-container").addClass("invisible").viewportChecker({
                        classToAdd: "animated zoomIn",
                        classToRemove: "invisible"
                    });
                    return false;
                });
            });
    }

    $("#btn-add-book-modal").on("click", (ev) => {
        debugger;
        let book = {
            title: $("#tb-book-title").val(),
            author: $("#tb-book-author").val(),
            description: $("textarea#ta-description").val(),
            price: $("#tb-book-price").val(),
            bookImageUrl: $("#tb-book-image-url").val(),
            category: $("#tb-book-category").val()

        }
        console.log(book);

        booksdata.addBook(book)
            .then((resp) => {
                console.log(resp);
                if (resp.success) {
                    alertify.notify(`${resp.message}`, 'success', 3, function() { console.log('dismissed'); });
                    $('#add-book-modal-form').modal('hide');
                }
            })
            .catch(error => {
                if (error.status == 401) {
                    alertify.notify(`You are not autorized! Please login!`, 'error', 3, function() { console.log('dismissed'); });
                    console.log(error);
                    $('#add-book-modal-form').modal('hide');
                }
                if (error.status == 400) {
                    alertify.notify(`The book must have a title!`, 'error', 3, function() { console.log('dismissed'); });
                    console.log(error);
                }
            });
        document.location = "#/books";
        ev.preventDefault();
        return false;
    });

    scope.books = {
        allBooks
    };

})(window.controllers)