/*
 * @Author: rockyWu
 * @Date: 2020-05-30 14:20:01
 * @Description:
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-06-01 11:47:25
 */

module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app', 'eslint:recommended'],
  rules: {
    semi: 'error',
    quotes: ['error', 'single'],
    eqeqeq: ['error', 'always'],
  },
};
