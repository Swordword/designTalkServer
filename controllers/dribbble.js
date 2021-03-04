const query = require('../lib')

class homeCtl {
  async image(ctx) {
    ctx.log.info('api image', ctx.query)
    const { relationId } = ctx.query
    const SQL = `
    SELECT * FROM Images WHERE relationId=${relationId};`
    let res
    try {
      res = await query(SQL)
      ctx.body = {
        code: 0,
        msg: '请求成功',
        data: res,
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '请求失败',
      }
    }
  }
  async imageList(ctx) {
    ctx.log.info('api imageList')
    const SQL = `
    SELECT * FROM ImageList;
    `
    let res
    try {
      res = await query(SQL)
      ctx.body = {
        code: 0,
        msg: '请求成功',
        data: res,
      }
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '请求失败',
      }
    }
  }
}
module.exports = new homeCtl()
