const Router = require('koa-router');
const {HotBook} = require('../../models/hot-book')
const {PositiveIntegerValidator, BooksIdValidator,SearchValidator,AddShortCommentValidator} = require('../../validators/validator');
const {Book} = require('../../models/book')
const {Favor} = require('../../models/favor')
const {Auth} = require('../../../middlewares/auth')
const {
  success
} = require('../../lib/helper')
const {
  Comment
} = require('../../models/book-comment')

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

//搜索接口
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

//新增短评
router.post('/add/short_comment', new Auth().m, async ctx=>{
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'bookId'
  })

  await Comment.addComment(v.get('body.bookId'), v.get('body.content'))
  success()
})

//获取短评
router.get('/:bookId/short_comment', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id:'bookId'
  })
  const bookId = v.get('path.bookId')
  const comments = await Comment.getComments(bookId)
  ctx.body = {
    comments: comments,
    bookId
  }
})

//获取热搜关键词
router.get('/hot_keyword', async ctx => {
  ctx.body = {
    'hot': ['Python',
      '哈利·波特',
      '村上春树',
      '东野圭吾',
      '白夜行',
      '韩寒',
      '金庸',
      '王小波'
    ]
  }
})


module.exports = router;