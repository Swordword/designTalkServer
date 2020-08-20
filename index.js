const Koa = require('koa')
const koaBody = require('koa-body')
const parameter = require('koa-parameter')

const app = new Koa()
const routing = require('./routes')
app.use(koaBody())
app.use(parameter(app))
routing(app)
app.listen(8012, function () {
  console.log('启动')
})
