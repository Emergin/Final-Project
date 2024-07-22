const db = require('../config/db');

const SchoolSupervisor = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS SchoolSupervisors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        phoneNumber VARCHAR(255),
        nationalId VARCHAR(255)
      )
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error creating SchoolSupervisors table:', err);
      } else {
        console.log('SchoolSupervisors table created successfully');
      }
    });
  }
};

module.exports = SchoolSupervisor;
