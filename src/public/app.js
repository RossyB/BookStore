/* globals $ Navigo controllers */

$(() => {

    window.baseUrl = "/api/";
    const root = null;
    const useHash = false;

    let router = new Navigo(root, useHash);

    // routing
    router
        .on(controllers.home.initial)
        .resolve();


});