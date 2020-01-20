let mongoose = require('mongoose')
const server = '127.0.0.1:27017'
const database = 'fcc-Mail'

class Database {
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
}


module.exports = new Database()
