// server.js
const PDFDocument = require('pdfkit');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// const pool = require('./db'); // Import the database connection

const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup

const pool = mysql.createPool({
  user: 'root',
  host: 'localhost',
  database: 'attachment_db',
  password: 'Trubel112',
});

const db = mysql.createConnection ({
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
    phonenumber INT,
    nationalId INT,
    studentId INT
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
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
  );
`, (err) => {
  if (err) throw err;
  console.log('Students table created successfully');
});



// StudentsIndustrialSupervisors table (many-to-many relationship)
db.query(`
  CREATE TABLE IF NOT EXISTS StudentsIndustrialSupervisors (
    studentId INT,
    industrialSupervisorId INT,
    FOREIGN KEY (studentId) REFERENCES Students(id),
    FOREIGN KEY (industrialSupervisorId) REFERENCES IndustrialSupervisors(id),
    PRIMARY KEY (studentId, industrialSupervisorId)
  );
`, (err) => {
  if (err) throw err;
  console.log('StudentsIndustrialSupervisors table created successfully');
});

// Duties table
db.query(`
  CREATE TABLE IF NOT EXISTS Duties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentId INT,
  industrialSupervisorId INT,
  dayOfWeek VARCHAR(50),
  description TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (studentId) REFERENCES Students(id),
  FOREIGN KEY (industrialSupervisorId) REFERENCES IndustrialSupervisors(id)
  );
`, (err) => {
  if (err) throw err;
  console.log('Duties table created successfully');
});



// Update Logbook table to include month and week
db.query(`
  CREATE TABLE IF NOT EXISTS Logbook (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT,
    supervisorId INT,
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
    supervisorId INT,
    studentId INT,
    FOREIGN KEY (supervisorId) REFERENCES SchoolSupervisors(id),
    FOREIGN KEY (studentId) REFERENCES Students(id)
  );
`, (err) => {
  if (err) throw err;
  console.log('Assignments table created successfully');
});

db.query(`
  CREATE TABLE IF NOT EXISTS Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    supervisorId INT NOT NULL,
    comment TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES Students(id),
    FOREIGN KEY (supervisorId) REFERENCES SchoolSupervisors(id)
  );
`, (err) => {
  if (err) throw err;
  console.log('Comments table created successfully');
});

db.query(`
  CREATE TABLE IF NOT EXISTS SortedStudents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentId INT,
  distanceFromStart FLOAT,
  FOREIGN KEY (studentId) REFERENCES Students(id)
  );
