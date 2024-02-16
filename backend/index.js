// Code adapted from https://github.com/mrchenliang/learning-node
import dotenv from 'dotenv';
import express from "express";
import connectDB from './database/courseDB.js';
import bodyParser from 'body-parser';
import courseRouter from './routes/courseRoute.js';
import studentRouter from './routes/studentRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const url = await connectDB();

// allows app to deal with url encoded and json requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set to use the courses router if at /courses
app.use('/courses', courseRouter);
// set to use the student router if at /courses
app.use('/students', studentRouter);

// Not found
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that! Go to /courses or /students to interact with database");
});
  
// Error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, function () {
  console.log(`🚀 Fire app listening on port ${port}, connected to ${url}!`);
});
  