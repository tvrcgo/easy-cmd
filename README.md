# easy-cmd

Easy to build command tool.

```shell
npm install easy-cmd --save-dev
```

### Usage

Entry in `bin/xxx.js`

```javascript
#!/usr/bin/env node
const Cmd = require('easy-cmd')
new Cmd().run()
```

Command

```javascript
module.exports = (argv, cmd) => {
  
}
```