"use strict";

var http = window.http;
var handlebars = window.handlebars || window.Handlebars;

(function (scope) {
    scope.templates = {
        getByUrl: function getByUrl(url) {
            return http.get(url).then(function (templateHtml) {
                console.log(templateHtml);
                var templateFunc = handlebars.compile(templateHtml);
                return templateFunc;
            });
        },
        get: function get(name) {
            var url = "/public/templates/" + name + ".hbs";
            return this.getByUrl(url);
        },
        getPage: function getPage(name) {
            var url = "/public/pages/" + name + "/" + name + ".hbs";
            return this.getByUrl(url);
        }
    };
})(window);