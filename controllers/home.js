const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')
class homeCtl {
  async index(ctx) {
    // ctx.body = '<h1>这是a a主页</h1>'
    let item
    item = []
    // var url = 'https://www.dytt8.net/index0.html'
    let data= await superagent
      .get('http://127.0.0.1:5500/practice.html')
      .charset('gbk')
      .buffer(true)
      .end((err, data) => {
        if (err) {
          throw err
        }
        const $ = cherrio.load(data.text)
        let apple=$('.apple').text()
        console.log("apple",apple);
        ctx.body = 'apple'
      })
  }
  getMovies() {}
}
module.exports = new homeCtl()
