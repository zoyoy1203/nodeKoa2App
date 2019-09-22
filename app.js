const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


//注册
app.use(router.routes())

module.exports = {
    router
}

app.listen(3000)
