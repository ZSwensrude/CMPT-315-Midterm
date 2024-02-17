import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './components.css';
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import StudentDropdown from "./StudentDropdown";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoursesDisplay = ({ scheduleDisplay }) => {
  // if no student selected, default value is -1
  const [selectedStudent, setSelectedStudent] = useState(-1);
  const [courses, setCourses] = useState([]);

  // get course data
  const { isPending: coursesPending, error: coursesError, data: coursesData, refetch: coursesRefetch } = useQuery({
    queryKey: ['repoCourses'],
    queryFn: () =>
      fetch('http://localhost:8080/courses').then((res) =>
        res.json(),
      ),
  });

  // get student data
  const { isPending: studentsPending, error: studentsError, data: studentsData } = useQuery({
    queryKey: ['repoStudents'],
    queryFn: () =>
      fetch('http://localhost:8080/students').then((res) =>
        res.json(),
      ),
  });

  // get courses to display
  useEffect( () => {
    if (scheduleDisplay){
      // if we are looking at the schedule view, get only the courses the student is in (if any)
      setCourses(coursesData.filter((course) => course.studentsEnrolled.includes(`${selectedStudent}`)));
    } else {
      // otherwise show all courses
      setCourses(coursesData);
    }
  }, [scheduleDisplay, coursesData, selectedStudent])
  
  //loading/pending checks
  if (coursesPending || studentsPending) return 'Loading...'
  if (coursesError || studentsError) return 'An error has occurred: ' + coursesError.message
  
  // on student select (sent to dropdown button)
  const onStudentSelect = (studentID) => {
    setSelectedStudent(studentID);
  };

  /**
   * Finds out if there is space in the course or not
   * @param {*} courseID - id of course to check
   * @returns true or false if the course is full or not
   */
  const spaceInCourse = (courseID) => {
    const foundCourse = courses.find(course => course.id === courseID);
    if (!foundCourse)
      return -1;

    const notFull = (foundCourse.studentsEnrolled.length < foundCourse.capacity);
    return notFull;
  }

  /**
   * finds out if the given student is already in the course or not
   * @param {*} studentID student to check
   * @param {*} courseID course to check
   * @returns true/false if they are already in or not
   */
  const studentInCourse = (studentID, courseID) => {
    const foundCourse = courses.find(course => course.id === courseID);
    if (!foundCourse)
      return -1;

    return (foundCourse.studentsEnrolled.includes(`${studentID}`));

  }

  /**
   * Checks if selected course has time conflict with any other course student is enrolled in
   * @param {*} studentID student who's courses to check
   * @param {*} courseID new course to check if fits in schedule
   * @returns true/false if there is a conflict or not
   */
  const courseTimeConflict = (studentID, courseID) => {
    const studentCourses = coursesData.filter((course) => course.studentsEnrolled.includes(`${studentID}`))
    // no courses = no time conflict :)
    if (studentCourses.length === 0)
      return false; 

    // otherwise we gotta actually check :(
    const foundCourse = courses.find(course => course.id === courseID);
    if (!foundCourse)
      return -1;

    if(studentCourses.find(course => course.timeOfDay === foundCourse.timeOfDay)) {
      return true;
    }

    return false;
  }

  /**
   * enrolls currently selected student in the course clicked
   * @param {*} selectedCourse course enroll was clicked on
   * @returns -1 if failed, otherwise N/A
   */
  const enrollCurrentStudent = async (selectedCourse) => {
    if (!spaceInCourse(selectedCourse)) {
      // show capacity full warning
      toast.error("Course full!");
      return -1;
    } else if (studentInCourse(selectedStudent, selectedCourse)) {
      // show already in course warning (shouldnt happen cause button changes)
      toast.error("Student already in course!");
      return -1;
    } else if (courseTimeConflict(selectedStudent, selectedCourse)) {
      // show time conflict warning 
      toast.error("Course has time conflict with another student course!");
      return -1;
    }

    // create json body we are sending
    let newData = { "studentID": `${selectedStudent}` } 
    try {
      // then try to send it as a patch
      const response = await axios.patch(`http://localhost:8080/courses/addstudent/${selectedCourse}`, newData);
      toast(`Enrolled in ${response.data.courseName}!`);
      await coursesRefetch();
      // Handle successful update
    } catch (error) {
      console.error('Update failed:', error);
      // Handle error
    }
  }

  /**
   * unenrolls currently selected student in the course clicked
   * @param {*} selectedCourse course enroll was clicked on
   * @returns -1 if failed, otherwise N/A
   */
  const unenrollCurrentStudent = async (selectedCourse) => {
    if (!studentInCourse(selectedStudent, selectedCourse)) {
      // (shouldnt happen cause button changes)
      toast.error("Student not in course!");
      return -1;
    }

    // create json body we are sending
    let newData = { "studentID": `${selectedStudent}` } 
    try {
      // then try to send it as a patch
      const response = await axios.patch(`http://localhost:8080/courses/removestudent/${selectedCourse}`, newData);
      toast(`Unenrolled from ${response.data.courseName}!`);
      await coursesRefetch();
      // Handle successful update
    } catch (error) {
      console.error('Update failed:', error);
      // Handle error
    }
  }

  return (
    <div className="courseDisplay">
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
      />
      <div>
        <StudentDropdown students={studentsData} onStudentSelect={onStudentSelect} className="dropdown" />
        { courses?.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Time</th>
                <th>Capacity</th>
                { selectedStudent !== -1 && (
                  <th>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              { courses?.map( (course, index) => (
                <tr key={`course-${index}`}>
                  <td>{course.id}</td>
                  <td>{course.courseName}</td>
                  <td>{course.department}</td>
                  <td>{course.timeOfDay}</td>
                  <td>{course.studentsEnrolled.length}/{course.capacity}</td>
                  { selectedStudent !== -1 && (
                    <td>
                      { !studentInCourse(selectedStudent, course.id) ? (
                        <Button 
                          variant="success"
                          onClick={() => enrollCurrentStudent(course.id)}
                        >Enroll</Button>
                      ) : (
                        <Button 
                          variant="danger"
                          onClick={() => unenrollCurrentStudent(course.id)}
                        >Unenroll</Button>
                      )}
                    </td>
                  ) }
                </tr>
              )) }
            </tbody>
          </Table>
        ) : (
          <h4>Select a student or enroll this student in a course to see their schedule</h4>
        )}
      </div>  
    </div>
  );
};

export default CoursesDisplay;