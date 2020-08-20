const Router = require('koa-router')
const router = new Router()
const { imageList,image } = require('../controllers/dribbble')
router.get('/imageList',imageList)
router.get('/image',image)

module.exports = router