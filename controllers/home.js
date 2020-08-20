const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const cherrio = require('cheerio')

class homeCtl {
    async index(ctx) {
        const data = await new Promise((resolve) => {
            let item
            item = []
            const url = 'https://dribbble.com/'
            superagent
                .get(url)
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
                            name: $element.find('img').attr('alt'),
                        })
                    })
                    resolve(item)
                })
        })
        console.log('data', data)
        ctx.body = data
    }
}
module.exports = new homeCtl()
