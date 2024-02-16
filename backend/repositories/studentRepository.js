// Code adapted from https://github.com/mrchenliang/learning-node

import Student from "../models/studentModel.js";

export const getStudentsFromRepository = async (query) => {
  try {
    const students = await Student.find(query);
    return students;
  } catch (e) {
    throw Error("Error while fetching students: ", e);
  }
}

const studentExists = async (sid) => {
  const student = await Student.findOne({ studentID: sid });
  return student ? true : false;
}

export const updateStudentsInRepository = async (studentID, query) => {
  let exists = await studentExists(studentID);
  if (!exists) {
    return -1;
  }
  try {
    const student = await Student.findOneAndUpdate(
      { studentID: studentID },
      { $set: query.body },
      { new: true }
    ).lean();
    return student;
  } catch (e) {
    throw Error("Error while updating student: ", e);
  } 
}

export const deleteStudentFromRepository = async (studentID) => {
  try {
    const student = await Student.findOneAndDelete({ studentID: studentID });
    return student;
  } catch (e) {
    throw Error("Error while deleting a student: ", e);
  }
}


// This func gets the highest id in the database and increments it by one so its
// always a unique id. The main reason i went with this as opposed to another method
// of generating unique ids is to keep the id number small and simple, rather than
// mongo's id system which is a complicated number
const getUniqueStudentID = async () => {
  const maxIdDocument = await Student.findOne({}, { studentID: 1 }).sort({ studentID: -1 });
  const maxId = maxIdDocument ? maxIdDocument.studentID : 0;
  return maxId + 1;
}


export const createStudentInRepository = async (payload) => {
  try {
    // get a new id
    const newId = await getUniqueStudentID();
    // add it to the payload obj
    payload = {...payload, studentID: newId};
    // then add to db
    const newStudent = new Student(payload);
    const savedStudent = await newStudent.save();
    return savedStudent;
  } catch (e) {
    throw Error("Error while creating a student: ", e);
  }
}
