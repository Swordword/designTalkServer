const charset = require('superagent-charset'),
	superagent = charset(require('superagent')),
	cherrio = require('cheerio')
const { download } = require('./download')
// const dataServer = require('../database/index')

module.exports = function () {
	var url = 'https://dribbble.com'
	superagent
		.get(url)
		.charset()
		.buffer(true)
		.end((err, data) => {
			if (err) {
				throw err
			}
			const $ = cherrio.load(data.text)
			let item = []
			$('.dribbble-img').each(function (i, element) {
				if (i > 3) {
					return
				}
				let $element = $(element)
				let linkUrl = $element.find('.dribbble-link').attr('href')
				superagent
					.get(url + linkUrl)
					.charset()
					.buffer(true)
					.end(async (err, data2) => {
						if (err) {
							throw err
						}
						const $1 = cherrio.load(data2.text)
						let href = $1('.media-content img').attr('data-src')
						if (href) {
							const defaultPath = process.cwd() + '/images'
							// 获取存储路径
							let storagePath = defaultPath
								+ '/' + href.split('cdn.dribbble.com/users/')[1].replace(/\//g, '')
							item.push({
								name: $1('.shot-title').text(),
								href: href,
								storePath: storagePath
							})
							await download(href)
							// dataServer.handleSuccess({
							// 	name: $1('.shot-title').text(),
							// 	originHref: href,
							// 	storePath: storagePath
							// })
						}
					})
			})
		})
}

