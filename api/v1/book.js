
router.get('/v1/book/latest', (ctx,next) => {
    ctx.body = {
        key: 'book'
    }
})