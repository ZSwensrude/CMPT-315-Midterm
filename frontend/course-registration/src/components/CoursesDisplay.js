import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './components.css'
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import StudentDropdown from "./StudentDropdown";

const CoursesDisplay = () => {
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
    console.log("courses", coursesData);
  }, [coursesData]);

  useEffect( () => {
    console.log("students", studentsData);
  }, [studentsData]);

  useEffect( () => {
    console.log("selectedStudent", selectedStudent);
  }, [selectedStudent]);

  const onStudentSelect = (studentID) => {
    console.log("selected student id: ", studentID);
    setSelectedStudent(studentID);
  };


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
              </tr>
            )) }
          </tbody>
        </Table>
      </div>  
    </div>
  );
};

export default CoursesDisplay;