/* globals $ Navigo controllers */

$(() => {

    const root = null;
    const useHash = false;

    let router = new Navigo(root, useHash);

    // routing
    router
        .on("home", controllers.home.initial)
        .on("", controllers.home.initial)

    .resolve();

});