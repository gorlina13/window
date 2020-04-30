"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const server = require("browser-sync").create();
const del = require("del");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
const gulpIf = require("gulp-if");
const webpack = require("webpack-stream");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

const devWebpackOptions = {
  mode: "development",
  output: {
    filename: "bundle.js"
  },
  watch: false,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};

const prodWebpackOptions = {
  mode: "production",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};

function style() {
  return gulp.src([
    "source/assets/css/*.css",
    "source/assets/slick/*.css"
    ], {
    base: "source"
  })
    .pipe(plumber())
    .pipe(csso())
    .pipe(gulp.dest("dist"))
    .pipe(server.stream());
}

function clean() {
  return del("dist");
}

function assets() {
  return gulp.src("source/assets/**", {
    base: "source"
  })
    .pipe(gulp.dest("dist"));
}

function html() {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
}

function js() {
  return gulp.src("source/js/main.js")
    .pipe(gulpIf(isDevelopment, webpack(devWebpackOptions), webpack(prodWebpackOptions)))
    .pipe(gulp.dest("dist/js"));
}

function serve(done) {
  server.init({
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

function watch() {
  gulp.watch("source/assets/**/*.css", style);
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/js/**/*.js", gulp.series(js, reload));
}

exports.style = style;
exports.clean = clean;
exports.assets = assets;
exports.html = html;
exports.js = js;
exports.default = gulp.series(
  clean,
  assets,
  gulp.parallel(
    style,
    html,
    js
  )
);
exports.dev = gulp.series(serve, watch);
