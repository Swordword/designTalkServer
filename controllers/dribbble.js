const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')
class homeCtl {
  async index(ctx) {
    const data = await new Promise(resolve => {
      let item
      item = []
      var url = 'https://dribbble.com/'
      superagent
        .get(url)
        .charset()
        .buffer(true)
        .end((err, data) => {
          if (err) {
            throw err
          }
          const $ = cherrio.load(data.text)
          $('.dribbble-img').each(function(i, element) {
            if (i > 300) {
              return
            }
            let $element = $(element)

            item.push({
              href: $element.find('source').attr('srcset'),
              name: $element.find('img').attr('alt')
            })
          })
          resolve(item)
        })
    })
    ctx.body = 'dribbble Index'
  }
  type(ctx) {
    ctx.body = 'TYPE'
  }
}
module.exports = new homeCtl()
