'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.hasMany(models.Sale, { foreignKey: 'userId' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'moderator', 'client'),
      allowNull: false,
      defaultValue: 'client'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};