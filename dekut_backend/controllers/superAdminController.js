const db = require('../config/db');

exports.registerSuperAdmin = (req, res) => {
  const { firstname, lastname, phoneNumber, nationalId } = req.body;
  const query = 'INSERT INTO SuperAdmins (firstname, lastname, phoneNumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, phoneNumber, nationalId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'SuperAdmin registered successfully' });
  });
};

exports.addStudent = (req, res) => {
  const { firstname, lastname, registrationNumber, course } = req.body;
  const query = 'INSERT INTO Students (firstname, lastname, registrationNumber, course) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, registrationNumber, course], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Student added successfully' });
  });
};

exports.addSupervisor = (req, res) => {
  const { firstname, lastname, phoneNumber, nationalId } = req.body;
  const query = 'INSERT INTO SchoolSupervisors (firstname, lastname, phoneNumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, phoneNumber, nationalId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'School Supervisor added successfully' });
  });
};

exports.assignStudents = (req, res) => {
  const { studentId, supervisorId } = req.body;
  const query = 'UPDATE Students SET supervisorId = ? WHERE id = ?';
  db.query(query, [supervisorId, studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Student assigned to supervisor successfully' });
  });
};

exports.viewStudents = (req, res) => {
  const query = 'SELECT * FROM Students';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.viewSupervisors = (req, res) => {
  const query = 'SELECT * FROM SchoolSupervisors';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};
