// 定时器爬虫获取图片
var schedule = require('node-schedule')
var craw = require('./func')
let imageList
async function aa() {
	imageList = await craw.test()
	console.log('111', imageList)
}
aa()

// var j = schedule.scheduleJob('/5 * * * * *', function() {
// 	console.log('111')
// })
