# easy-cmd

Easy to build command tool.

```shell
npm install easy-cmd --save-dev
```

### Usage

`bin/xxx.js`

```javascript
#!/usr/bin/env node
const Cmd = require('easy-cmd')
new Cmd().run()
```

`command/sub-cmd.js`

```javascript
module.exports = function* (cmd) {
  const argv = cmd.argv
  // execute node module
  yield cmd.fork('module-path', args, options)
}
```
