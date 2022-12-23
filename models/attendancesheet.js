'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttendanceSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttendanceSheet.belongsTo(models.User,{foreignKey:'jobId'})
    }
  }
  AttendanceSheet.init({
    jobId:DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    status: DataTypes.ENUM('active','Inactive','error')
  }, {
    sequelize,
    modelName: 'AttendanceSheet',
  });
  return AttendanceSheet;
};