const  router = require('koa')
router.get('/v1/classic/latest', (ctx, next) => {
    ctx.body = {
        key: 'classic'
    }
})