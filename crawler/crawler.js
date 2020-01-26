const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')

module.exports = function () {
  return new Promise(resolve => {
    let result = []
    var url = 'https://dribbble.com'
    superagent
      .get(url)
      .charset()
      .buffer(true)
      .end((err, data) => {
        if (err) {
          throw err
        }
        // 获取单个页面的图片
        getSingleImg()
      })
    console.log('result11', result)

    resolve(result)
  })
}

getSingleImg(){

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
      .end((err, data2) => {
        if (err) {
          throw err
        }
        const $1 = cherrio.load(data2.text)
        console.log('AAAA', $1('.media-content img'))

        item.push({
          name: $1('.shot-title').text(),
          href: $1('.media-content img').attr('data-src')
        })
        console.log('itemin', item)
      })
  })
  console.log('item11', item)

}
// 判断url start with http
function checkUrl(url) { }
