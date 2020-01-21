// 定时器爬虫获取图片
const crawlerFunc = require('./crawler')
const { download } = require('./download')
crawlerFunc().then((result) => {
	console.log('result', result)
	result.forEach(async (item) => {
		await download(item.href)
	})
}).catch((err) => {
	throw err
})
