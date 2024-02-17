// Code adapted from https://github.com/mrchenliang/learning-node

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    id: {type: Number, required: true},
    courseName: {type: String, required: true},
    department: {type: String, required: true},
    timeOfDay: {type: String, required: true},
    capacity: {type: Number, required: true},
    studentsEnrolled: { type : Array , "default" : [] }
  },
  { strictQuery: true, versionKey: false }
)

const Course = mongoose.model("Course", courseSchema);

export default Course;
