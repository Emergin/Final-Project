const express = require('express');
const router = express.Router();
const industrialSupervisorController = require('../controllers/industrialSupervisorController');

router.post('/register', industrialSupervisorController.registerIndustrialSupervisor);
router.post('/assign-duties', industrialSupervisorController.assignDuties);
router.get('/view-student-logbook/:studentId', industrialSupervisorController.viewStudentLogbook);
router.post('/leave-comments', industrialSupervisorController.leaveComments);

module.exports = router;
