const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const {LoginType} = require('../../lib/enum')
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')

const router = new Router({
    prefix:'/v1/token'
});

router.post('/',async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    let token;
    switch (v.get('body.type')){
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'),v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
}) 

async function emailLogin(account,secret){
   const user = await User.verifyEmailPassword(account,secret)
   return token = generateToken(user.id,Auth.USER)
}

module.exports = router