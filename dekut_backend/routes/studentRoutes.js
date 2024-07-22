const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/register', studentController.registerStudent);
router.post('/add-logbook-entry', studentController.addLogbookEntry);
router.get('/view-logbook/:studentId', studentController.viewLogbook);
router.get('/view-comments/:studentId', studentController.viewComments);
router.post('/update-profile', studentController.updateProfile);

module.exports = router;
