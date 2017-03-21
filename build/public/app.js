"use strict";

/* globals $ Navigo controllers */

$(function () {

    var root = null;
    var useHash = false;

    var router = new Navigo(root, useHash);

    // routing
    router.on("home", controllers.home.initial).on("", controllers.home.initial).resolve();
});