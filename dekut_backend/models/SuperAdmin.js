const db = require('../config/db');

const SuperAdmin = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS SuperAdmins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        phoneNumber VARCHAR(255),
        nationalId VARCHAR(255)
      )
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error creating SuperAdmins table:', err);
      } else {
        console.log('SuperAdmins table created successfully');
      }
    });
  }
};

module.exports = SuperAdmin;
