const { resolve, dirname } = require('path')
const ls = require('./ls')
const co = require('co')
const cac = require('cac')
const cp = require('child_process')

class Cmd {
  constructor(opts) {
    this.$opts = opts || {}
    this.$cli = cac()
  }

  // parse cmd
  parse() {
    // load cmds
    const cmdsDir = resolve(dirname(process.mainModule.filename), '../command')
    this.load(cmdsDir)
    // parse
    this.$cli.parse()
  }

  // add cmd
  add(name, entry) {
    this.$cli.command(name, entry.options, (input, flags) => {
      flags._ = input
      const self = this
      return co(function*() {
        yield entry.run(flags, self)
      }).catch(err => console.error(err))
    })
  }

  // load cmds
  load(fullPath) {
    const cmds = ls(fullPath)
    cmds.map(file => {
      const cmd = file.replace(/\.js$/, '')
      const entry = require(resolve(fullPath, file))
      this.add(cmd, entry)
    })
    return this
  }

  fork(modulePath, args = [], opts = {}) {
    opts.stdio = opts.stdio || 'inherit'
    return new Promise((resolve, reject) => {
      const proc = cp.fork(modulePath, args, opts)
      proc.once('error', (err) => reject(err))
      proc.once('exit', (code) => {
        if (code !== 0) {
          return reject(new Error(`${modulePath} ${args.join(' ')} exit with code ${code}`))
        }
        resolve()
      })
    })
  }
}

module.exports = new Cmd
