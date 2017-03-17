"use strict";

const gulp = require("gulp"),
    gulpsync = require("gulp-sync")(gulp),
    babel = require("gulp-babel"),
    sass = require("gulp-sass"),
    nodemon = require("gulp-nodemon"),
    clean = require("gulp-clean");

gulp.task("clean", function() {
    return gulp
        .src("build", {
            read: false,
        })
        .pipe(clean());
});

gulp.task("compile:js", () => {
    return gulp.src("./src/public/**/*.js")
        .pipe(babel({
            presets: ["es2015"],
        }))
        .pipe(gulp.dest("./build/public"));
});

gulp.task("compile:sass", () => {
    return gulp.src("./src/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build"));
});

gulp.task("compile", ["compile:js", "compile:sass"]);

gulp.task("copy:all", () => {
    return gulp
        .src([
            "./src/**/*.html",
            "./src/**/*.js",
            "./src/**/*.hbs",
            "./src/**/*.css",
            "./src/**/*.jpg",
            "./src/**/*.png",
            "!./src/public/**/*.js",
        ])
        .pipe(gulp.dest("./build"));
});

gulp.task("copy", ["copy:all"]);

gulp.task("build", gulpsync.sync(["clean", "compile", "copy"]));

gulp.task("serve", ["build"], () => {
    nodemon({
        script: "./build/server.js",
        ext: "js html hbs scss css",
        ignore: ["build"],
        tasks: ["build"],
    });

});