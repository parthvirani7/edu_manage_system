const Enrollment = require('../models/Enrollment');

const enrollmentService = {
  async enrollStudent(studentId, courseId) {
    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();
    return enrollment;
  },

  async removeStudent(studentId, courseId) {
    return await Enrollment.findOneAndDelete({ student: studentId, course: courseId });
  },

  async getEnrollments(studentId) {
    return await Enrollment.find({ student: studentId }).populate('course');
  },
};

module.exports = enrollmentService;
