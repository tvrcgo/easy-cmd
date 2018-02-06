# easy-cmd

Easy to build command tool.

```shell
npm install easy-cmd --save-dev
```

### Usage

`bin/xxx.js`

```javascript
#!/usr/bin/env node
const cli = require('easy-cmd')
cli.parse()
```

`command/sub-cmd.js`

```javascript
exports.options = {
  desc: 'command description.'
}

exports.run = function* (argv, cmd) {
  // execute node module
  yield cmd.fork('module-path', args, options)
}
```
