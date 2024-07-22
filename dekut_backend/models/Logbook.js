const db = require('../config/db');

const Logbook = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Logbook (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentId INT,
        day VARCHAR(255),
        activity TEXT,
        help TEXT,
        assignedActivity TEXT
      )
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error creating Logbook table:', err);
      } else {
        console.log('Logbook table created successfully');
      }
    });
  }
};

module.exports = Logbook;
