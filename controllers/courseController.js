const courseService = require('../services/courseService');

const courseController = {
  async createCourse(req, res, next) {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      next(error);
    }
  },

  async getCourses(req, res, next) {
    try {
      const courses = await courseService.getAllCourses();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  },

  async updateCourse(req, res, next) {
    try {
      const course = await courseService.updateCourse(req.params.id, req.body);
      res.json(course);
    } catch (error) {
      next(error);
    }
  },

  async deleteCourse(req, res, next) {
    try {
      await courseService.deleteCourse(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
  
  async getEnrolledCourses(req, res) {
    try {
      // Find the enrollments for the logged-in user
      const enrollments = await Enrollment.find({ studentId: req.user._id }).populate('courseId');
      
      if (!enrollments.length) {
        return res.status(404).json({ message: 'No enrolled courses found' });
      }

      // Respond with the populated course data
      res.status(200).json(enrollments.map(enrollment => ({
        courseId: enrollment.courseId._id,
        title: enrollment.courseId.title,
        description: enrollment.courseId.description,
      })));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  async getAllCourses(req, res) {
    try {
      // Find all courses
      const courses = await Course.find();
      
      if (!courses.length) {
        return res.status(404).json({ message: 'No courses available' });
      }

      // Respond with course data
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = courseController;
