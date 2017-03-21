"use strict";

/* globals  */

var http = window.http;

(function (scope) {

    scope.usersdata = {
        users: function users() {
            return http.getJSON("/api/users");
        },
        getUserByUsername: function getUserByUsername(username) {
            return http.getJSON("/api/profiles/" + username);
        },
        login: function login(user) {
            return http.putJSON("/api/users/login", user);
        },
        register: function register(user) {
            return http.postJSON("/api/users", user);
        },
        logout: function logout() {
            return http.postJSON("/api/users/logout");
        },
        isLoggedIn: function isLoggedIn() {
            return Promise.resolve().then(function () {
                //return !!localStorage.getItem("username");
            });
        }
    };
})(window);