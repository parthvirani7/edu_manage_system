const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');

const router = express.Router();

// Admin only route
router.post('/create-course', authMiddleware.verifyToken, authMiddleware.hasRole(['Admin']), courseController.createCourse);

router.put('/update-course/:id', authMiddleware.verifyToken, authMiddleware.hasRole(['Admin', 'Teacher']), courseController.updateCourse);

router.get('/enrolled-courses', authMiddleware.verifyToken, authMiddleware.hasRole(['Student']), courseController.getEnrolledCourses);

router.get('/courses', authMiddleware.verifyToken, authMiddleware.hasRole(['Admin', 'Teacher', 'Student']), courseController.getAllCourses);

router.get('/enrolled-courses', authMiddleware.verifyToken, authMiddleware.hasRole(['Student']), courseController.getEnrolledCourses);

router.get('/courses', authMiddleware.verifyToken, authMiddleware.hasRole(['Admin', 'Teacher', 'Student']), courseController.getAllCourses);

module.exports = router;
