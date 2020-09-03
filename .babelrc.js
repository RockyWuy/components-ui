/*
 * @Author: rockyWu
 * @Date: 2020-05-30 14:20:01
 * @Description:
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-06-09 14:01:56
 */
const babel_env = process.env['BABEL_ENV'];
let loose = false;
let modules = false;
let useESModules = false;

switch (babel_env) {
  case 'commonjs':
    loose = true;
    modules = 'commonjs';
    useESModules = false;
    break;
  case 'es':
    loose = true;
    modules = false;
    useESModules = true;
    break;
}

module.exports = {
  // 当前环境可以使用 process.env.BABEL_ENV 来获得。 如果 BABEL_ENV 不可用，将会替换成 NODE_ENV，
  // 并且如果后者也没有设置，那么缺省值是"development"
  env: {
    development: {
      plugins: [],
    },
    production: {
      plugins: [],
    },
  },
  presets: [
    [
      '@babel/env',
      {
        loose,
        modules, // 启用将 ES6 模块语法转换为其他模块类型的功能
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules,
        // transform-runtime 默认会自动的为你使用的 ES6 API 注入 polyfill
        // 假如你在源码中使用了 Promise，输出的代码将会自动注入 require('babel-runtime/core-js/Promise') 语句
        // polyfill 的注入应该交给模块使用者，因为使用者可能在其它地方已经注入了其它的 Promise polyfill 库
        // 所以关闭该功能
        // polyfill: false,
      },
    ],
  ],
};
