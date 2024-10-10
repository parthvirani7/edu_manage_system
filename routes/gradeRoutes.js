const express = require('express');
const gradeController = require('../controllers/gradeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Teacher routes
router.post('/:courseId/:studentId/assign', authMiddleware.verifyToken, authMiddleware.isTeacher, gradeController.assignGrade);

// Student routes
router.get('/:studentId', authMiddleware.verifyToken, authMiddleware.isStudent, gradeController.getGrades);
router.get('/:courseId/:studentId', authMiddleware.verifyToken, authMiddleware.isStudent, gradeController.getCourseGrade);

module.exports = router;
