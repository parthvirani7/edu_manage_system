const Enrollment = require('../models/Enrollment'); // Make sure this path is correct
const Course = require('../models/Course'); // Assuming you have a Course model
const User = require('../models/User'); // Assuming you have a User model

const enrollmentController = {
  // Method for enrolling a student in a course
  async enrollStudent(req, res) {
    try {
      const { courseId } = req.body; // Assuming the courseId is passed in the request body
      const enrollment = new Enrollment({
        studentId: req.user._id, // Using the ID from the decoded JWT token
        courseId,
      });

      await enrollment.save();
      res.status(201).json({ message: 'Student enrolled successfully', enrollment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async unenrollStudent(req, res) {
    try {
      const enrollment = await Enrollment.findByIdAndDelete(req.params.id); 

      if (!enrollment) {
        return res.status(404).json({ message: 'Enrollment not found' });
      }

      res.status(200).json({ message: 'Student unenrolled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  async getEnrollments(req, res, next) {
    try {
      const { studentId } = req.params;
      const enrollments = await enrollmentService.getEnrollments(studentId);
      res.status(200).json(enrollments);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = enrollmentController;
