const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/enroll', authMiddleware.verifyToken, authMiddleware.hasRole(['Admin', 'Teacher']), enrollmentController.enrollStudent);

router.delete('/unenroll/:id', authMiddleware.verifyToken, authMiddleware.hasRole(['Admin', 'Teacher']), enrollmentController.unenrollStudent);

module.exports = router;
