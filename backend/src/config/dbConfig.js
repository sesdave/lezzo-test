
module.exports = {
    "username": process.env.MYSQL_USER || 'root',
    "password": process.env.MYSQL_PASSWORD || '',
    "database": process.env.MYSQL_NAME || 'shop_db',
    "host": process.env.MYSQL_HOST || 'localhost',
    "port": process.env.MYSQL_PORT || 3306,
    "dialect": "postgres",
    sequelizeParams: {
      dialect: "mysql",
      host: process.env.MYSQL_HOST,
      logging: true,
      port: process.env.MYSQL_PORT,
      
      timezone: "+01:00",
    },
} 