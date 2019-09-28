const {
    Sequelize,
    Model
  } = require('sequelize')
const {unset, clone, isArray} = require('lodash')
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

Model.prototype.toJSON = function () {
    let data = clone(this.dataValues)
  
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')
  
    // for (key in data) {
    //   if (key === 'image') {
    //     if (!data[key].startsWith('http'))
    //       data[key] = global.config.host + data[key]
    //   }
    // }

    //去除exclude数组里的字段
    if(isArray(this.exclude)){
        this.exclude.forEach(
            (value)=>{
                unset(data,value)
            }
        )
    }



    return data
  }

module.exports = {
    sequelize
}