// Code adapted from https://github.com/mrchenliang/learning-node

import { getStudentsFromRepository, updateStudentsInRepository, deleteStudentFromRepository, createStudentInRepository } from "../repositories/studentRepository.js";

export const getStudents = async (req, res) => {
  try {
    const students = await getStudentsFromRepository();
    res.status(200).send(students);
  } catch (e) {
    console.log("Failed to get students: ", e); 
    res.status(400).send("Get failed");
  }
}

export const getStudent = async (req, res) => {
  try {
    const { studentID } = req.params;
    const student = await getStudentsFromRepository({ studentID: studentID });
    res.status(200).send(student);
  } catch (e) {
    console.log("Failed to get student: ", e); 
    res.status(400).send("Get failed");
  }
}

export const createStudent = async (req, res) => {
  try {
    const student = await createStudentInRepository( req.body );
    res.status(201).send(student);
  } catch (e) {
    console.log("Failed to create student: ", e); 
    res.status(400).send('Create failed. You likely did not include all required fields: "name":, "email":, or set "studentID" to be negative.');
  }
}

export const updateStudent = async (req, res) => {
  try {
    const { studentID } = req.params;
    const student = await updateStudentsInRepository(studentID, req);
    // returns -1 if it does not exist in database
    if (student === -1) {
      res.status(400).send("The student you are trying to update with studentID " + studentID + " likely does not exist.")
    } else {
      res.status(200).send(student);
    }
  } catch (e) {
    console.log("Failed to update student: ", e); 
    res.status(400).send("Update failed");
  }
}

export const deleteStudent = async (req, res) => {
  const { studentID } = req.params;
  try {
    const student = await deleteStudentFromRepository(studentID);
    if (student) {
      res.status(200).send("The following student was deleted: "+ student);
    } else {
      res.status(400).send("The student you are trying to delete with studentID "+ studentID +" likely does not exist or was already deleted.");
    }
  } catch (e) {
    console.log("Failed to delete student: ", e); 
    res.status(400).send("Student delete failed.");
  }
}
