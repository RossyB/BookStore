"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* globals $ toastr alertify*/
window.controllers = window.controllers || {};

var templates = window.templates;
var booksdata = window.booksdata;
var usersdata = window.usersdata;

(function (scope) {
    var $pagePlaceholder = $("#page-placeholder");

    var initial = function initial() {
        Promise.all([booksdata.getBooks(), templates.get("home")]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                resp = _ref2[0],
                templateFunc = _ref2[1];

            var books = resp;
            console.log(books);
            var html = templateFunc({ books: books });
            $pagePlaceholder.html(html);
        });
    };

    $("#btn-login").on("click", function (ev) {
        $("#tb-username").val = "";
        $("#tb-password").val = "";
        var user = {
            username: $("#tb-username").val(),
            password: $("#tb-password").val()
        };

        usersdata.login(user).then(function (resp) {
            if (!resp.success) {
                alertify.notify(resp.message, 'error', 3, function () {
                    console.log('dismissed');
                });
            } else {
                alertify.notify(resp.message + " Hello, " + resp.username, 'success', 3, function () {
                    console.log('dismissed');
                });
                $(document.body).addClass("logged-in");
                $("#login-nav").addClass("hidden");
                $("#logout-nav").removeClass("hidden");
                $('#login-modal-form').modal('hide');

                document.location = "#/home";
            }
        });
        ev.preventDefault();
        return false;
    });

    $("#logout-nav").on("click", function (ev) {
        usersdata.logout().then(function (resp) {
            if (resp.success) {
                $(document.body).removeClass("logged-in");
                $("#login-nav").removeClass("hidden");
                $("#logout-nav").addClass("hidden");
                alertify.notify("Logout successfull!", 'success', 3, function () {
                    console.log('dismissed');
                });
            }
        });

        ev.preventDefault();
        return false;
    });

    $("#btn-register").on("click", function (ev) {
        ev.preventDefault();
        return false;
    });

    scope.home = {
        initial: initial
    };
})(window.controllers);