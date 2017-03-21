/* globals  */

const http = window.http;

((scope) => {

    scope.usersdata = {
        users() {
            return http.getJSON("/api/users");
        },
        getUserByUsername(username) {
            return http.getJSON(`/api/profiles/${username}`);
        },

        login(user) {
            return http.putJSON("/api/users/login", user)
        },
        register(user) {
            return http.postJSON("/api/users", user);
        },
        logout() {
            return http.postJSON("/api/users/logout");
        },
        isLoggedIn() {
            return Promise.resolve()
                .then(() => {
                    //return !!localStorage.getItem("username");
                });
        }
    }

})(window)