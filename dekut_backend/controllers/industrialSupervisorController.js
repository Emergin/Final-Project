const db = require('../config/db');

exports.registerIndustrialSupervisor = (req, res) => {
  const { firstname, lastname, phoneNumber, nationalId } = req.body;
  const query = 'INSERT INTO IndustrialSupervisors (firstname, lastname, phoneNumber, nationalId) VALUES (?, ?, ?, ?)';
  db.query(query, [firstname, lastname, phoneNumber, nationalId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Industrial Supervisor registered successfully' });
  });
};

exports.assignDuties = (req, res) => {
  const { studentId, duties } = req.body;
  const query = 'UPDATE Students SET duties = ? WHERE id = ?';
  db.query(query, [duties, studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Duties assigned successfully' });
  });
};

exports.viewStudentLogbook = (req, res) => {
  const { studentId } = req.params;
  const query = 'SELECT * FROM Logbook WHERE studentId = ?';
  db.query(query, [studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.leaveComments = (req, res) => {
  const { studentId, comments } = req.body;
  const query = 'UPDATE Students SET industrialComments = ? WHERE id = ?';
  db.query(query, [comments, studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Comments left successfully' });
  });
};
