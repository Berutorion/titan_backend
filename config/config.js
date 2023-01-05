require("dotenv").config()
module.exports = 
{
  development: {
    "username": "root",
    "password": "26604079",
    "database": "Attendance",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone":"+08:00"
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  production: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect":process.env.DB_DIALECT,
    "timezone":process.env.DB_TIMEZONE 
  }
} 
