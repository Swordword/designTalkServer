const fs = require('fs')
const request = require('superagent')
function downImg(url, path) {
  let dirname = path || 'storage'
  // 判断是否已有文件夹 没有则新建
  if (fs.existsSync(dirname)) {
  } else {
    fs.mkdirSync(dirname)
  }
  request(url).pipe(fs.createWriteStream(dirname))
}

exports.download = downImg
