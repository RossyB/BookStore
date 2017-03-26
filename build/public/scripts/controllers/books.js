/* globals $ alertify*/
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

window.controllers = window.controllers || {};
var templates = window.templates;
var booksdata = window.booksdata;

(function (scope) {
    var allBooks = function allBooks() {
        Promise.all([booksdata.getBooks(0, 20), templates.get("books")]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                resp = _ref2[0],
                templateFunc = _ref2[1];

            debugger;
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
        });
    };

    scope.books = {
        allBooks: allBooks
    };
})(window.controllers);