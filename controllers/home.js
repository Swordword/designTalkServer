const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')
class homeCtl {
  async index(ctx) {
    const data = await new Promise(resolve => {
      let item
      item = []
      var url = 'https://www.dytt8.net'
      superagent
        .get(url + '/index0.html')
        .charset('gbk')
        .buffer(true)
        .end((err, data) => {
          if (err) {
            throw err
          }
          const $ = cherrio.load(data.text)
          $('.bd3rl .co_area2').each(function(i, element) {
            if (i > 1) {
              return
            }
            let $element = $(element)
            $element.find('tr').each((i1, ele) => {
              let $ele = $(ele)
              item.push({
                href: $ele.find('a').attr('href'),
                name: $ele.find('a').text()
              })
            })
          })
          ctx.statusCode = 200
          resolve(item)
        })
    })
    console.log('item', data)
    ctx.body = data
  }
  getMovies() {}
}
module.exports = new homeCtl()
