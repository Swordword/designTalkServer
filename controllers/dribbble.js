const charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  cherrio = require('cheerio')
class homeCtl {
  async index(ctx) {
    ctx.body = 'dribbble Index'
  }
  type(ctx) {
    ctx.body = 'TYPE'
  }
}
module.exports = new homeCtl()
