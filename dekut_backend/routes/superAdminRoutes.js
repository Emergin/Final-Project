const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');

router.post('/register', superAdminController.registerSuperAdmin);
router.post('/add-student', superAdminController.addStudent);
router.post('/add-supervisor', superAdminController.addSupervisor);
router.post('/assign-students', superAdminController.assignStudents);
router.get('/view-students', superAdminController.viewStudents);
router.get('/view-supervisors', superAdminController.viewSupervisors);

module.exports = router;