`, (err) => {
  if (err) throw err;
  console.log('SortedStudents table created successfully');
});

// Routes
// app.post('/register/superadmin', (req, res) => {
//   const { firstname, lastname, phonenumber, nationalId } = req.body;
//   const sql = 'INSERT INTO SuperAdmins (firstname, lastname, phonenumber, nationalId) VALUES (?, ?, ?, ?)';
//   db.query(sql, [firstname, lastname, phonenumber, nationalId], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.status(200).send('SuperAdmin registered successfully');
//   });
// });

const maxSuperAdmins = 3;

app.post('/register/superadmin', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId } = req.body;

  if (!firstname || !lastname || !phonenumber || !nationalId) {
    return res.status(400).send('All fields are required');
  }

  const countQuery = 'SELECT COUNT(*) as count FROM SuperAdmins';
  db.query(countQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    const { count } = results[0];
    if (count >= maxSuperAdmins) {
      return res.status(403).send('SuperAdmin registration limit reached');
    }

    const sql = 'INSERT INTO SuperAdmins (firstname, lastname, phonenumber, nationalId) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstname, lastname, phonenumber, nationalId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }
      res.status(200).send('SuperAdmin registered successfully');
    });
  });
});

app.post('/login/superadmin', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId } = req.body;

  if (!firstname || !lastname || !phonenumber || !nationalId) {
    return res.status(400).send('All fields are required');
  }

  const loginQuery = 'SELECT * FROM SuperAdmins WHERE firstname = ? AND lastname = ? AND phonenumber = ? AND nationalId = ?';
  db.query(loginQuery, [firstname, lastname, phonenumber, nationalId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    res.status(200).send('Login successful');
  });
});

// app.post('/login/schoolsupervisor', (req, res) => {
//   const { firstname, lastname, phonenumber, nationalId } = req.body;

//   if (!firstname || !lastname || !phonenumber || !nationalId) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   // Check if a supervisor with the same name exists
//   const checkQuery = 'SELECT * FROM SchoolSupervisors WHERE firstname = ? AND lastname = ?';
//   db.query(checkQuery, [firstname, lastname], (err, results) => {
//     if (err) {
//       console.error('Database query error:', err);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (results.length > 0) {
//       // Supervisor exists, return their ID
//       const existingSupervisor = results[0];
//       return res.status(200).json({ supervisorId: existingSupervisor.id });
//     }

//     // If no existing supervisor with the same name, proceed to insert
//     const insertQuery = 'INSERT INTO SchoolSupervisors (firstname, lastname, phonenumber, nationalId) VALUES (?, ?, ?, ?)';
//     db.query(insertQuery, [firstname, lastname, phonenumber, nationalId], (err, results) => {
//       if (err) {
//         console.error('Database insertion error:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }

//       res.status(201).json({ supervisorId: results.insertId });
//     });
//   });
// });

app.post('/login/schoolsupervisor', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId } = req.body;

  if (!firstname || !lastname || !phonenumber || !nationalId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'SELECT * FROM SchoolSupervisors WHERE firstname = ? AND lastname = ? AND phonenumber = ? AND nationalId = ?';
  db.query(query, [firstname, lastname, phonenumber, nationalId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (results.length > 0) {
      const supervisor = results[0];
      return res.status(200).json({ supervisorId: supervisor.id });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});




// // Login Industrial Supervisor
// app.post('/login/industrialSupervisor', (req, res) => {
//   const { firstname, lastname, phonenumber, nationalId, studentId } = req.body;

//   // Ensure all fields are present
//   if (!firstname || !lastname || !phonenumber || !nationalId || !studentId) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Check if the supervisor already exists
//   db.query('SELECT * FROM IndustrialSupervisors WHERE firstname = ? AND lastname = ? AND phonenumber = ? AND nationalId = ? AND studentId = ?', 
//     [firstname, lastname, phonenumber, nationalId, studentId], 
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Internal server error' });
//       }

//       if (results.length > 0) {
//         // Supervisor exists, return the ID
//         const industrialSupervisorId = results[0].id;
//         return res.status(200).json({ industrialSupervisorId });
//       } else {
//         // Supervisor does not exist, insert a new record
//         db.query('INSERT INTO IndustrialSupervisors (firstname, lastname, phonenumber, nationalId, studentId) VALUES (?, ?, ?, ?, ?)', 
//           [firstname, lastname, phonenumber, nationalId, studentId], 
//           (err, result) => {
//             if (err) {
//               console.error(err);
//               return res.status(500).json({ message: 'Internal server error' });
//             }
//             const industrialSupervisorId = result.insertId;
//             res.status(200).json({ industrialSupervisorId });
//           });
//       }
//     });
// });

app.post('/login/industrialSupervisor', (req, res) => {
  const { firstname, lastname, phonenumber, nationalId, studentId } = req.body;

  // Ensure all fields are present
  if (!firstname || !lastname || !phonenumber || !nationalId || !studentId) {
    console.log('Missing fields:', { firstname, lastname, phonenumber, nationalId, studentId });
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the supervisor already exists
  db.query('SELECT * FROM IndustrialSupervisors WHERE firstname = ? AND lastname = ? AND phonenumber = ? AND nationalId = ? AND studentId = ?', 
    [firstname, lastname, phonenumber, nationalId, studentId], 
    (err, results) => {
      if (err) {
        console.error('Error querying for existing supervisor:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        // Supervisor exists, return the ID
        const industrialSupervisorId = results[0].id;
        return res.status(200).json({ industrialSupervisorId });
      } else {
        // Check if the student already has 3 supervisors
        db.query('SELECT COUNT(*) AS supervisorCount FROM IndustrialSupervisors WHERE studentId = ?', [studentId], (err, results) => {
          if (err) {
            console.error('Error checking supervisor count:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }

          if (results[0].supervisorCount >= 3) {
            return res.status(400).json({ message: 'A student can have a maximum of 3 industrial supervisors' });
          }

          // Supervisor does not exist, insert a new record
          db.query('INSERT INTO IndustrialSupervisors (firstname, lastname, phonenumber, nationalId, studentId) VALUES (?, ?, ?, ?, ?)', 
            [firstname, lastname, phonenumber, nationalId, studentId], 
            (err, result) => {
              if (err) {
                console.error('Error inserting new supervisor:', err);
                return res.status(500).json({ message: 'Internal server error' });
              }
              const industrialSupervisorId = result.insertId;
              res.status(200).json({ industrialSupervisorId });
            });
        });
      }
    });
});



// Endpoint to assign a student to an industrial supervisor
app.post('/assign/studentToIndustrialSupervisor', (req, res) => {
  const { studentId, industrialSupervisorId } = req.body;

  db.query('SELECT COUNT(*) AS count FROM StudentsIndustrialSupervisors WHERE studentId = ?', [studentId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result[0].count >= 3) {
      return res.status(400).json({ message: 'Maximum of 3 industrial supervisors can be assigned to a student' });
    }

    db.query('INSERT INTO StudentsIndustrialSupervisors (studentId, industrialSupervisorId) VALUES (?, ?)', [studentId, industrialSupervisorId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ message: 'Industrial supervisor assigned to student successfully' });
    });
  });
});

// Endpoint to get industrial supervisors for a student
app.get('/student/:studentId/industrialSupervisors', (req, res) => {
  const { studentId } = req.params;

  db.query(`
    SELECT is.id, is.firstname, is.lastname, is.phonenumber, is.nationalId 
    FROM IndustrialSupervisors is
    JOIN StudentsIndustrialSupervisors sis ON is.id = sis.industrialSupervisorId
    WHERE sis.studentId = ?
  `, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

// Endpoint to assign duties to a student
app.post('/assignDuty', (req, res) => {
  const { studentId, industrialSupervisorId, dayOfWeek, description } = req.body;

  // Ensure all fields are present
  if (!studentId || !industrialSupervisorId || !dayOfWeek || !description) {
    console.log('Missing fields:', { studentId, industrialSupervisorId, dayOfWeek, description });
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert new duty into the Duties table
  db.query('INSERT INTO Duties (studentId, industrialSupervisorId, dayOfWeek, description) VALUES (?, ?, ?, ?)', 
    [studentId, industrialSupervisorId, dayOfWeek, description], 
    (err, result) => {
      if (err) {
        console.error('Error inserting duty:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ message: 'Duty assigned successfully' });
    }
  );
});



// Endpoint to get duties for a student
app.get('/student/:studentId/duties', (req, res) => {
  const { studentId } = req.params;

  db.query('SELECT * FROM Duties WHERE studentId = ?', [studentId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

// Assuming you have a database connection already
app.get('/duties/:studentId', (req, res) => {
  const { studentId } = req.params;

  db.query('SELECT * FROM Duties WHERE studentId = ?', [studentId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});


app.post('/register/student', (req, res) => {
  const { firstname, lastname, regno, course, company, county, subcounty, latitude, longitude } = req.body;

  if (!firstname || !lastname || !regno) {
    return res.status(400).json({ message: 'Firstname, lastname, and regno are required.' });
  }

  // Check if a student with the same regno already exists
  const checkQuery = 'SELECT * FROM Students WHERE firstname = ? AND lastname = ? AND regno = ?';
  db.query(checkQuery, [firstname, lastname, regno], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      // Student already exists
      return res.status(200).json({ message: 'Student already exists', studentId: results[0].id });
    }

    // Insert the new student
    const insertQuery = 'INSERT INTO Students (firstname, lastname, regno, course, company, county, subcounty, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [firstname, lastname, regno, course, company, county, subcounty, latitude, longitude], (err, result) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      const studentId = result.insertId;
      res.status(201).json({ message: 'Student registered successfully', studentId });
    });
  });
});


app.post('/login/student', (req, res) => {
  const { firstname, lastname, regno } = req.body;

  if (!firstname || !lastname || !regno) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if a student with the provided credentials exists
  const checkQuery = 'SELECT * FROM Students WHERE firstname = ? AND lastname = ? AND regno = ?';
  db.query(checkQuery, [firstname, lastname, regno], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      // Student exists, return their ID
      const existingStudent = results[0];
      return res.status(200).json({ studentId: existingStudent.id });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});


app.get('/Students', (req, res) => {
  const query = 'SELECT * FROM Students';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json(results);
  });
});

app.get('/students', (req, res) => {
  const status = req.query.status || 'active'; // Default to 'active' if no status provided

  const query = 'SELECT * FROM Students WHERE status = ?';
  db.query(query, [status], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json(results);
  });
});

app.get('/supervisors', (req, res) => {
  db.query('SELECT * FROM SchoolSupervisors', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
  });
});

// Assign students to a supervisor
app.post('/assignStudents', (req, res) => {
  const { studentId, supervisorId } = req.body;

  if (!studentId || !supervisorId) {
    return res.status(400).json({ message: 'Student ID and Supervisor ID are required.' });
  }

  // Check if the student is already assigned to a supervisor
  const checkAssignmentQuery = 'SELECT * FROM Assignments WHERE studentId = ?';
  db.query(checkAssignmentQuery, [studentId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      // Student is already assigned
      return res.status(400).json({ message: 'Student is already assigned to a supervisor.' });
    }

    // Proceed to assign the student to the supervisor
    const insertAssignmentQuery = 'INSERT INTO Assignments (studentId, supervisorId) VALUES (?, ?)';
    db.query(insertAssignmentQuery, [studentId, supervisorId], (err) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Update student status to inactive
      const updateStudentQuery = 'UPDATE Students SET status = ? WHERE id = ?';
      db.query(updateStudentQuery, ['inactive', studentId], (err) => {
        if (err) {
          console.error('Database update error:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        res.status(200).json({ message: 'Student assigned to supervisor successfully' });
      });
    });
  });
});



// Endpoint to fetch students assigned to a supervisor
// Endpoint to fetch students assigned to a supervisor
app.get('/assignStudents/:supervisorId', (req, res) => {
  const { supervisorId } = req.params;

  if (!supervisorId) {
    return res.status(400).send('supervisorId is required');
  }

  const sql = `
      SELECT Students.id, Students.firstname, Students.lastname, Students.latitude, Students.longitude
      FROM Students 
      JOIN Assignments ON Students.id = Assignments.studentId 
      WHERE Assignments.supervisorId = ?
  `;

  db.query(sql, [supervisorId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }

    res.status(200).json(results);
  });
});



// app.post('/update/student', (req, res) => {
//   const { firstname, lastname, regno, course, company, county, subcounty, coordinates } = req.body;
//   const sql = `
//     UPDATE Students SET 
//       firstname = ?, 
//       lastname = ?, 
//       course = ?, 
//       company = ?, 
//       county = ?, 
//       subcounty = ?, 
//       coordinates = ? 
//     WHERE regno = ?
//   `;
//   db.query(sql, [firstname, lastname, course, company, county, subcounty, coordinates, regno], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.status(200).send('Profile updated successfully');
//   });
// });

