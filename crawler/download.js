const fs = require('fs')
const request = require('superagent')
async function downImg(url, path) {
  let dirname = path || 'storage'
  // 判断是否已有文件夹 没有则新建
  if (fs.existsSync(dirname)) {
  } else {
    fs.mkdirSync(dirname)
  }
  await request(url).pipe(fs.createWriteStream(
    url.split('cdn.dribbble.com/users/')[1].replace(/\//g,'str')
  ))
}

exports.download = downImg
