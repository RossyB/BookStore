/* globals  */

const http = window.http;

((scope) => {

    scope.usersdata = {
        users() {
            return http.getJSON("/api/users");
        },
        getUserByUsername(username) {
            return http.getJSON(`/api/users/${username}`);
        },

        login(user) {
            return http.putJSON("/api/users/login", user);
        },
        register(user) {
            return http.postJSON("/api/users/register", user);
        },
        logout() {
            return http.postJSON("/api/users/logout");
        },
        isLoggedIn() {
            return Promise.resolve()
                .then(() => {
                    let username = localStorage.getItem("username");
                    console.log(username);
                    return username;
                });
        }
    }

})(window)