/*
 * @Author: rockyWu
 * @Date: 2020-05-30 14:20:01
 * @Description:
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-06-01 11:24:49
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
      },
    ],
  ],
};
