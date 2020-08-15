exports.parseImageName = function (url){
  const urlSplit = url.split(/\//g)
  return urlSplit[urlSplit.length-1]
}