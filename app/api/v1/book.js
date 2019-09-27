const Router = require('koa-router');
const {HotBook} = require('../../models/hot-book')

const router = new Router({
    prefix: '/v1/book'
  })

  //获取热门图书相关信息
router.get('/hot_list', async (ctx,next) => {
    const books = await HotBook.getAll()
    ctx.body = books
})

module.exports = router;