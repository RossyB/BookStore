/* globals $ toastr alertify*/
window.controllers = window.controllers || {}

const templates = window.templates;
const booksdata = window.booksdata;
const usersdata = window.usersdata;

((scope) => {
    const $pagePlaceholder = $("#page-placeholder");

    const initial = () => {
        Promise.all([booksdata.getBooks(), templates.get("home")])
            .then(([resp, templateFunc]) => {
                const books = resp;
                console.log(books)
                let html = templateFunc({ books });
                $pagePlaceholder.html(html);
            });
    };

    $("#btn-login").on("click", (ev) => {
        $("#tb-username").val = "";
        $("#tb-password").val = "";
        let user = {
            username: $("#tb-username").val(),
            password: $("#tb-password").val()
        };

        usersdata.login(user)
            .then((resp) => {
                if (!resp.success) {
                    alertify.notify(resp.message, 'error', 3, function() { console.log('dismissed'); });
                } else {
                    alertify.notify(`${resp.message} Hello, ${resp.username}`, 'success', 3, function() { console.log('dismissed'); });
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

    $("#logout-nav").on("click", (ev) => {
        usersdata.logout()
            .then((resp) => {
                if (resp.success) {
                    $(document.body).removeClass("logged-in");
                    $("#login-nav").removeClass("hidden");
                    $("#logout-nav").addClass("hidden");
                    alertify.notify("Logout successfull!", 'success', 3, function() { console.log('dismissed'); });
                }
            });

        ev.preventDefault();
        return false;
    });

    $("#btn-register").on("click", (ev) => {
        ev.preventDefault();
        return false;
    })


    scope.home = {
        initial
    };

})(window.controllers);