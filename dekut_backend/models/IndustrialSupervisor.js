const db = require('../config/db');

const IndustrialSupervisor = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS IndustrialSupervisors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        phoneNumber VARCHAR(255),
        nationalId VARCHAR(255)
      )
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error creating IndustrialSupervisors table:', err);
      } else {
        console.log('IndustrialSupervisors table created successfully');
      }
    });
  }
};

module.exports = IndustrialSupervisor;
