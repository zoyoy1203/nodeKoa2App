const {
    sequelize
  } = require('../../core/db')
  const {
    Sequelize,
    Model
  } = require('sequelize')
  
  class Comment extends Model {
    static async addComment(bookId, content) {
      const comment = await Comment.findOne({
        where: {
          bookId,
          content
        }
      })
      if (!comment) {
        return await Comment.create({
          bookId,
          content,
          nums: 1
        })
      } else {
        return await comment.increment('nums', {
          by: 1
        })
      }
    }
  
    static async getComments(bookId) {
      const comments = await Comment.findAll({
        where: {
          bookId
        }
      })
      return comments
    }
  
    // toJSON() {
    //   return {
    //     content: this.getDataValue('content'),
    //     nums: this.getDataValue('nums')
    //   }
    // }
  }

//   Comment.prototype.exclude = ['bookId','id']  //去除字段（不推荐在原型上直接使用：代码写死了）
  
  Comment.init({
    content: Sequelize.STRING(12),
    nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    bookId: Sequelize.INTEGER,
  }, {
    sequelize,
    tableName: 'comment'
  })
  
  module.exports = {
    Comment
  }