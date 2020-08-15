const fs = require('fs')
const request = require('superagent')
const defaultDirPath = '/opt/images/'

if (!fs.existsSync(defaultDirPath)) {
  fs.mkdirSync(defaultDirPath)
}

async function download(url) {
  const urlSplit = url.split(/\//g)
  await request(url).pipe(
    fs.WriteStream(
      defaultDirPath + urlSplit[urlSplit.length - 1]
    )
  )
  console.log('下载成功')
    
}

module.exports = download