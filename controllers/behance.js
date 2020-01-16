// const charset = require('superagent-charset'),
//   superagent = charset(require('superagent')),
//   cherrio = require('cheerio')
  class homeCtl{
      async index(ctx){
          ctx.data="behance"
      }
      type(ctx){
          ctx.body="behance type"
      }
  }

  module.exports = new homeCtl()