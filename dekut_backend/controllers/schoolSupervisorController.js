const db = require('../config/db');

exports.registerSchoolSupervisor = (req, res) => {
  const { firstname, lastname, phoneNumber, nationalId } = req.body;
  const query = 'INSERT INTO SchoolSupervisors (firstname, lastname, phoneNumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, phoneNumber, nationalId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'School Supervisor registered successfully' });
  });
};

exports.viewAssignedStudents = (req, res) => {
  const { supervisorId } = req.params;
  const query = 'SELECT * FROM Students WHERE supervisorId = ?';
  db.query(query, [supervisorId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.leaveComments = (req, res) => {
  const { studentId, comments } = req.body;
  const query = 'UPDATE Students SET comments = ? WHERE id = ?';
  db.query(query, [comments, studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Comments left successfully' });
  });
};

exports.viewLogbook = (req, res) => {
  const { studentId } = req.params;
  const query = 'SELECT * FROM Logbook WHERE studentId = ?';
  db.query(query, [studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.updateProfile = (req, res) => {
  const { studentId, profileData } = req.body;
  const query = 'UPDATE Students SET profileData = ? WHERE id = ?';
  db.query(query, [profileData, studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Profile updated successfully' });
  });
};
