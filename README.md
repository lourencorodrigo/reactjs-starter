## Table of Contents

- [Adding CSS Modules](#adding-css-modules)
- [Adding a CSS Preprocessor (Sass, Less etc.)](#adding-a-css-preprocessor-sass-less-etc)
- [Adding ESLint](#adding-eslint)
- [Adding Jest Test with Snapshots](#adding-jest-test-with-snapshots)

## Adding CSS Modules

É preciso ejetar para poder customizar a configuração do Webpack.

```sh
yarn run eject
```

Caso encontre algum problema com a inicialização da aplicação remova e instale novamente o `node_modules`.

Procure a seção **css-loader** no seu Webpack de desenvolvimento. Altere **options** em `config/webpack.config.dev.js` conforme abaixo:

```diff
{
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
+   modules: true,
+   localIdentName: "[name]__[local]___[hash:base64:5]"  
  },
},
```

Altere **options** em `config/webpack.config.prod.js` conforme abaixo:

```diff
{
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
+   modules: true,
    minimize: true,
    sourceMap: true,
   },
},
```

## Adding a CSS Preprocessor (Sass, Less etc.)

Instale a dependência abaixo.

```sh
yarn add node-sass-chokidar
yarn add npm-run-all
```
No `package.json`, adicione as seguintes linhas de códigos

```diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
-    "start": "node scripts/start.js start",
-    "build": "node scripts/build.js build",
+    "start-js": "node scripts/start.js start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build-js": "node scripts/build.js build",
+    "build": "npm-run-all build-css build-js",
     "test": "react-scripts test --env=jsdom",
```

O código acima também permite realizar *imports* a partir do `path` relativo como:

```scss
@import 'styles/_colors.scss'; // assuming a styles directory under src/
@import 'nprogress/nprogress'; // importing a css file from the nprogress node module
```

## Adding ESLint

Instale as dependências:

```sh
yarn add eslint --dev
yarn add eslint-plugin-react --dev
```

Crie o arquivo `.eslint` na raiz do seu projeto com o conteúdo recomendado abaixo.

```json
{
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "mocha": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "react/jsx-uses-react": "error"k,
    "react/jsx-uses-vars": "error",
    "react/jsx-max-props-per-line": "error",
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": "error",
    "quotes": [
      "error",
      "single"
    ],
    "semi": "error",
    "prefer-template": "error",
    "jsx-quotes": "error",
    "no-var": "error",
    "eol-last": "error"
  }
}
```

## Adding Jest Test with Snapshots

Instale a dependência:

```sh
yarn add --dev react-test-renderer
```

Exemplo de *test* utilizando *snapshot* para o `App.test.js`.

```js
import React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import App from './App.js';

describe('Our first snapshot test', () => {
  it('Should compare the component with a snapshot', () => {
    const component = ReactTestRenderer.create(<App />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
```