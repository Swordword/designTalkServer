const charset = require("superagent-charset");
const superagent = charset(require("superagent"));
const cheerio = require("cheerio");
const DB = require("./db");
const { parseImageName } = require("./lib");

const download = require("./download");
const baseURL = "https://dribbble.com/";
const URL = "https://dribbble.com/shots/popular/web-design/";
/**
 * TODO: 爬取页面
 */
superagent
  .get(URL)
  .charset()
  .buffer(true)
  .then((data) => {
    const $ = cheerio.load(data.text,{decodeEntities: false});
    $(".shot-thumbnail").each(async function (i, element) {
      //TODO:将图片列表（title、date、封面图）存入imageList数据库，赋予id
      // TODO:下载封面图片
      if (i > 20) {
        return;
      }
      const $element = $(element);

      const title = $element.find(".shot-title").text();
      console.log("title:", title);
      const thumbnail =
        $element.find("img").attr("src") || $element.find("video").attr("src");
      // 下载缩略图
      download(thumbnail);

      // 获取缩略图
      const imageName = parseImageName(thumbnail);

      const imgLink = $element.find(".dribbble-link").attr("href");

      const nodeObj = {
        title,
        thumbnail: imageName,
        originHerf: thumbnail,
      };
      await DB.insert2List(nodeObj);
      if (!imgLink) return;
      getImageNode(`${baseURL}${imgLink}`);
    });
  })
  .catch((err) => {
    throw err;
  });
/**
 * 搜索子级页面
 * @param {string} pageUrl
 */
function getImageNode(pageUrl) {
  superagent
    .get(pageUrl)
    .charset()
    .buffer(true)
    .then((singleData) => {
      // TODO:根据单个单元获取产品图片列表
      const $ = cheerio.load(singleData.text,{decodeEntities: false});
      const name = $(".shot-title").text();
      // const imgHrefList = []
      $(".media-content").each(async (index, node) => {
        const $node = $(node);
        const herf =
          $node.find("img").attr("data-src") ||
          $node.find("video").attr("data-src");
        const herfSplit = herf.split(/\//g);
        const key = herfSplit[herfSplit.length - 1];
        const cate = herfSplit[herfSplit.length - 1].split(".")[1];
        const obj = {
          name,
          key: key,
          originHerf: herf,
          cate,
          relationId: 1,
        };
        await DB.insert2Image(obj);
        // 下载
        download(herf);
        // imgHrefList.push(herf)
      });
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * TODO:下载页面图片
 */

/**
 * TODO: 将数据存入数据库
 */
