const Router = require('koa-router');
const requireDirectory = require('require-directory');

class InitManager{
    static initCore(app){
        //入口方法
        InitManager.app = app;
        InitManager.initLoadRouters();
        // InitManager.loadHttpException();
    }
    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`
        //路由自动加载
        requireDirectory(module, apiDirectory,{
            visit: whenLoadModule
        });
         
        function whenLoadModule(obj) {
            if(obj instanceof Router){
                InitManager.app.use(obj.routes())
            }
        }
        
    }

    //全局导入（看情况）
    // static loadHttpException(){
    //     const errors = require('./http-exception');
    //     global.errs = errors;
    // }

}

module.exports = InitManager;