<!--
 * @Author: rockyWu
 * @Date: 2020-05-24 16:55:57
 * @Description: 
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-05-30 23:30:51
-->

## Usage

```
    yarn add rockywu-ui or npm i rockywu-ui
```

## 项目构建

使用 create-react-app 构建项目

```
    npx create-react-app components-ui --typescript
```

加入 storybook

```
    npx -p @storybook/cli sb init --type react_scripts
```

需要在 .storybook 中配置 awesome-typescript-loader 支持 ts

使用 gulp 打包

```
    yarn add cross-env gulp gulp-cli gulp-typescript gulp-less
```
