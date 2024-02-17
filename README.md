# CMPT 315 Midterm Class Registration App
This contains the frontend and backend folders. 

### To run the app, you have to run `npm i` then `npm start` in both `/backend/` and `/frontend/course-registration/`.

- the frontend runs on port 3000
- the backend runs on port 8080

To get some data in the database, add the following files to MongoDB on port 27017:
- `backend\json-db-data\courses.json` - in a `courses` collection
- `backend\json-db-data\students.json` - in a `students` collection


## Usage:
- Once the database is populated, go to localhost:3000
- You should see the application with no student selected, showing all the courses and all data about each course
- Select a student, and a button to enroll in each course will become available
- The student can enroll in any courses that are not full, and do not have scheduling issues
- Any successful or unsuccessful operations will be shown to the user as a toast popup
- The student can swap the view to student schedule at the top of the screen to see only courses they are enrolled in
- To deselect a student or select a different one, use the dropdown again.


## Architecture

### Backend:
- Handles all API calls and access to database
- The main calls are the following:
  - GET from `http://localhost:8080/courses`
  - GET from `http://localhost:8080/students`
  - PATCH to `http://localhost:8080/courses/addstudent/${selectedCourse}` with a studentID in the json body to add the student to the course
  - PATCH to `http://localhost:8080/courses/removestudent/${selectedCourse}` with a studentID in the json body to remove the student from the course

### Frontend: 
- Handles all aspects of UI
- Makes API calls to the backend for 3 things:
  - fetching all students
  - fetching all courses (re-fetches whenever any data is changed)
  - adding students to courses
  - removing students from courses
- In order to avoid unnecessary calls to the backend, all other data manipulation is handled locally, such as getting courses for specific students.