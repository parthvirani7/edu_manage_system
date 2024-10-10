const gradeService = require('../services/gradeService');
const courseService = require('../services/courseService');
const httpErrors = require('http-errors');

const gradeController = {
  async assignGrade(req, res, next) {
    try {
      const { courseId, studentId } = req.params;
      const { grade, feedback } = req.body;

      const course = await courseService.findCourseById(courseId);
      if (!course) throw new httpErrors.NotFound('Course not found');

      const assignedGrade = await gradeService.assignGrade(studentId, courseId, grade, feedback);
      res.status(201).json({ message: 'Grade assigned successfully', assignedGrade });
    } catch (error) {
      next(error);
    }
  },

  async getGrades(req, res, next) {
    try {
      const { studentId } = req.params;
      const grades = await gradeService.getGrades(studentId);
      res.status(200).json(grades);
    } catch (error) {
      next(error);
    }
  },

  async getCourseGrade(req, res, next) {
    try {
      const { courseId, studentId } = req.params;
      const courseGrade = await gradeService.getCourseGrade(studentId, courseId);
      if (!courseGrade) throw new httpErrors.NotFound('Grade not found');
      res.status(200).json(courseGrade);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = gradeController;
