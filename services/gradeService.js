const Grade = require('../models/Grade');

const gradeService = {
  async assignGrade(studentId, courseId, gradeValue, feedback) {
    const grade = new Grade({
      student: studentId,
      course: courseId,
      grade: gradeValue,
      feedback,
    });
    await grade.save();
    return grade;
  },

  async getGrades(studentId) {
    return await Grade.find({ student: studentId }).populate('course');
  },
};

module.exports = gradeService;
