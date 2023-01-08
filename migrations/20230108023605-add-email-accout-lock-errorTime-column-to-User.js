'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    try {
     await queryInterface.addColumn('Users','email',{
        type:Sequelize.STRING
      })
      await queryInterface.addColumn('Users','account',{
        type:Sequelize.STRING
      })
      await queryInterface.addColumn('Users','errorTimes',{
        type:Sequelize.INTEGER,
        defaultValue:5,
        validate:{
          min:0,
          max:5
        }
      })
      await queryInterface.addColumn('Users','lock',{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      })  
    } catch (error) {
      console.log(error)
    }
   
  },

  async down (queryInterface, Sequelize) {
    try {
     await queryInterface.removeColumn("Users","email")
     await queryInterface.removeColumn("Users","account")
     await queryInterface.removeColumn("Users","errorTimes")
     await queryInterface.removeColumn("Users","lock")
    } catch (error) {
      console.log(error)
    }
   
  }
};
