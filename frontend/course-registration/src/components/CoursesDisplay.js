import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './components.css'
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import StudentDropdown from "./StudentDropdown";
import axios from 'axios';

const CoursesDisplay = () => {
  // if no student selected, default value is -1
  const [selectedStudent, setSelectedStudent] = useState(-1);

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
    console.log("coursesData", coursesData);
  }, [coursesData])

  const onStudentSelect = (studentID) => {
    console.log("selected student id: ", studentID);
    setSelectedStudent(studentID);
  };

  const enrollCurrentStudent = async (selectedClass) => {
    // create json body we are sending
    let newData = { "studentID": `${selectedStudent}` } 
    try {
      // then try to send it as a patch
      const response = await axios.patch(`http://localhost:8080/courses/addstudent/${selectedClass}`, newData);
      console.log('Update successful:', response.data);
      // Handle successful update
    } catch (error) {
      console.error('Update failed:', error);
      // Handle error
    }
  }


  //loading/pending checks
  if (coursesPending || studentsPending) return 'Loading...'
  if (coursesError || studentsError) return 'An error has occurred: ' + coursesError.message

  return (
    <div className="courseDisplay">
      <div>
        <h1>Courses</h1>
        <Button variant="secondary" onClick={() => {coursesRefetch(); studentsRefetch();} } >Refresh</Button>
        <StudentDropdown students={studentsData} onStudentSelect={onStudentSelect} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Department</th>
              <th>Time</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            { coursesData?.map( (course, index) => (
              <tr key={`course-${index}`}>
                <td>{course.id}</td>
                <td>{course.courseName}</td>
                <td>{course.department}</td>
                <td>{course.startTime}</td>
                <td>?/{course.capacity}</td>
                { selectedStudent !== -1 && (
                  <td>
                    <Button 
                      variant="success"
                      onClick={() => enrollCurrentStudent(course.id)}
                    >Enroll</Button>
                  </td>
                ) }
              </tr>
            )) }
          </tbody>
        </Table>
      </div>  
    </div>
  );
};

export default CoursesDisplay;