import Express from "express";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from "../controllers/courseController.js";

const router = Express.Router();

// example get: http://localhost:8080/courses/
router.get("/", getCourses);

// example get: http://localhost:8080/courses/3
router.get("/:id", getCourse);

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
router.post("/", createCourse);

/* example patch: localhost:8080/courses/8 with body
{
  "name": "updated name"
}
*/
router.patch("/:id", updateCourse);

// example delete: localhost:8080/courses/3
router.delete("/:id", deleteCourse);

export default router;
