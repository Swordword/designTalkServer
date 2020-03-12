var ImageSchema = new mongoose.Schema({
    name: String,
    url: String,
    originHref: String
})
// 构造文档document的class
module.exports = mongoose.model('ImageModel', ImageSchema)
 