// Backend code to update student profile with coordinates


app.post('/update/student', (req, res) => {
  const { studentId, firstname, lastname, regno, course, company, county, subcounty, latitude, longitude } = req.body;

  if (!firstname || !lastname || !regno || !course || !company || !county || !subcounty || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'UPDATE Students SET firstname = ?, lastname = ?, regno = ?, course = ?, company = ?, county = ?, subcounty = ?, latitude = ?, longitude = ? WHERE id = ?';
  db.query(query, [firstname, lastname, regno, course, company, county, subcounty, latitude, longitude, studentId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
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

// Get student logbook
app.post('/logbook/:studentId/comment', (req, res) => {
  const { studentId } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: 'Comment is required.' });
  }

  // Query to insert comment into the logbook
  const query = 'INSERT INTO Logbooks (studentId, comment) VALUES (?, ?)';
  db.query(query, [studentId, comment], (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(201).json({ message: 'Comment added successfully' });
  });
});

// Endpoint to save comments
app.post('/add/comment', (req, res) => {
  const { studentId, supervisorId, comment } = req.body;

  if (!studentId || !supervisorId || !comment) {
    return res.status(400).send('Missing required fields');
  }

  const sql = 'INSERT INTO Comments (studentId, supervisorId, comment) VALUES (?, ?, ?)';
  db.query(sql, [studentId, supervisorId, comment], (err) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send({ error: 'Server error', message: err.message });
      return;
    }
    res.status(200).send('Comment added successfully');
  });
});


