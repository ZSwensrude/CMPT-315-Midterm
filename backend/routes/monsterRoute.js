import Express from "express";
import { createMonster, deleteMonster, getMonster, getMonsters, updateMonster } from "../controllers/monsterController.js";

const router = Express.Router();

// example get: http://localhost:3000/monsters/
router.get("/", getMonsters);

// example get: http://localhost:3000/monsters/3
router.get("/:id", getMonster);

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
router.post("/", createMonster);

/* example patch: localhost:3000/monsters/8 with body
{
  "name": "updated name"
}
*/
router.patch("/:id", updateMonster);

// example delete: localhost:3000/monsters/3
router.delete("/:id", deleteMonster);

export default router;
