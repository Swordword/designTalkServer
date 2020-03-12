let mongoose = require('mongoose')
const server = 'localhost'
const database = 'dribbbleImages'

class DataBase {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`, { useUnifiedTopology: true, useNewUrlParser: true }).then((result) => {
            console.log('连接成功')
            var ImageSchema = new mongoose.Schema({
                name: String,
                url: String,
                originHref: String
            })
            // 构造文档document的class
            this.Image = mongoose.model('ImageModel', ImageSchema)
        }).catch((err) => {
            console.log('连接失败')
        });
    }
    handleSuccess(item) {
        const Image = this.Image
        new Image({
            name: item.name,
            url: item.storePath,
            originHref: item.originHref
        }).save(function (err) {
            if (err) return console.log(err)
        })
    }
}

module.exports = new DataBase()
