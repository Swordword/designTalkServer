const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const cherrio = require('cheerio')

exports.test = async function() {
	const hostServer = 'https://dribbble.com/'
	return await new Promise(resolve => {
		let item
		item = []
		superagent
			.get(hostServer)
			.charset()
			.buffer(true)
			.end((err, data) => {
				if (err) {
					throw err
				}
				const $ = cherrio.load(data.text)
				$('.dribbble-img').each((i, element) => {
					if (i > 300) {
						return
					}
					const $element = $(element)

					item.push({
						href: $element.find('source').attr('srcset'),
						name: $element.find('img').attr('alt')
					})
				})
				resolve(item)
			})
	})
}
