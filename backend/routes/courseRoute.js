import Express from "express";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from "../controllers/courseController.js";

const courseRouter = Express.Router();

// example get: http://localhost:8080/courses/
courseRouter.get("/", getCourses);

// example get: http://localhost:8080/courses/3
courseRouter.get("/:id", getCourse);

/* example: post with the following object in the body:
{
  "name": "test",
  "address": {
    "city": "city"
  },
  "email": "test@email.com",
  "image_url": "test.png"
}
*/ 
courseRouter.post("/", createCourse);

/* example patch: localhost:8080/courses/8 with body
{
  "name": "updated name"
}
*/
courseRouter.patch("/:id", updateCourse);

// example delete: localhost:8080/courses/3
courseRouter.delete("/:id", deleteCourse);

export default courseRouter;
