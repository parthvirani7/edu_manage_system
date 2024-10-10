const Course = require('../models/Course');

const courseService = {
  async createCourse(courseData) {
    const course = new Course(courseData);
    await course.save();
    return course;
  },

  async getAllCourses() {
    return await Course.find();
  },

  async updateCourse(id, courseData) {
    return await Course.findByIdAndUpdate(id, courseData, { new: true });
  },

  async deleteCourse(id) {
    return await Course.findByIdAndDelete(id);
  },
};

module.exports = courseService;
