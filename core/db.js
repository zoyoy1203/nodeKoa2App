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
        //坑爹的没声音
        timestamps:true,
        paranoid:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true
    }
})

sequelize.sync({
    force:false  //每次数据库清空:true
});

module.exports = {
    sequelize
}