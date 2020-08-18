const mysql = require('mysql')

const createDBSql = 'CREATE DATABASE IF NOT EXISTS DesignTalk CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;'

const createTableImageListSql = `
  CREATE TABLE IF NOT EXISTS ImageList(
  id INT UNSIGNED AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  thumbnail VARCHAR(200),
  originHerf VARCHAR(200),
  PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
`
const createTableImagesSql = `CREATE TABLE IF NOT EXISTS Images(
  id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(50),
  \`key\`  VARCHAR(200),
  originHerf VARCHAR(200),
  cate VARCHAR(40),
  relationId INT UNSIGNED,
  PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
`

class DB {
  constructor() {
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

    connection.query(createDBSql, (err) => {
      if (err) throw err
      console.log('创建数据库成功')
    })
    connection.query('use DesignTalk')

    connection.query(createTableImageListSql, (err) => {
      if (err) throw err
      console.log('创建ImageList成功')
    })
    connection.query(createTableImagesSql, (err) => {
      if (err) throw err
      console.log('创建Images成功')
    })
    this.connection = connection
  }
  async insert2List(obj) {
    const { title, thumbnail,originHerf} = obj
    const sql = `
    INSERT INTO ImageList (title,thumbnail,originHerf)
	    VALUES 
	  ('${title}','${thumbnail}','${originHerf}');
    `
    await this.connection.query(sql,(err)=>{
      if(err) throw err
      console.log('添加Node成功')
    })
  }
  async insert2Image(obj) {
    const { name, key, originHerf, cate, relationId } = obj
    const sql = `
    INSERT INTO Images 
    (name,\`key\`,originHerf,cate,relationId)
    VALUES
    ('${name}', '${key}', '${originHerf}', '${cate}', '${relationId}');
    `
    await this.connection.query(sql,(err)=>{
      if(err) throw err
      console.log('添加image成功')
    })

  }
}






module.exports = new DB()

/**
 * INSERT INTO imageList (title,date)
	VALUES
  ('测试标题3',NOW());

  INSERT INTO images
	(title, `key`, originHerf, relationId,cate)
	VALUES
	('测试图片2','h',2);

 */