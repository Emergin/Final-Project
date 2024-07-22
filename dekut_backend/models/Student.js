const db = require('../config/db');

const Student = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        registrationNumber VARCHAR(255),
        course VARCHAR(255),
        company VARCHAR(255),
        county VARCHAR(255),
        subCounty VARCHAR(255),
        coordinates VARCHAR(255),
        supervisorId INT,
        phoneNumber VARCHAR(255),
        comments TEXT,
        industrialComments TEXT
      )
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error creating Students table:', err);
      } else {
        console.log('Students table created successfully');
      }
    });
  }
};

module.exports = Student;
