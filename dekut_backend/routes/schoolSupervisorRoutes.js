const express = require('express');
const router = express.Router();
const schoolSupervisorController = require('../controllers/schoolSupervisorController');

router.post('/register', schoolSupervisorController.registerSchoolSupervisor);
router.get('/view-assigned-students/:supervisorId', schoolSupervisorController.viewAssignedStudents);
router.post('/leave-comments', schoolSupervisorController.leaveComments);
router.get('/view-logbook/:studentId', schoolSupervisorController.viewLogbook);
router.post('/update-profile', schoolSupervisorController.updateProfile);

module.exports = router;
