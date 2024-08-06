// db.js

const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'attachment_db',
    password: 'Trubel112',
});


module.exports = pool;