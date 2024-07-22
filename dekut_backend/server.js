// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Trubel112',
  database: 'attachment_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create tables if they don't exist
db.query(`
  CREATE TABLE IF NOT EXISTS SuperAdmins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    phonenumber VARCHAR(255),
    nationalId VARCHAR(255)
  );
`, (err) => {
  if (err) throw err;
  console.log('SuperAdmins table created successfully');
});

db.query(`
  CREATE TABLE IF NOT EXISTS SchoolSupervisors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    phonenumber VARCHAR(255),
    nationalId VARCHAR(255)
  );
`, (err) => {
  if (err) throw err;
  console.log('SchoolSupervisors table created successfully');
});

db.query(`
  CREATE TABLE IF NOT EXISTS IndustrialSupervisors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    phonenumber VARCHAR(255),
    nationalId VARCHAR(255)
  );
`, (err) => {
  if (err) throw err;
  console.log('IndustrialSupervisors table created successfully');
});

db.query(`
  CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    regno VARCHAR(255),
    course VARCHAR(255),
    company VARCHAR(255),
    county VARCHAR(255),
    subcounty VARCHAR(255),
    coordinates VARCHAR(255)
  );
`, (err) => {
  if (err) throw err;
  console.log('Students table created successfully');
});

// Update Logbook table to include month and week
db.query(`
  CREATE TABLE IF NOT EXISTS Logbook (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT,
    day VARCHAR(255),
    activity VARCHAR(255),
    benefit VARCHAR(255),
    supervisorActivity VARCHAR(255),
    month INT,
    week INT
  );
`, (err) => {
  if (err) throw err;
  console.log('Logbook table created successfully');
});

db.query(`
  CREATE TABLE IF NOT EXISTS Assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT,
    supervisorId INT
  );
`, (err) => {
  if (err) throw err;
  console.log('Assignments table created successfully');
});

// Routes
app.post('/register/superadmin', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId } = req.body;
  const sql = 'INSERT INTO SuperAdmins (firstname, lastname, phonenumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstname, lastname, phonenumber, nationalId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('SuperAdmin registered successfully');
  });
});

app.post('/register/schoolsupervisor', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId } = req.body;
  const sql = 'INSERT INTO SchoolSupervisors (firstname, lastname, phonenumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstname, lastname, phonenumber, nationalId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('School Supervisor registered successfully');
  });
});

app.post('/register/industrialsupervisor', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId } = req.body;
  const sql = 'INSERT INTO IndustrialSupervisors (firstname, lastname, phonenumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstname, lastname, phonenumber, nationalId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Industrial Supervisor registered successfully');
  });
});

app.post('/register/student', (req, res) => {
  const { firstname, lastname, regno, course, company, county, subcounty, coordinates } = req.body;
  const sql = 'INSERT INTO Students (firstname, lastname, regno, course, company, county, subcounty, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstname, lastname, regno, course, company, county, subcounty, coordinates], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    const studentId = result.insertId; // Get the auto-incremented id
    res.status(200).json({ message: 'Student registered successfully', studentId });
  });
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM Students', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
  });
});

app.get('/supervisors', (req, res) => {
  db.query('SELECT * FROM SchoolSupervisors UNION SELECT * FROM IndustrialSupervisors', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/assign', (req, res) => {
  const { studentId, supervisorId } = req.body;
  const sql = 'INSERT INTO Assignments (studentId, supervisorId) VALUES (?, ?)';
  db.query(sql, [studentId, supervisorId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Assignment created successfully');
  });
});

app.post('/update/student', (req, res) => {
  const { firstname, lastname, regno, course, company, county, subcounty, coordinates } = req.body;
  const sql = `
    UPDATE Students SET 
      firstname = ?, 
      lastname = ?, 
      course = ?, 
      company = ?, 
      county = ?, 
      subcounty = ?, 
      coordinates = ? 
    WHERE regno = ?
  `;
  db.query(sql, [firstname, lastname, course, company, county, subcounty, coordinates, regno], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Profile updated successfully');
  });
});

app.post('/logbook/entry', (req, res) => {
  const { studentId, day, activity, benefit, supervisorActivity, month, week } = req.body;
  const sql = 'INSERT INTO Logbook (studentId, day, activity, benefit, supervisorActivity, month, week) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [studentId, day, activity, benefit, supervisorActivity, month, week], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Logbook entry added successfully');
  });
});

app.get('/logbook/:studentId', (req, res) => {
  const { studentId } = req.params;
  const sql = 'SELECT * FROM Logbook WHERE studentId = ?';
  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
  });
});
app.post('/logbook', (req, res) => {
  const { studentId, day, activity, benefit, supervisorActivity } = req.body;
  const sql = 'INSERT INTO Logbook (studentId, day, activity, benefit, supervisorActivity, month, week) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [studentId, day, activity, benefit, supervisorActivity], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Logbook entry added successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

