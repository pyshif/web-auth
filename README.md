## 介紹

web-auth 以及 web-auth-server 是實作 JWT (Json Web Token)、Google Sign In 的『前端』和『後端專案』。

關於後端部分詳見：[https://github.com/pyshif/web-auth-server](https://github.com/pyshif/web-auth-server)

## 目錄

如果你想『運行專案進行修改』，詳見 1 ~ 9。

如果你想『了解網站功能、使用技術』，詳見 10 ~ 15。

1. [安裝](#安裝)

2. [運行](#運行)

3. [沙盒模式](#沙盒模式)

4. [專案結構](#專案結構)

    4-1. [環境變數](#環境變數)

    4-2. [Webpack 設定檔](#webpack-設定檔)

    4-3. [TypeScript 設定檔](#typescript-設定檔)

    4-4. [Jest 設定檔](#jest-設定檔)

    4-5. [CSS 後處理器](#css-後處理器)

    4-6. [其餘設定檔](#其餘設定檔)

    4-7. [主要代碼](#主要代碼)

    4-8. [沙盒環境](#沙盒環境)

    4-9. [正式環境](#正式環境)

5. [模組引用別名](#模組引用別名)

6. [前端路由管理](#前端路由管理)

7. [API 管理](#api-管理)

8. [打包編譯](#打包編譯)

9. [Redux](#redux)

---

10. [UI](#ui)

11. [JWT Token 管理方式](#jwt-token-管理方式)

12. [Google 第三方登入](#google-第三方登入)

13. [系統信發送功能](#系統信發送功能)

14. [網站部署](#網站部署)

15.  [使用技術](#使用技術)

## 安裝 

1. Clone

    ```bash
    git clone https://github.com/pyshif/web-auth.git
    ```

2. 建立環境變數

    依照 `.env.example` 中的內容建立 `.env.dev` 和 `.env.prod` 環境檔於專案目錄底下

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 運行

- 運行測試環境（套用 webpack.dev.js）
   
   ```bash
   npm start
   ```

- 生成正式環境（套用 webpack.prod.js）

    ```bash
    npm run build
    ```

    > 正式環境生成於 `/build` 資料夾。生成後預設會進行打包分析，如不需要直接中止

- 運行 Jest 測試檔案
  
    ```bash
    npm test
    ```

- 運行沙盒模式（套用 webpack.sand.js）

    ```bash
    npm run sand
    ```

    > 沙盒模式設定方詳見『[3. 沙盒模式](#沙盒模式)』（如不需要使用可略）

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 沙盒模式

沙盒模式提供一個封閉的實驗環境（套用 webpack.sand.js 設定檔）

- 模組、庫實驗（透過 path alias 可以輕鬆的引入模組，詳見 [5. 模組引用別名](#模組引用別名)）

- 設定檔實驗（webpack, tsconfig, babel, jest... 等）

啟用方式：

1. 啟用沙盒模式前，請先『建立入口檔案 `/sand/index.tsx`』

2. 編寫 `/sand/index.tsx` 內容作為應用程式入口（可參考下方代碼）

3. （參考）建立第一個測試模組資料夾 `/sand/Exp1/`

4. 將需要實驗的模組引入 `/sand/index.tsx` 後執行 `npm run sand`

<details>
<summary><code>/sand/index.tsx</code> 參考代碼</summary>

```ts
// import package
import { createRoot } from 'react-dom/client';
import React, { lazy } from 'react';

// import .css/.scss/...

// import module
// *** use lazy loading to avoid large bundle ***
const Exp1 = lazy(() => import('./Exp1'));
const Exp2 = lazy(() => import('./Exp2'));
const Exp3 = lazy(() => import('./Exp3'));
// ....

// choose sand box
const which = 3;

function Test(n: number) {
    switch (n) {
        // ... add above
        case 3:
            return <Exp3 />;
        case 2:
            return <Exp2 />;
        case 1:
            return <Exp1 />;
        default:
            return <h1>Welcome to sandbox.</h1>;
    }
}

// render root element
const element = document.querySelector('#root') as HTMLDivElement;

if (element) {
    const root = createRoot(element);
    root.render(<React.StrictMode>{Test(which)}</React.StrictMode>);
}
```

</details>

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 專案結構

### 環境變數

```graphql
.
├── .env.dev
├── .env.prod 
└── .env.example
```

> `.env.dev`、`.env.prod` 需自行建立

環境變數『對應設定檔』以及『腳本命令』

| env | webpack | npm |
|:-----:|:---------:|:-----:|
|`.env.dev`| `webpack.dev.js` | `npm start` |
|`.env.dev`| `webpack.sand.js` | `npm run sand` |
|`.env.prod `| `webpack.prod.js` | `npm run build` |

> Jest 測試需要使用 dotenv 套件自行處理環境變數檔匯入

### Webpack 設定檔

```graphql
.
├── .babel.config.json
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── webpack.sand.js
```

設定檔預設『繼承關係』，以及對應『腳本命令』

| parent | child | npm |
|:------:|:-----:|:---:|
| `webpack.common.js` | `webpack.dev.js` | `npm start` | 
| `webpack.common.js` | `webpack.prod.js` | `npm run build` |
| `webpack.dev.js` | `webpack.sand.js` | `npm run sand` |

舉例：

webpack.dev.js 會先套用 webpack.common.js 中的設定再套用本身自己的設定。

> 詳細請參考 [Webpack 官方文件](https://webpack.js.org/guides/production/#setup)

### TypeScript 設定檔

```graphql
.
├── .tsconfig.json
└── types
    └── assets.d.ts   
```

TypeScript 設定檔，以及非預設模組宣告。

若有需要引用模組尚未宣告，自行增加定義檔、或修改 assets.d.ts 即可。

### Jest 設定檔

```graphql
.
└── jest.config.json
```

Jest 測試框架設定檔

### CSS 後處理器

```graphql
.
├── postcss.config.js
└── tailwind.config.js
```

進行 tailwindcss 以及 autoprefixer 等處理

> 目前已使用 styled-components 框架，tailwind 可能在未來移除

### 其餘設定檔

```graphql
.
├── .gitignore
├── .prettierrc
├── package-lock.json
└── package.json
```

### 主要代碼

```graphql
.
├── public
│   ├── favicon.png
│   └── index.html
└── src
    ├── api
    ├── components
    ├── hooks
    ├── images
    ├── pages
    ├── store
    ├── styles
    ├── utils
    ├── App.tsx
    └── index.tsx
```

| folder | description | detail |
|--------|-------------|--------|
|`public/`| HTML 模板 | - |
|`src/api/`| API 管理 | [詳見 API 管理](#api-管理)
|`src/components/` | React 元件 | -
|`src/hooks/` | React Custom Hooks | -
|`src/images/` | 媒體檔案 | -
|`src/pages/` | 前端頁面元件 | [詳見 前端路由管理](#前端路由管理)
|`src/store/` | Redux | [詳見 Redux](#redux)
|`src/styles/`| .css, .scss | -
|`src/utils/` | 通用工具

### 沙盒環境

```graphql
.
└── sand
    ├── Exp1
    ├── Exp2
    ├── ...
    └── index.tsx
```

沙盒環境資夾需要自行建立，詳見 [3. 沙盒模式](#沙盒模式)。

### 正式環境

```graphql
.
└── build
    ├── static
    └── index.html
```

> 使用 `npm run build` 生成 `build` 資料夾

index.html 由 `/public/index.html` 模板而來；其餘 .js/.jsx, .ts/.tsx, .css ... 等打包進 static 資料夾。

關於細節，詳見 [8. 打包編譯](#打包編譯)。

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 模組引用別名

專案設有資料夾別名（alias），引用模組時直接使用『對應別名』取代『相對路徑』即可。

| alias | folder |
|-------|--------|
| `api` | `src/api/` |
| `components` | `src/components/` |
| `hooks` | `src/hooks/` |
| `images` | `src/images/` |
| `pages` | `src/pages/` |
| `store` | `src/store/` |
| `styles` | `src/styles/` |
| `utils` | `src/utils/` |

舉例：

```ts
// src/pages/home.tsx

// 原本：引用 A 元件
import A from '../components/A';

// 使用 alias：引用 A 元件
import A from 'components/A';
```

### 自行修改 alias

alias 修改，牽涉 `.tsconfig.json`、`webpack.common.js`、`jest.config.js` 三個設定檔案。

依照文件規則，修改對應屬性即可。

| config | property | Docs |
|--------|----------|------|
|`.tsconfig.json` | `paths` | [Docs](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)|
|`webpack.common.js` | `resolve.alias` | [Docs](https://webpack.js.org/configuration/resolve/#resolvealias) |
|`jest.config.js` | `moduleNameMapper` | [Docs](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring) |

> 由於 Jest 測試是獨立環境，所以諸多設定需要另外處理

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 前端路由管理

```graphql
.
└── src
    └── utils
        └── routes.ts
```

前端路由，使用 [React Router v6.4](https://reactrouter.com/en/main) 建構；路由名稱的部分，使用 [named-urls](https://www.npmjs.com/package/named-urls) 來管理。

`routes.ts` 範例：

```ts
import { include } from 'named-urls';

const routes = {
    home: '/',
    auth: include('/auth', {
        self: '',
        signin: 'signin/',
    });
};

console.log(' "/" :>> ', routes.home);
console.log(' "/auth/" :>> ', routes.auth.self);
console.log(' "/auth/signin/" :>> ', routes.auth.signin);
```

和 React Router 搭配使用：

```tsx
import routes from 'utils/routes';
// ... other components

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home} element={<Layout/ >}>
                    <Route path={routes.auth.self} element={<Auth />}>
                        <Route
                            path={routes.auth.signin}
                            element={<SignIn />}
                        ></Route>
                    </Route>
                    <Route index element={<Home />}></Route>
                </Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

```

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## API 管理

- `api/` 資料夾結構
- API 路由
- Request 函式定義
- api 模組使用

### `api/` 資料夾結構

```graphql
.
└── src
    └── api
        ├── v1 - # API 版本
        │   ├── auth - # 身份驗證
        │   │   ├── forgot.ts
        │   │   ├── gsi.ts
        │   │   ├── index.ts
        │   │   ├── reset.ts
        │   │   ├── signin.ts
        │   │   ├── signout.ts
        │   │   ├── signup.ts
        │   │   ├── token.ts
        │   │   └── user.ts
        │   ├── help - # 幫助
        │   │   ├── index.ts
        │   │   └── tellme.ts
        │   ├── routes - # v1 版本路由名稱管理
        │   │   └── index.ts
        │   └── static
        └── index.ts - # 模組入口
```

每個版本的 API 存在唯一 `routes/index.ts` 檔案來管理路由。

- 涉及『名稱變動』時：更改 `routes/index.ts` 即可
- 涉及『結構變動』時：更改 `routes/index.ts` 以及對應使用的檔案

### API 路由

API 路由的管理，同樣由 [named-urls](https://www.npmjs.com/package/named-urls) 第三方套件輔助我們生成路由。

『在命名路由變數』時，皆以 HTTP Request Method 名稱作為結尾，以方便編輯器提示使用者該 API 呼叫方式。

另外，涉及『路徑參數』時以 `_` 開頭作為變數命名，以提示 `reverse` 函式（named-urls 套件方法）使用。

舉例：

```ts
// src/api/v1/routes/index.ts
import { include, reverse } from 'named-urls';

const routes = {
    auth: include('auth/', {
        signUp: include('signup/, {
            POST: ''
            _token: include(':_token/, {
                GET: ''
            })
        }),
        signOut: include('signout/, {
            DELETE: ''
        })
    }),
};

console.log(' "/auth/signup/" :>> ', routes.auth.signUp.POST);
console.log(' "/auth/signup/:_token/" :>> ', routes.auth._token.GET);
console.log(' "/auth/signup/this-is-token/" :>> ', reverse(routes.auth._token.GET, { _token: 'this-is-token'}));
console.log(' "/auth/signout/" :>> ', routes.auth.signOut);
```

`routes` 物件中只負責紀錄路由，並不包含 domain 的部分。

我們提供 `baseURL` 給 axios 物件，來創建一個客製化的實例。

當我們使用該實例時，axios 會幫我們結合 `baseURL` 和 `url` 完成 API 完整的 endpoint。

舉例：

```ts
import axios from 'axios';

// generate custom axios object
const instance = axios({
    baseURL: process.env.API_URL || 'http://localhost:3003/',
});

// call api -> DELETE http://localhost:3003/auth/signout/ 
function apiSignOut() {
    return instance({
        method: 'DELETE',
        url: routes.auth.signOut.DELETE,
        // ...
    });
}
```

### Request 函式定義

定義參數型別、預設值...等，來簡化呼叫 API 的方式。

舉例：

```ts
// api/v1/auth/signup.ts 
import { AxiosInstance } from 'axios';
import routes from 'api/v1/routes';
import { reverse } from 'named-urls';

// 定義請求酬載資料型別
export type DataSignUp = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    passwordHint: string,
};

// API 函式
function signUp(axios: AxiosInstance) {
    return {
        signUp: (data: DataSignUp) => {
            return axios({
                method: 'POST',
                url: routes.auth.signUp.POST,
                data
            })
        },
        validateEmailAddress: (linkToken: string) => {
            return axios({
                method: 'GET',
                // 將 /auth/signup/:_token/ 中 :_token 替換成 linkToken
                url: reverse(routes.auth.signUp._token.GET, { _token: linkToken })
            });
        }
    }
}

export default signUp;
```

### `api` 模組使用

```ts
import api from 'api';

// api call
async function responseSignUp(data) {
    try {
        const response = await api.v1.auth.apiSignUp(data);
        return response.data;
    } catch (error) {
        return null; 
    }
}
```

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 打包編譯

Webpack 相關設定檔：

```graphql
.
├── postcss.config.js
├── babel.config.js
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── webpack.sand.js
└── tsconfig.json
```

### HTML

HTML 由 Webpack Plugin 處理後生成：

| Syntax | Webpack Plugin | Source | Config |
|:------:|:--------------:|:------:|:------:|
| HTML   | HtmlWebpackPlugin | `public/index.html` | `webpack.common.js` |

> 關於 HtmlWebpackPlugin 詳細資訊，請參考 [官方文件](https://webpack.js.org/plugins/html-webpack-plugin/)

### CSS

CSS 由 Webpack Loader 處理後生成；依序如下方表格：

| Syntax | Webpack Loader | Config | 
|:------:|:--------------:|:------:|
| CSS    | postcss-loader | `webpack.common.js` |
| CSS    | css-loader | `webpack.common.js` |
| CSS    | MiniCssExtractPlugin.loader | `webpack.common.js` |

> PostCSS 預處理細節，請參考 `postcss.config.js` 設定檔

> MiniCssExtractPlugin.loader 進行 .css 檔案抽離處理，細節請參考 [官方文件](https://webpack.js.org/plugins/mini-css-extract-plugin/)


### JavaScript

JavaScript 由 Webpack Loader 處理後生成；依序如下方表格：

| Syntax | Webpack Loader | Config |
|:------:|:--------------:|:------:|
| TypeScript | ts-loader | `webpack.common.js` |
| ES5、React | babel-loader | `webpack.common.js` |

<details>
<summary>React、JavaScript(ES5)、TypeScript 對應『編譯器 Compiler、設定檔』</summary>

| Syntax | Compiler | Config |
|:------:|:--------:|:------:|
| ES5 | Babel    | `babel.config.js` |
| React  | Babel    | `babel.config.js` |
| TypeScript | tsc | `tsconfig.json` |

> 實際上 `babel.config.js` 中的設定值可以直接寫進 `webpack` 設定檔中不需要額外建立

</details>

### Others

正式環境優化

- Minimizer (JS, CSS)
- Tree Shaking
- Lazy Loading
- Split Chunks (`node_modules`, `react`, `react-dom`, `react-router-dom`)

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## Redux

專案使用 [Redux ToolKit](https://redux-toolkit.js.org) 來管理全域狀態；資料夾結構如下：

> Redux ToolKit 自動幫我們加入 Middleware Enhancer 以及 Thunk Middleware ，提供我們處理異步代碼

```graphql
.
└── src
    └── store
        ├── features
        │   ├── authSlice.ts
        │   └── helpSlice.ts
        └── index.ts
```

### Store

Redux 中的全域儲存空間，透過 `react-redux` 套件提供的 `Provider` 元件和 React 交互。

<details>
<summary>匯入 store 範例</summary>

```tsx
// src/index.tsx
import { createRoot } from 'react-dom/client';
import store from 'store';
import { Provider } from 'react-redux';
import App from './App';

const element = document.querySelector('#root') as HTMLDivElement;
if (element) {
    const root = createRoot(element);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
```

</details>


透過 `store` 引入 `useAppSelector` 和 `useAppDispatch` 這兩個 Hooks，來『取得、操作全域狀態』。

<detail>
<summary>登出按鈕範例</summary>

```tsx
import { useAppDispatch, useAppSelector } from 'store';
import { apiSignOut } from 'store/feature/authSlice';

function SomeComponent() {
    // 取得 dispatch
    const dispatch = useAppDispatch();
    // 取得 定義於 store 中的 auth 全域物件狀態
    const { user } = useAppSelector(state => state.auth);

    const handleSignOut = () => {
        // apiSignOut is a thunk function to handle api
        dispatch(apiSignOut());
        // above dispatch will return a Promise, so you can write like this...
        dispatch(apiSignOut()).then(action => {
            if (action.error) {
                // ...error
            }
            // ...success
        });
    }

    return <button onClick={handleClick}>Sign Out</button>
}
```

</details>


### Slice

Slice 是 Redux ToolKit 的術語，我們會在 Slice 檔案中定義幾件事

- State 型別、初始狀態
- Action 型別
- Reducer 名稱、方法
- Thunk Function

<details>
<summary>helpSlice 代碼範例</summary>

```tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api';

// State 型別
export type StateHelp = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
}

// State 初始狀態
const initialState = {
    status: 'loading'
}

// Thunk Function 處理發送 API 的異步代碼
export const apiTellMe = createAsyncThunk<void, { accessToken: string, feedback: string }>('help/tellme', async ({ accessToken, feedback }) => {
    const response = await api.v1.help.tellMe(accessToken, feedback);

    // 此 callback 實際上就是一個 action payload creator，有 payload 需要回傳時直接 return 即可，return 的 payload 會被下方 extra reducer 中的同步代碼處理
});

const helpSlice = createSlice({
    // 該 reducer 的 type 名稱
    name: 'help',
    // 初始 state
    initialState,
    // reducer
    reducers: {},
    // extra reducer 處理 thunk function 狀態
    extraReducers: (builder) => {
        builder
            .addCase(apiTellMe.pending, (state, action) => {
                // console.log('pending :>>', state, action);
                state.status = 'loading';
            })
            .addCase(apiTellMe.fulfilled, (state, action) => {
                // console.log('fulfilled :>>', state, action);
                // action.payload 會儲存上方 createAsyncThunk 中 callback 裡 return 的物件
                state.status = 'succeeded';
            })
            .addCase(apiTellMe.rejected, (state, action) => {
                // console.log('rejected :>>', state, action);
                state.status = 'failed';
            })
    }
});

export default helpSlice.reducer;
```

</details>

> 如對 Thunks and Async Logic 感到模糊，請參考 [Redux 官方文件](https://redux.js.org/tutorials/essentials/part-5-async-logic#thunks-and-async-logic)

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## UI

```graphql
.
└── src
    └── utils
        ├── device.ts - # RWD 斷點
        └── font.ts - # 字體
```

UI Framework 使用 [styled-component](https://styled-components.com/) 和 [Ant Design](https://ant.design/)。

RWD 手機版、平板/電腦版，斷點於 `768px`； `src/utils/device.ts` 定義各斷點數值。

網頁切版使用 `Grid` 佈局（請參考 `src/pages/Layout`），再進行細切。

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## JWT Token 管理方式

Token 共有兩種，Access Token 和 Refresh Token。

### Access Token

用於請求時的授權驗證，會寫入 Http 標頭中的 Authorization

登入成功後，存儲於前端『記憶體』中，Token 有效性後端預設為 15 分鐘過期。

<details>
<summary>Access Token 使用範例</summary>

```ts
// src/api/v1/auth/token.ts
import { AxiosInstance } from "axios";
import routes from 'api/v1/routes';

// response data type
export type DataResponseRequestToken = {
    accessToken: string;
};

function token(axios: AxiosInstance) {
    return {
        // 驗證 Access Token 有效性
        validateToken: (accessToken: string) => {
            return axios({
                method: 'GET',
                url: routes.auth.token.GET,
                withCredentials: true,
                // 將 Access Token 於標頭中帶給後端
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        },
        // 請求新的 Access Token
        requestToken: () => {
            return axios({
                method: 'GET',
                url: routes.auth.token.new.GET,
                withCredentials: true,
            })
        }
    }
}

export default token;

```

</details>

### Refresh Token

用於刷新 Access Token，保持登入狀態。

登入成功後，存儲在 Http-Only、Secure 的 Cookie 中 (正式環境)，Token 有效時長預設為 90 天。

> 開發環境，Refresh Token 則存儲在一般 Cookie 中

### 情境說明

- 登入：登入成功後會獲取 Access Token 和 Refresh Token 各一組，存儲在上述說明的位置。
- 刷新：當網頁 F5 強制刷新時，存儲在記憶體中的 Access Token 會直接消失，此使會將 Refresh Token 帶給後端重新獲取新的 Access Token。
- 登出：使用者登出時，不論後端處理成功失敗，前端皆會同時清除 Access Token 和 Refresh Token。

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## Google 第三方登入

### 庫

使用 [Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview) 庫來串接 Google 第三方登入。

React 部分使用 Custom Hooks 於 DidMount 生命週期進行 GSI 庫加載。

<details>
<summary>GSI 加載代碼（<code>src/hooks/GSI/index.ts</code>）</summary>

```ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScript from 'hooks/useScript';
import { useAppDispatch } from 'store';
import { apiGoogleSignIn } from 'store/features/authSlice';
import { message } from 'antd';
import routes from 'utils/routes';
import { CredentialResponse } from 'google-one-tap';

declare namespace window {
    let onGoogleLibraryLoad: () => void;
}

// popup mode
function useGSI() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const state = useScript(process.env.GOOGLE_GSI_SRC as string);

    const handleResponse = (user: CredentialResponse) => {
        // console.log('user :>> ', user);
        // const decodeJWT = import('jwt-decode');
        // console.log('user.credential :>> ', user.credential);
        // console.log('decodeJWT(user.credential) :>> ', decodeJWT(user.credential));
        const hide = message.loading('Google sign-in in progress...', 0);
        dispatch(apiGoogleSignIn(user.credential)).then((action) => {
            const { error } = action as any;
            if (error) {
                message.error('Google sign-in failed!', 3);
                return hide();
            }
            message.success('Google sign-in success!', 3);
            navigate(routes.user);
            return hide();
        });
    }

    useEffect(() => {
        // console.log('state :>> ', state);
        if (state.status === 'succeeded') {
            google.accounts.id.initialize({
                client_id: process.env.GOOGLE_GSI_CLIENT_ID as string,
                callback: handleResponse,
                ux_mode: 'popup',
                auto_select: true,
            });

            const gsiBtn = document.querySelector('#gsi-btn') as HTMLElement;
            google.accounts.id.renderButton(gsiBtn, {
                type: 'standard',
                size: 'large',
                width: 278,
                theme: 'outline',
                text: 'signin_with',
                logo_alignment: 'center',
                locale: 'en',
            });
        }
    }, [state]);
}

export default useGSI;
```

</details>

### 登入方式

在 One Tap 和 Sign In With Google Button 兩種方式中，選擇後者進行實作。

### 流程

Google Sign In With Button 提供 redirect 和 popup 兩種流程，本專案『為前後端分離』，故選擇 popup 的流程進行實作，細節如下：

1. 使用者按下 Google 登入按鈕
2. 於 Google 頁面選擇帳號進行授權
3. 授權完成後，Google 將使用者相關資料回傳至前端
4. 前端接收到資料後將其中的『ID Token (JWT)』傳至後端
5. 後端將取得的 ID Token 和 Google Server 進行驗證
6. 驗證通過後存儲至資料庫，並回傳 Access Token、Refresh Token 給前端
7. 登入成功

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 系統信發送功能

系統信的發送使用 AWS SES 服務，前端的部分會使用到的功能如下：

- 註冊成功：發送『Email Address 驗證連結』至使用者信箱
- 第三方首次登入：發送『加入成功通知信』至使用者信箱
- 忘記密碼：發送『重設密碼連結』至使用者信箱
- Tell Me 功能：將使用者於 Footer 『回饋訊息』輸入框中的鍵入內容，寄至客服信箱

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

## 網站部署

網站部署使用 AWS 服務，整體架構流程如下：

| Item | AWS |
|:----:|:---:|
| DNS | Route 53 |
| CDN | CloudFront |
| Client | S3 |
| Server | EC2 |
| DB | RDS |

<p align="right">
    <a href="#目錄">回目錄</a>
</p>

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

<p align="right">
    <a href="#目錄">回目錄</a>
</p>
