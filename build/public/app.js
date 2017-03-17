"use strict";

/* globals $ Navigo controllers */

$(function () {

    window.baseUrl = "/api/";
    var root = null;
    var useHash = false;

    var router = new Navigo(root, useHash);

    // routing
    router.on(controllers.home.initial).resolve();
});