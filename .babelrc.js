/*
 * @Author: rockyWu
 * @Date: 2020-05-30 14:20:01
 * @Description:
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-05-30 23:08:34
 */
const babel_env = process.env["BABEL_ENV"];
let loose = false;
let modules = false;
let useESModules = false;

switch (babel_env) {
  case "commonjs":
    loose = true;
    modules = "commonjs";
    useESModules = false;
    break;
  case "es":
    loose = true;
    modules = false;
    useESModules = true;
    break;
}

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        loose,
        modules, // 启用将 ES6 模块语法转换为其他模块类型的功能
      },
    ],
    "@babel/react",
    "@babel/typescript",
  ],
  plugins: [
    "@babel/proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        useESModules,
      },
    ],
  ],
};
