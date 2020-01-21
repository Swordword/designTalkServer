const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')

module.exports = function () {
  return new Promise(resolve => {
    let item
    item = []
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
        $('.dribbble-img').each(function (i, element) {
          if (i > 3) {
            return
          }
          let $element = $(element)
          let linkUrl = $element.find('.dribbble-link').attr('href')
          console.log('linkUrl', url + linkUrl)
          superagent.get(url + linkUrl).charset().buffer(true).end((err, data2) => {
            if (err) {
              throw err
            }
            const $1 = cherrio.load(data2.text)
            item.push({
              name: $1('.shot-title').text(),
              href: $1('.media-image img').attr('src'),
            })
            console.log('item1',item)
          })

        })
        resolve(item)
      })
  })
}

// 判断url start with http
function checkUrl(url) {

}
