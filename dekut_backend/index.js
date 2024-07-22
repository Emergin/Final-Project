const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attachment_system'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Create tables if they don't exist
const createTables = () => {
  const superAdminTable = `
    CREATE TABLE IF NOT EXISTS SuperAdmins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      phonenumber VARCHAR(255),
      nationalId VARCHAR(255)
    )
  `;

  db.query(superAdminTable, (err, result) => {
    if (err) throw err;
    console.log('SuperAdmins table created successfully');
  });

  const schoolSupervisorTable = `
    CREATE TABLE IF NOT EXISTS SchoolSupervisors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      phonenumber VARCHAR(255),
      nationalId VARCHAR(255)
    )
  `;

  db.query(schoolSupervisorTable, (err, result) => {
    if (err) throw err;
    console.log('SchoolSupervisors table created successfully');
  });

  const industrialSupervisorTable = `
    CREATE TABLE IF NOT EXISTS IndustrialSupervisors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      phonenumber VARCHAR(255),
      nationalId VARCHAR(255)
    )
  `;

  db.query(industrialSupervisorTable, (err, result) => {
    if (err) throw err;
    console.log('IndustrialSupervisors table created successfully');
  });

  const studentTable = `
    CREATE TABLE IF NOT EXISTS Students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      regNo VARCHAR(255),
      course VARCHAR(255),
      company VARCHAR(255),
      county VARCHAR(255),
      subcounty VARCHAR(255),
      coordinates VARCHAR(255)
    )
  `;

  db.query(studentTable, (err, result) => {
    if (err) throw err;
    console.log('Students table created successfully');
  });

  const logbookTable = `
    CREATE TABLE IF NOT EXISTS Logbook (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT,
      day VARCHAR(255),
      activity TEXT,
      benefit TEXT,
      assignedActivity TEXT,
      weekReport TEXT,
      FOREIGN KEY (studentId) REFERENCES Students(id)
    )
  `;

  db.query(logbookTable, (err, result) => {
    if (err) throw err;
    console.log('Logbook table created successfully');
  });
};

createTables();

// Routes
app.post('/superadmin/register', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId } = req.body;
  const query = 'INSERT INTO SuperAdmins (firstname, lastname, phonenumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, phonenumber, nationalId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('SuperAdmin registered successfully');
    }
  });
});

// Other routes...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
