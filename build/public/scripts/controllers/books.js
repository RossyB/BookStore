/* globals $ alertify*/
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

window.controllers = window.controllers || {};
var templates = window.templates;
var booksdata = window.booksdata;

(function (scope) {

    var allBooks = function allBooks() {
        $("#myCarousel").addClass("hidden");
        $("#main-image").removeClass("hidden");
        Promise.all([booksdata.getBooks(0, 20, "addedAt", -1), templates.get("books")]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                resp = _ref2[0],
                templateFunc = _ref2[1];

            console.log(resp);
            var books = resp;
            var intlData = {
                "locales": "en-US"
            };
            console.log(books);
            var html = templateFunc({ books: books }, {
                data: { intl: intlData }
            });

            $("#page-placeholder").html(html);

            $(document).ready(function () {
                $(".book-container").addClass("invisible").viewportChecker({
                    classToAdd: "animated zoomIn",
                    classToRemove: "invisible"
                });
                return false;
            });
        });
    };

    $("#btn-add-book-modal").on("click", function (ev) {
        debugger;
        var book = {
            title: $("#tb-book-title").val(),
            author: $("#tb-book-author").val(),
            description: $("textarea#ta-description").val(),
            price: $("#tb-book-price").val(),
            bookImageUrl: $("#tb-book-image-url").val(),
            category: $("#tb-book-category").val()

        };
        console.log(book);

        booksdata.addBook(book).then(function (resp) {
            console.log(resp);
            if (resp.success) {
                alertify.notify("" + resp.message, 'success', 3, function () {
                    console.log('dismissed');
                });
                $('#add-book-modal-form').modal('hide');
            }
        }).catch(function (error) {
            if (error.status == 401) {
                alertify.notify("You are not autorized! Please login!", 'error', 3, function () {
                    console.log('dismissed');
                });
                console.log(error);
                $('#add-book-modal-form').modal('hide');
            }
            if (error.status == 400) {
                alertify.notify("The book must have a title!", 'error', 3, function () {
                    console.log('dismissed');
                });
                console.log(error);
            }
        });
        document.location = "#/books";
        ev.preventDefault();
        return false;
    });

    scope.books = {
        allBooks: allBooks
    };
})(window.controllers);