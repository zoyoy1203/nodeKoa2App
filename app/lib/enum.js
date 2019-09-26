
//模拟枚举

function isThisType(val){
    for(let key in this){
        if(this[key] === val){
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM:100, //小程序登录
    USER_EMAIL:101,       //邮箱
    USER_MOBILE:102,      //手机号
    ADMIN_EMAIL:200,  //管理员登录
    isThisType
}

const ArtType = {
    MOVIE:100,
    MUSIC:200,
    SENTENCE:300,
    BOOK:400,
    isThisType
  }
  

module.exports = {
    LoginType,
    ArtType
}