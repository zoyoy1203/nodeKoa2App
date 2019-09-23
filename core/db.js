const Sequelize = require('sequelize');
const {
    dbName,
    host,
    port,
    user,
    password,
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:true, //是否显示sql操作,
    timezone: '+08:00', //北京时间
    define:{

    }
})

module.exports = {
    sequelize
}