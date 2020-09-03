/*
 * @Author: rockyWu
 * @Date: 2020-05-24 17:20:41
 * @Description:
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-06-09 15:51:11
 */

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          { loader: require.resolve('awesome-typescript-loader') },
          // { loader: require.resolve('eslint-loader') },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      }
    );
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
