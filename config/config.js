

module.exports = {
    //prod 生产环境  dev开发环境
    environment:'dev',
    database:{
        dbName:'db_nodekoa',
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456',
    },
    security:{
        secretKey:"abcdefg",//要复杂无规律
        expiresIn:60*60*24*30   //令牌过期时间：1小时60*60
    }
}