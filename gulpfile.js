/*
 * @Author: rockyWu
 * @Date: 2020-05-30 15:50:22
 * @Description:
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-05-30 23:30:25
 */

const del = require("del");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const less = require("gulp-less");
const concat = require("gulp-concat");
const cssnano = require("gulp-cssnano");
const merge = require("merge2");

// const sourcemaps = require("gulp-sourcemaps");
const LessAutoprefix = require("less-plugin-autoprefix");
const autoprefix = new LessAutoprefix({ browsers: ["last 4 versions"] });

const { name } = require("./package.json");

// 复制 package.json README.md 至 dist
function copyFileToDist() {
  return gulp.src(["./package.json", "./README.md"]).pipe(gulp.dest("dist"));
}
// 打包样式到 es lib
function styles() {
  return gulp
    .src("./src/components/**/*.less")
    .pipe(gulp.dest("dist/es"))
    .pipe(gulp.dest("dist/lib"))
    .pipe(less())
    .pipe(gulp.dest("dist/es"))
    .pipe(gulp.dest("dist/lib"));
}
// 打包样式到 dist 文件
function styleDist() {
  return gulp
    .src("./src/components/**/*.less")
    .pipe(less({ plugins: [autoprefix] }))
    .pipe(concat(`${name}.css`))
    .pipe(gulp.dest("dist/dist"))

    .pipe(cssnano())
    .pipe(concat(`${name}.min.css`))
    .pipe(gulp.dest("dist/dist"));
}

// 打包脚本
function compileTS(dir, module) {
  let tsProject = ts.createProject("tsconfig.json", {
    module: module ? "ES2015" : "CommonJS",
    declaration: true, // 生成 .d.ts 文件, 需去除 --isolatedModules
  });
  return gulp
    .src("./src/components/**/*.tsx")
    .pipe(tsProject())
    .pipe(gulp.dest(dir));
}

// es6 模式
function compileES() {
  return compileTS("dist/es", true);
}
// commonJs 机制
function compileJS() {
  return compileTS("dist/lib", false);
}

function clean() {
  return del(["dist/es", "dist/lib"]);
}

// 打包
exports.default = gulp.series(
  clean,
  copyFileToDist,
  styles,
  styleDist,
  gulp.parallel(compileES, compileJS)
);