// Endpoint to get comments for a student
app.get('/comments/:studentId', (req, res) => {
  const { studentId } = req.params;
  const sql = 'SELECT * FROM Comments WHERE studentId = ?';
  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
  });
});



app.post('/sortStudents', (req, res) => {
  // Function to calculate distance between two lat/lng points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch the starting student (ID 1)
  db.query('SELECT * FROM Students WHERE id = 1', (err, startResults) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (startResults.length === 0) {
      return res.status(404).json({ message: 'Starting student not found' });
    }

    const startStudent = startResults[0];
    const startLat = parseFloat(startStudent.latitude);
    const startLon = parseFloat(startStudent.longitude);

    // Fetch all students
    db.query('SELECT * FROM Students', (err, students) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Calculate distances and sort students
      const sortedStudents = students
        .map(student => ({
          ...student,
          distance: calculateDistance(startLat, startLon, parseFloat(student.latitude), parseFloat(student.longitude))
        }))
        .sort((a, b) => a.distance - b.distance);

      // Clear existing sorted students
      db.query('DELETE FROM SortedStudents', (err) => {
        if (err) {
          console.error('Database deletion error:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        // Insert sorted students
        const insertQuery = 'INSERT INTO SortedStudents (studentId, distanceFromStart) VALUES ?';
        const values = sortedStudents.map(student => [student.id, student.distance]);

        db.query(insertQuery, [values], (err) => {
          if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ message: 'Server error' });
          }

          res.status(200).json({ message: 'Students sorted and saved successfully' });
        });
      });
    });
  });
});

