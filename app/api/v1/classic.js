const Router = require('koa-router');
const {Flow} = require('../../models/flow');
const {Art} = require('../../models/art');
const { Favor} = require('../../models/favor')
const router = new Router({
    prefix:'/v1/classic'
});
const {PositiveIntegerValidator, ClassicValidator} = require('../../validators/validator');
const {Auth} = require('../../../middlewares/auth')

//获取最新期刊
router.get('/latest',new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })

    const art = await Art.getData(flow.art_id, flow.type)
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('likeStatus', likeLatest)
    ctx.body = art

})
//获取期刊下一期
router.get('/:index/next',new Auth().m,async ctx =>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where:{
            index: index+1
        }
    })
    if(!flow){
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id,flow.type)
    const likeNext = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('likeStatus',likeNext)
    // art.exclude = ['index','likeStatus'] //去掉相应字段
    ctx.body = art
})

//获取期刊上一期
router.get('/:index/previous',new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id:'index'
    })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where:{
            index: index-1
        }
    })
    if(!flow){
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id,flow.type)
    const likePrevious = await Favor.userLikeIt(flow.art_id,flow.type,ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('likeStatus', likePrevious)
    ctx.body = art




})


//获取期刊详情信息
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
  
    const artDetail = await new Art(id,type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status',artDetail.like_status)
    ctx.body =artDetail.art
})

//获取期刊的点赞情况
router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    
    const artDetail = await new Art(id,type).getDetail(ctx.auth.uid)
    ctx.body = {
        favNums: artDetail.art.favNums,
        likeStatus: artDetail.like_status
    }
})

//获取用户喜欢的期刊
router.get('/favor', new Auth().m, async ctx=>{
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})

module.exports = router;