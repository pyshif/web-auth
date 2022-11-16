## 介紹

web-auth 以及 web-auth-server 是實作 JWT (Json Web Token)、Google Sign In 的前端和後端專案。

關於後端部分詳見：[https://github.com/pyshif/web-auth-server](https://github.com/pyshif/web-auth-server)

[TOC]

## 目錄

如果你想『運行專案進行修改』，詳見 1 ~ 8。

如果你想『了解網站功能、使用技術』，詳見 9 ~ 14。

1. [安裝](#安裝)

2. [運行](#運行)

> npm command, mode introduction

3. [沙盒模式](#沙盒模式)

4. [專案結構](#專案結構)

> folder structure purpose

5. [模組引用路徑](#模組引用路徑)

> webpack alias, tsconfig paths, jest.config

6. [前端路由管理](#前端路由管理)

> named-url, routes

7. [後端路由管理](#後端路由管理)

> named-url, routes, folder-structure

8. [打包編譯](#打包編譯)

> webpack, typescript, lazy

9. [Redux](#Redux)

---

10. [UI](#ui)

> rwd, styled-components

11. [JWT Token 管理方式](#jwt-token-管理方式)

> access-token, refresh-token

12. [Google 第三方登入](#google-第三方登入)

> gsi library, popup, credential as refresh-token, auth flow

13. [系統信發送功能](#系統信發送功能)

> aws ses, register success, forgot password, tell me

14. [網站部署](#網站部署)

15.  [使用技術](#使用技術)

## 安裝 

1. Clone

    ```bash
    git clone https://github.com/pyshif/web-auth.git
    ```

2. 建立環境變數

    依照 `.env.example` 中的內容建立 `.env.dev` 和 `.env.prod` 環境檔於專案目錄底下

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## 運行


![](<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>)

## 專案結構

```
/public
    index.html
/src
    /components
    /hooks
    /images
    /pages
    /styles
    /utils
    App.tsx
    index.tsx
.env.dev
.env.prod
.gitignore
.prettierrc
babel.config.json
jest.config.json
package-lock.json
package.json
postcss.config.js
tailwind.config.js
tsconfig.json
webpack.common.js
webpack.dev.js
webpack.prod.js
```

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## 模組引用路徑

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## 前端路由管理

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## 後端路由管理

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## UI

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## JWT Token 管理方式

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## Google 第三方登入

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## 系統信發送功能

<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>

## 網站部署

網站部署使用 AWS 服務，整體架構如下：

**DNS (Route 53)** > **CDN (CloudFront)** > **Clinet (S3)** > **Server (EC2)** > **DB (RDS)**



<div style="display:flow-root;"><a href="#目錄" style="float:right; font-size: 1rem;">回目錄</a></div>



## 使用技術

前端框架、路由使用：React (v18.2)、React Router (v6.4)

UI 框架使用：Ant Design (v4.23)、Styled Components (v5.3)

狀態管理：Redux ToolKit (v1.8.5) 

語言、打包編譯：TypeScript (v4.8)、Webpack (v5)、Babel (v7.18)

測試：Jest (v28)

其餘：PostCSS、TailwindCss、GreenSock

[![react](./readme/react.svg)](https://reactjs.org/)&ensp;
[![react-router](./readme/react-router-dom.svg)](https://reactrouter.com/en/main)&ensp;
[![styled-components](./readme/styled-components.svg)](https://styled-components.com/)&ensp;
[![redux](./readme/redux.svg)](https://redux.js.org/)&ensp;
[![ant-design](./readme/ant-design.svg)](https://ant.design/)&ensp;
[![tailwindcss](./readme/tailwindcss.svg)](https://tailwindcss.com/)&ensp;
[![postcss](./readme/postcss.svg)](https://postcss.org/)&ensp;
[![webpack](./readme/webpack.svg)](https://webpack.js.org/)&ensp;
[![babel](./readme/babel.svg)](https://babeljs.io/)&ensp;
[![typescript](./readme/typescript.svg)](https://www.typescriptlang.org/)&ensp;
[![jest](./readme/jest.svg)](https://jestjs.io/)&ensp;
[![github-action](./readme/github-action.svg)](https://github.com/features/actions)&ensp;
[![greensock](./readme/greensock.svg)](https://greensock.com/)&ensp;

> [回目錄](#目錄)
[回目錄](#目錄)
