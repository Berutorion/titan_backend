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
      // define association here
      User.hasMany(models.AttendanceSheet,{foreignKey:'jobId'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    email:DataTypes.STRING,
    account:DataTypes.STRING,
    errorTimes:DataTypes.INTEGER,
    lock:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};