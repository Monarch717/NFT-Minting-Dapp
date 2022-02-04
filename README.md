# MouthBreathers FrontEnd

### Configuration

- `/src/consts/index.js`
```javascript
const contracts = {
    [ChainIds.homestead]: {
        nft: '0x952309485dc3981855fbF92B17ED08E2fb7dbb05',    // Update this to real deployed nft contract
        sale: '0x58e6aCCfDf934EEb5C8910421Cfc8FF95D1F5968',   // Update this to real deployed sales contract
    },
    [ChainIds.rinkeby]: {
        nft: '0x952309485dc3981855fbF92B17ED08E2fb7dbb05',
        sale: '0x58e6aCCfDf934EEb5C8910421Cfc8FF95D1F5968',
    }
};
```


- `/src/config/index.js`
```javascript
const isTestNet = true;   // Update this to false before building front-end to work with main net
```


### CRACO Related (Not important) 

Setting up Tailwind with create-react-app. After setting up your CRA Project:

```sh
npm install tailwindcss
npm install -D @craco/craco
```

Then add it to your PostCSS config (use a separate `postcss.config.js` file):

```js
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009"
      },
      stage: 3,
      features: {
        "nesting-rules": true
      }
    })
  ]
};
```

Create a file for your craco configuration (`craco.config.js`):

```js
const { POSTCSS_MODES } = require("@craco/craco");

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file
    }
  }
};
```

Change your scripts in your `package.json`:

```diff
"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```

Next, add the following in your `src/index.css` file for your Tailwind styles.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start
```

### Compiles and minifies for production

```
npm run build
```
