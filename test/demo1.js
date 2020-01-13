const Koa = require('koa'),
  Router = require('koa-router'),
  cheerio = require('cheerio'),
  charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  app = new Koa(),
  router = new Router();
let arr;

router.get('/', (ctx, next) => {
  url = 'http://shop.bytravel.cn/produce/index226.html'; //target地址
  superagent.get(url)
    .charset('gbk')  // 当前页面编码格式
    .buffer(true)
    .end((err, data) => { //页面获取到的数据
      if (err) {
        // return next(err); 
        console.log('页面不存在', err)
      }
      let html = data.text,
        $ = cheerio.load(html, {
          decodeEntities: false,
          ignoreWhitespace: false,
          xmlMode: false,
          lowerCaseTags: false
        }), //用cheerio解析页面数据
      obj = {};
      arr = [];
      // cheerio的使用类似jquery的操作
      $("table tbody").each((index, element) => {
        let $element = $(element);
        $element.find('#tctitle').next().find('a').addClass('link').attr('class', 'link').text('')
        arr.push({
          'title': $element.find('a.blue14b').text(),
          'image': $element.find('#bright img').attr('src'),
          'summary': $element.find('#tctitle').next().text(),
          'is_cgiia': $element.find('#tctitle font').attr('color') === 'green' ? 1 : 0
        })
      })
    })
  ctx.body = arr
  // console.log(arr)
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3010, () => {
  console.log('[服务已开启,访问地址为：] http://127.0.0.1:3010/');
});