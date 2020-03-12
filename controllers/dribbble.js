const DribbbleModel = require('../database/dribbble')
class homeCtl {
  async index(ctx) {
    let res = await DribbbleModel.find()
    ctx.body = res
  }
  type(ctx) {
    ctx.body = 'TYPE'
  }
}
module.exports = new homeCtl()
