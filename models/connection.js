const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uthe@rakh1Q",
    database: "facebook",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    namedPlaceholders: true
});

module.exports = connection;