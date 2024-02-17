import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './components.css'
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import StudentDropdown from "./StudentDropdown";
import axios from 'axios';

const CoursesDisplay = ({ scheduleDisplay }) => {
  // if no student selected, default value is -1
  const [selectedStudent, setSelectedStudent] = useState(-1);
  const [courses, setCourses] = useState([]);

  const { isPending: coursesPending, error: coursesError, data: coursesData, refetch: coursesRefetch } = useQuery({
    queryKey: ['repoCourses'],
    queryFn: () =>
      fetch('http://localhost:8080/courses').then((res) =>
        res.json(),
      ),
  });

  const { isPending: studentsPending, error: studentsError, data: studentsData, refetch: studentsRefetch } = useQuery({
    queryKey: ['repoStudents'],
    queryFn: () =>
      fetch('http://localhost:8080/students').then((res) =>
        res.json(),
      ),
  });

  useEffect( () => {
    if (scheduleDisplay){
      // if we are looking at the schedule view, get only the courses the student is in (if any)
      setCourses(coursesData.filter((course) => course.studentsEnrolled.includes(`${selectedStudent}`)));
    } else {
      // otherwise show all courses
      setCourses(coursesData);
    }
  }, [scheduleDisplay, coursesData, selectedStudent])
  
  useEffect( () => {
    console.log("courses", courses);
  }, [courses])
  
  //loading/pending checks
  if (coursesPending || studentsPending) return 'Loading...'
  if (coursesError || studentsError) return 'An error has occurred: ' + coursesError.message
  
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

  const courseTimeConflict = (studentID, courseID) => {
    const studentCourses = coursesData.filter((course) => course.studentsEnrolled.includes(`${selectedStudent}`))
    // no courses = no time conflict :)
    if (studentCourses.length === 0)
      return false; 

    // otherwise we gotta actually check :(
    const foundCourse = courses.find(course => course.id === courseID);
    if (!foundCourse)
      return -1;

    if(studentCourses.find(course => course.startTime === foundCourse.startTime)) {
      return true;
    }

    return false;
  }

  /**
   * enrolls currently selected student in the course clicked
   * @param {*} selectedCourse course enroll was clicked on
   * @returns N/A
   */
  const enrollCurrentStudent = async (selectedCourse) => {
    if (!spaceInCourse(selectedCourse)) {
      // show capacity full warning
      console.log("course full!");
      return -1;
    }

    if (studentInCourse(selectedStudent, selectedCourse)) {
      console.log("student already in course!");
      return -1;
    }

    if (courseTimeConflict(selectedStudent, selectedCourse)) {
      console.log("course has time conflict with another student course")
      return -1;
    }

    // create json body we are sending
    let newData = { "studentID": `${selectedStudent}` } 
    try {
      // then try to send it as a patch
      const response = await axios.patch(`http://localhost:8080/courses/addstudent/${selectedCourse}`, newData);
      console.log('Update successful:', response.data);
      await coursesRefetch();
      // Handle successful update
    } catch (error) {
      console.error('Update failed:', error);
      // Handle error
    }
  }

  const unenrollCurrentStudent = async (selectedCourse) => {
    if (!studentInCourse(selectedStudent, selectedCourse)) {
      console.log("student not in course!");
      return -1;
    }

    // create json body we are sending
    let newData = { "studentID": `${selectedStudent}` } 
    try {
      // then try to send it as a patch
      const response = await axios.patch(`http://localhost:8080/courses/removestudent/${selectedCourse}`, newData);
      console.log('Update successful:', response.data);
      await coursesRefetch();
      // Handle successful update
    } catch (error) {
      console.error('Update failed:', error);
      // Handle error
    }
  }


  return (
    <div className="courseDisplay">
      <div>
        <h1>Courses</h1>
        <Button variant="secondary" onClick={() => {coursesRefetch(); studentsRefetch();} } >Refresh</Button>
        <StudentDropdown students={studentsData} onStudentSelect={onStudentSelect} />
        { courses.length > 0 ? (
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
                  <td>{course.startTime}</td>
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