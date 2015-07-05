# Node Named Modules

> Allows you to specify aliases for your module paths

> Source from [grunt-named-modules](https://github.com/jrf0110/grunt-named-modules)

## Getting Started

Install:
```shell
npm install node-named-modules --save
```

In ```package.json``` specify paths to your modules in ```namedModules``` section:
```javascript
  ...
  "namedModules": {
    "utils": "lib/utils.js",
    "shims": "lib/shims.js",
    "configs": "configs/" // <-- alias a directory
  },
  ...
```

Call it in entry point (in gulp, grunt, npm script, etc):
```js
require('node-named-modules')();
```

And... Require modules by name in your code