app.get('/sortedStudents', (req, res) => {
  db.query('SELECT * FROM SortedStudents JOIN Students ON SortedStudents.studentId = Students.id ORDER BY SortedStudents.distanceFromStart', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json(results);
  });
});



// // Function to fetch logbook entries from the database
// const getLogbookEntriesForStudent = async (studentId) => {
//   try {
//     const result = await pool.query(
//       'SELECT day, activity, benefit, supervisor_activity AS supervisorActivity, month, week FROM Logbook WHERE student_id = $1',
//       [studentId]
//     );
//     return result.rows;
//   } catch (error) {
//     console.error('Error fetching logbook entries:', error);
//     throw new Error('Error fetching logbook entries.');
//   }
// };

// Create a MySQL connection pool

app.get('/downloadLogbook/:studentId', (req, res) => {
  const { studentId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return res.status(500).send('Internal Server Error');
    }

    connection.query('SELECT * FROM Logbook WHERE studentId = ?', [studentId], (error, results) => {
      if (error) {
        console.error('Error fetching logbook entries:', error);
        connection.release(); // Release the connection back to the pool
        return res.status(500).send('Internal Server Error');
      }

      // Create a new PDF document
      const doc = new PDFDocument();
      res.setHeader('Content-disposition', 'attachment; filename=logbook.pdf');
      res.setHeader('Content-type', 'application/pdf');

      doc.pipe(res); // Stream the PDF to the response

      // Add logbook entries to the PDF
      results.forEach(entry => {
        doc.text(`Day: ${entry.day}`);
        doc.text(`Activity: ${entry.activity}`);
        doc.text(`Benefit: ${entry.benefit}`);
        doc.text(`Supervisor Activity: ${entry.supervisor_activity}`);
        doc.text(`Month: ${entry.month}`);
        doc.text(`Week: ${entry.week}`);
        doc.text(''); // Add a blank line between entries
      });

      doc.end(); // End the PDF document stream

      connection.release(); // Release the connection back to the pool
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
