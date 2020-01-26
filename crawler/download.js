const fs = require('fs')
const request = require('superagent')
async function downImg(url, path) {
	const defaultPath = process.cwd() + '/storage'
	let dirname = path || defaultPath
	// 判断是否已有文件夹 没有则新建
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname)
	}
	try {
		await request(url).pipe(
			fs.createWriteStream(defaultPath
        + '/' + url.split('cdn.dribbble.com/users/')[1].replace(/\//g, '')
			)
		)
	} catch (error) {
		console.log(error)
	}
}

exports.download = downImg
