'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AttendanceSheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     jobId:{
        type:Sequelize.INTEGER
      },
      checkIn: {
        type: Sequelize.DATE
      },
      checkOut: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('active','Inactive','error'),
          /**
     * 未打卡 => null
     * 打了上班卡 => error
     * 打了上班卡，未打下班卡 => error
     * 打了上班卡，打下班卡 => active
     * 打了上班卡，打下班卡，但工作時間未滿8小時 => Inactive
     */
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AttendanceSheets');
  }
};