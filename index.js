const Koa = require('koa')
const koaBody = require('koa-body')
const parameter = require('koa-parameter')
const path = require('path')
const app = new Koa()
const routing = require('./routes')
app.use(koaBody({
	multipart: this,
	formidable: {
		uploadDir: path.join(__dirname, '/public/uploads'),
		keepExtensions: true,
	},
}))
app.use(parameter(app))
routing(app)
app.listen(3456, function () {
	console.log('启动')
})
