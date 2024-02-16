// Code adapted from https://github.com/mrchenliang/learning-node

import Course from "../models/courseModel.js";

export const getCoursesFromRepository = async (query) => {
  try {
    const courses = await Course.find(query);
    return courses;
  } catch (e) {
    throw Error("Error while fetching courses: ", e);
  }
}

const courseExists = async (mid) => {
  const course = await Course.findOne({ id: mid });
  return course ? true : false;
}

export const updateCoursesInRepository = async (id, query) => {
  let exists = await courseExists(id);
  if (!exists) {
    return -1;
  }
  try {
    const course = await Course.findOneAndUpdate(
      { id: id },
      { $set: query.body },
      { new: true }
    ).lean();
    return course;
  } catch (e) {
    throw Error("Error while updating course: ", e);
  } 
}

export const deleteCourseFromRepository = async (id) => {
  try {
    const course = await Course.findOneAndDelete({ id: id });
    return course;
  } catch (e) {
    throw Error("Error while deleting a course: ", e);
  }
}

/*
// This func gets the highest id in the database and increments it by one so its
// always a unique id. The main reason i went with this as opposed to another method
// of generating unique ids is to keep the id number small and simple, rather than
// mongo's id system which is a complicated number
const getUniqueMonsterID = async () => {
  const maxIdDocument = await Monster.findOne({}, { id: 1 }).sort({ id: -1 });
  const maxId = maxIdDocument ? maxIdDocument.id : 0;
  return maxId + 1;
}
*/

export const createCourseInRepository = async (payload) => {
  try {
    const newCourse = new Course(payload);
    const savedCourse = await newCourse.save();
    return savedCourse;
  } catch (e) {
    throw Error("Error while creating a course: ", e);
  }
}
