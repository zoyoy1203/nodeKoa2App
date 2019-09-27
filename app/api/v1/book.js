const Router = require('koa-router');
const {HotBook} = require('../../models/hot-book')
const {PositiveIntegerValidator, BooksIdValidator,SearchValidator} = require('../../validators/validator');
const {Book} = require('../../models/book')
const {Favor} = require('../../models/favor')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/book'
  })

  //获取热门图书相关信息
router.get('/hot_list', async (ctx,next) => {
    const books = await HotBook.getAll()
    ctx.body = books
})

//获取书籍详情
router.get('/:id/detail',async ctx=>{
    const v = await new BooksIdValidator().validate(ctx)
    const book = await Book.detail(v.get('path.id'))
    ctx.body = book
})

router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(v.get('query.q'),v.get('query.start'),v.get('query.count'))
    ctx.body=result
})

//获取喜欢书籍的数量
router.get('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
      count
    }
})
  
//获取每本书籍的点赞数量
router.get('/:bookId/favor', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
      id: 'bookId'
    })
    const favor = await Favor.getBookFavor(
      ctx.auth.uid, v.get('path.bookId'))
    ctx.body = favor
})

module.exports = router;