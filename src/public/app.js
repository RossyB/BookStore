/* globals $ Navigo controllers */

$(() => {

    const root = null;
    const useHash = true;
    const usersdata = window.usersdata;

    let router = new Navigo(root, useHash);

    // routing
    router
        .on("books", controllers.books.allBooks)
        .on("books/:id", controllers.book.bookById)
        .on("home", controllers.home.initial)
        .on("*", controllers.home.initial)
        .resolve();

    usersdata.isLoggedIn()
        .then(function(isLoggedIn) {
            if (isLoggedIn) {
                $(document.body).addClass("logged-in");
            }
        });

});