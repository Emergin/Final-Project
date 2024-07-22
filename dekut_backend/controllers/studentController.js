const db = require('../config/db');

exports.registerStudent = (req, res) => {
  const { firstname, lastname, registrationNumber, course, company, county, subCounty, coordinates } = req.body;
  const query = 'INSERT INTO Students (firstname, lastname, registrationNumber, course, company, county, subCounty, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [firstname, lastname, registrationNumber, course, company, county, subCounty, coordinates], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Student registered successfully' });
  });
};

exports.addLogbookEntry = (req, res) => {
  const { studentId, day, activity, help, assignedActivity } = req.body;
  const query = 'INSERT INTO Logbook (studentId, day, activity, help, assignedActivity) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [studentId, day, activity, help, assignedActivity], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ message: 'Logbook entry added successfully' });
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

exports.viewComments = (req, res) => {
  const { studentId } = req.params;
  const query = 'SELECT comments, industrialComments FROM Students WHERE id = ?';
  db.query(query, [studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.updateProfile = (req, res) => {
  const { studentId, phoneNumber, company, county, subCounty, coordinates } = req.body;
  const query = 'UPDATE Students SET phoneNumber = ?, company = ?, county = ?, subCounty = ?, coordinates = ? WHERE id = ?';
  db.query(query, [phoneNumber, company, county, subCounty, coordinates, studentId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Profile updated successfully' });
  });
};
