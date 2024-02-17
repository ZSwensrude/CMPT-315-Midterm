import Express from "express";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse, addStudentToCourse, removeStudentFromCourse } from "../controllers/courseController.js";

const courseRouter = Express.Router();

// example get: http://localhost:8080/courses/
courseRouter.get("/", getCourses);

// example get: http://localhost:8080/courses/3
courseRouter.get("/:id", getCourse);

/* example: post with the following object in the body:
{
  {
  "courseName": "CHEM330",
  "department": "Sciences",
  "timeOfDay": "9:00",
  "capacity": 2,
  }
}
*/ 
courseRouter.post("/", createCourse);

/* example patch: localhost:8080/courses/8 with body
{
  "courseName": "updated name"
}
*/
courseRouter.patch("/:id", updateCourse);

/* adds student to studentsEnrolled in course object
example patch: localhost:8080/courses/addstudent/6 with body
{
    "studentID": "100"
}
*/
courseRouter.patch("/addStudent/:id", addStudentToCourse);

/* removes student from studentsEnrolled in course object
example patch: localhost:8080/courses/removestudent/6 with body
{
    "studentID": "100"
}
*/
courseRouter.patch("/removeStudent/:id", removeStudentFromCourse);

// example delete: localhost:8080/courses/3
courseRouter.delete("/:id", deleteCourse);

export default courseRouter;
