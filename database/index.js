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
        }).catch((err) => {
            console.log('连接失败')
        });
    }
    handleSuccess(item) {
       
    }
}

module.exports = DataBase
