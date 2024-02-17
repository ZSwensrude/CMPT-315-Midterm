import Express from "express";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/studentController.js";

const studentRouter = Express.Router();

// example get: http://localhost:8080/students/
studentRouter.get("/", getStudents);

// example get: http://localhost:8080/students/3
studentRouter.get("/:studentID", getStudent);

/* example: post with the following object in the body:
{
  "name": "Zach",
  "email": "zach@zach.com"
}
*/ 
studentRouter.post("/", createStudent);

/* example patch: localhost:8080/students/8 with body
{
  "name": "updated name"
}
*/
studentRouter.patch("/:studentID", updateStudent);

// example delete: localhost:8080/students/3
studentRouter.delete("/:studentID", deleteStudent);

export default studentRouter;
