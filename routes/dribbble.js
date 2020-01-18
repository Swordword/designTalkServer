const Router = require('koa-router');
const router = new Router();
const { index,type } = require('../controllers/dribbble');
router.get('/', index);
router.get('/:type',type)

module.exports = router;