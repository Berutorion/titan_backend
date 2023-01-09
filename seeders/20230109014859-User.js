'use strict'
const bcrypt = require("bcryptjs")
module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      return queryInterface.bulkInsert(
        'Users',
        [
          {
            name: 'admin',
            account: 'admin',
            email: 'berutorion1630@gmail.com',
            password: bcrypt.hashSync('tiadmin'),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'user1',
            account: 'user1',
            email: 'user1@example.com',
            password: bcrypt.hashSync('titaner'),
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'user2',
            account: 'user2',
            email: 'user2@example.com',
            password: bcrypt.hashSync('titaner'),
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      )
    } catch (error) {
      console.log(error)
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {})
  }
}