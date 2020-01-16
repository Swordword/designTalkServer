const Router = require('koa-router')
const router = new Router({ prefix: '/topics' });
const {index,type}=require('../controllers/behance')
router.get('/', index);
router.get('/:type',type)
module.exports = router
