const charset = require('superagent-charset'),
	superagent = charset(require('superagent')),
	cheerio = require('cheerio')
const download = require('./download')
const DribbbleImages = require('../database/dribbble')

module.exports = function () {
	const baseUrl = "https://dribbble.com/shots/popular/web-design/"
	const url = 'https://dribbble.com/shots/popular'
	superagent
		.get(url)
		.charset()
		.buffer(true)
		.end((err, data) => {
			if (err) {
				throw err
			}
			const $ = cheerio.load(data.text)
			let items = []
			$('.shot-thumbnail').each(function (i, element) {
				if (i > 300) {
					return
				}
				let $element = $(element)
				let linkUrl
				try {
					linkUrl = $element.find('.dribbble-link').attr('href')
				} catch (err) {

				}
				// 若没有linkUrl，则返回
				if (!linkUrl) return

				console.log(`${baseUrl}${linkUrl}`)
				superagent
					.get(baseUrl + linkUrl)
					.charset()
					.buffer(true)
					.end(async (err, data2) => {
						if (err) {
							throw err
						}
						const $1 = cheerio.load(data2.text)
						let href = $1('.media-content img').attr('data-src')
						if (href) {
							const defaultPath = process.cwd() + '/images'
							// 获取存储路径
							let storagePath = defaultPath
								+ '/' + href.split('cdn.dribbble.com/users/')[1].replace(/\//g, '')
							items.push({
								name: $1('.shot-title').text(),
								href: href,
								storePath: storagePath
							})
							await download(href)
							DribbbleImages.add({
								name: $1('.shot-title').text(),
								originHref: href,
								storePath: storagePath
							})
						}
						// console.log("items", items);

					})
			})
		})
}

