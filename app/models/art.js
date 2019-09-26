
const {flatten} = require('lodash')
const {Op} = require('sequelize')
const {Movie,Sentence,Music} = require('../models/classic')


class Art{

    constructor(art_id, type) {
        this.art_id = art_id
        this.type = type
    }

    async getDetail(uid){
        const {Favor} = require('./favor')
        const art = await Art.getData(this.art_id,this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }
        const like = await Favor.userLikeIt(
            this.art_id,this.type,uid
        )
        return {
            art,
            like_status:like
        }
    }

    static async getList(artInfoList){
        const artInfoObj = {
            100:[],
            200:[],
            300:[]
        }
        for(let artInfo of artInfoList){
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for(let key in artInfoObj){
            const ids = artInfoObj[key]
            if(ids.length === 0){
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key)) 
        }
        return flatten(arts)  //将二维数组展开成一维数组

    }

    static async _getListByType(ids, type){
        let arts = [];
        const finder = {
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        }
        switch (type) {
            case 100:
                arts = await Movie.findOne(finder)
                break;
            case 200:
                arts = await Music.findOne(finder)
                break;
            case 300:
                arts = await Sentence.findOne(finder)
                break;
            case 400:
                break;
            default:
                break;
        }
        return arts;
    }

    static async getData(art_id, type, useScope=true){

        let art = null;
        const finder = {
            where:{
                id:art_id
            }
        }


        switch (type) {
            case 100:
                art = await Movie.findOne(finder)
                break;
            case 200:
                art = await Music.findOne(finder)
                break;
            case 300:
                art = await Sentence.findOne(finder)
                break;
            case 400:
                break;
            default:
                break;
        }
        return art;
    }
}

module.exports = {
    Art
}