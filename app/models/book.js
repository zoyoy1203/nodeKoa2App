const axios = require('axios')
const util = require('util')
const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')
const {Favor} = require('../models/favor')

class Book extends Model{
    constructor(){
        super()
    }
    static async detail(id) {
        const url = util.format(global.config.booksUrl.detailUrl, id)
        const detail = await axios.get(url)
        return detail.data
    }

    static async getMyFavorBookCount(uid){
        const count = await Favor.count({  //.count  sequelize的求数量
            where:{
                type:400,
                uid
            }
        })
        return count
    }

    static async searchFromYuShu(q,start,count,summary=1){
        const url = util.format(
            global.config.yushu.keywordUrl,encodeURI(q),count,start,summary)
        const result = await axios.get(url)
        return result.data
    }
}

Book.init({
    id:{
        type:Sequelize.STRING,
        primaryKey:true
    },
    fav_nums:{
        type:Sequelize.INTEGER,
        default:0
    }
},{
    sequelize,
    tableName:'book'
})

module.exports = {
    Book
}