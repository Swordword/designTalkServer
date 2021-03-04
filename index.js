const Koa = require('koa')
const app = new Koa()
const pino = require('pino')()
// pino.pretty({
//   formatter: (logs, options) => {
//     return `${options.asColoredText(
//       { level: 10 },
//       `[${new Date().toISOString()}]`
//     )} ${options.prefix.toLowerCase()} ${logs.msg}`
//   },
// })
const koaPino = require('koa-pino-logger')
app.use(koaPino())
const koaBody = require('koa-body')
app.use(koaBody())
const routing = require('./routes')
routing(app)
app.listen(8012, function () {
  pino.info('启动')
})
