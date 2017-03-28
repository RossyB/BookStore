/* globals $ alertify*/
"use strict";

window.controllers = window.controllers || {}

const templates = window.templates;
const booksdata = window.booksdata;
const usersdata = window.usersdata;

((scope) => {


    const initial = () => {
        $("#myCarousel").removeClass("hidden");
        $("#main-image").addClass("hidden");
        Promise.all([booksdata.getBooks(0, 6, "addedAt", -1), templates.get("home")])
            .then(([resp, templateFunc]) => {
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
    };

    $("#btn-login").on("click", (ev) => {
        let user = {
            username: $("#tb-login-username").val(),
            password: $("#tb-login-password").val()
        };

        usersdata.login(user)
            .then((resp) => {
                if (resp.success) {
                    alertify.notify(`${resp.message} Hello, ${resp.username}`, 'success', 3, function() { console.log('dismissed'); });
                    $(document.body).addClass("logged-in");
                    $('#login-modal-form').modal('hide');
                    localStorage.setItem("username", resp.username);
                } else {
                    alertify.notify(resp.message, 'error', 3, function() { console.log('dismissed'); });

                    document.location = "#/home";
                }
            });
        ev.preventDefault();
        return false;
    });

    $("#logout-nav").on("click", (ev) => {
        usersdata.logout()
            .then((resp) => {
                if (resp.success) {
                    $(document.body).removeClass("logged-in");
                    localStorage.removeItem("username");
                    alertify.notify("Logout successfull!", 'success', 3, function() { console.log('dismissed'); });
                } else {
                    alertify.notify(resp.message, 'error', 3, function() { console.log('dismissed'); });
                }
            });

        ev.preventDefault();
        return false;
    });

    $("#btn-register").on("click", (ev) => {
        let user = {
            username: $("#tb-register-username").val(),
            password: $("#tb-register-password").val(),
            firstname: $("#tb-register-firstname").val(),
            lastname: $("#tb-register-lastname").val(),
            imageUrl: $("#tb-register-image-url").val(),
            email: $("#tb-register-email").val()
        }
        console.log(user);

        usersdata.register(user)
            .then((resp) => {
                console.log(resp);
                if (resp.success) {
                    alertify.notify(`${resp.message}`, 'success', 3, function() { console.log('dismissed'); });
                    $('#register-modal-form').modal('hide');
                } else {
                    alertify.notify(resp.message, 'error', 3, function() { console.log('dismissed'); });
                }
            })

        ev.preventDefault();
        return false;
    });

    scope.home = {
        initial
    };

})(window.controllers);