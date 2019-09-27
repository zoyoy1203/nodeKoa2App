const Koa = require('koa');
const parser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');


const app = new Koa();

app.use(parser());
//全局异常处理
app.use(catchError);

// require('./app/models/classic')  //创建表
// require('./app/models/hot-book') 
InitManager.initCore(app);

app.listen(3000);
