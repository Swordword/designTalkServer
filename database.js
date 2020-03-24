let mongo = require('mongoose')
const server = '127.0.0.1:27017'
const database = 'fcc-Mail'
class Database{
    // 测试提交
    constructor() {
        this._connect()
    }
    _connect(){
        mongo.connect(`mongodb://${server}/${database}`).then((result) => {
            console.log('连接成功',result)
        }).catch((err) => {
            throw err
        });
    }
}

module.exports = new Database()