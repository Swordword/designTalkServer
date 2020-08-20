const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8w96t1W1jn@w'
})
connection.connect((err) => {
  if (err) {
    throw err
  }
  console.log('连接成功')
})
connection.query('use DesignTalk;')
let query = function(sql){
  return new Promise((resolve,reject)=>{
    connection.query(sql,(err,rows)=>{
      if(err){
        reject(err)
      }
      resolve(rows)
    })
  })
}
module.exports = query