const Koa = require('koa');
const Router = require('koa-router');
const requireDirectory = require('require-directory');

const app = new Koa();
requireDirectory(module, './app/api',{
    visit: whenLoadModule
});
 
function whenLoadModule(obj) {
    if(obj instanceof Router){
        app.use(obj.routes())
    }
}
//注册
// app.use(book.routes());
// app.use(classic.routes());


app.listen(3000);
