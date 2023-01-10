require("dotenv").config()
module.exports = 
{
  development: {
    "username": process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_DATABASE,
    "host": process.env.DEV_DB_HOST,
    "dialect":process.env.DEV_DB_DIALECT,
    "timezone":process.env.DEV_DB_TIMEZONE 
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    "username": process.env.PRO_DB_USERNAME,
    "password": process.env.PRO_DB_PASSWORD,
    "database": process.env.PRO_DB_DATABASE,
    "host": process.env.PRO_DB_HOST,
    "dialect":process.env.PRO_DB_DIALECT,
    "timezone":process.env.PRO_DB_TIMEZONE 
  }
} 
