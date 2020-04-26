const DataBase = require('./index')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

class DribbbleImages extends DataBase {
	constructor() {
		super()
		this._create()
	}
	_create() {
		var ImageSchema = new Schema({
			name: String,
			url: String,
			originHref: String,
		})
		// 构造文档document的class
		this.Image = mongoose.model('dribbble', ImageSchema)
	}
	/**
	 * @description 添加dribbble图片
	 * @param {*} item 图片信息
	 */
	add(item) {
		const Image = this.Image
		new Image({
			name: item.name,
			url: item.storePath,
			originHref: item.originHref,
		}).save(function (err) {
			if (err) return console.log(err)
		})
	}
	delete() {}
	upate() {}
	async find() {
		const Image = this.Image
		let res = await Image.find()
		console.log('res', res)
		return res
	}
}

module.exports = new DribbbleImages()
