const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')
class homeCtl {
  index(ctx) {
    // ctx.body = '<h1>这是a a主页</h1>'
    var item
    item = []
    var url = 'https://dribbble.com/'
    superagent
      .get(url)
      .charset('gbk')
      .buffer(true)
      .end((err, data) => {
        if (err) {
          throw err
        }
        const $ = cherrio.load(data.text)
        console.log('easy')
        console.log('data', $)
        $('.main-full ol').forEach((index, element) => {
          let $element = $(element)
          item.push($element.find('.dribbble-link').attr('href'))
        })
        console.log('item',item)
        ctx.body = item
      })
  }
  getMovies() {}
}
module.exports = new homeCtl()
