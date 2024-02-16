// Code adapted from https://github.com/mrchenliang/learning-node

import { getCoursesFromRepository, updateCoursesInRepository, deleteCourseFromRepository, createCourseInRepository } from "../repositories/courseRepository.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await getCoursesFromRepository();
    res.status(200).send(courses);
  } catch (e) {
    console.log("Failed to get courses: ", e); 
    res.status(400).send("Get failed");
  }
}

export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await getCoursesFromRepository({ id: id });
    res.status(200).send(course);
  } catch (e) {
    console.log("Failed to get course: ", e); 
    res.status(400).send("Get failed");
  }
}

export const createCourse = async (req, res) => {
  try {
    const course = await createCourseInRepository( req.body );
    res.status(201).send(course);
  } catch (e) {
    console.log("Failed to create course: ", e); 
    res.status(400).send('Create failed. You likely did not include all required fields: id:, courseName:, department:, startTime:, capacity:');
  }
}

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await updateCoursesInRepository(id, req);
    // returns -1 if it does not exist in database
    if (course === -1) {
      res.status(400).send("The course you are trying to update with id " + id + " likely does not exist.")
    } else {
      res.status(200).send(course);
    }
  } catch (e) {
    console.log("Failed to update course: ", e); 
    res.status(400).send("Update failed");
  }
}

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await deleteCourseFromRepository(id);
    if (course) {
      res.status(200).send("The following course was deleted: "+ course);
    } else {
      res.status(400).send("The course you are trying to delete with id "+ id +" likely does not exist or was already deleted.");
    }
  } catch (e) {
    console.log("Failed to delete course: ", e); 
    res.status(400).send("Course delete failed.");
  }
}
