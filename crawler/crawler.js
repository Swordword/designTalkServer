const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')

module.exports = function() {
  return new Promise(resolve => {
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
          if (i > 30) {
            return
          }
          let $element = $(element)
          item.push({
            href: $element.find('source').attr('srcset'),
            name: $element.find('img').attr('alt'),
          })
        })
        resolve(item)
      })
  })
}
