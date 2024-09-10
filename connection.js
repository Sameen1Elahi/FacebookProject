const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uthe@rakh1Q",
    database: "database1"
});

module.exports = connection;