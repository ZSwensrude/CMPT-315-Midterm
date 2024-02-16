import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './components.css'
import { useQuery } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';

const CoursesDisplay = () => {

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['repoCourses'],
    queryFn: () =>
      fetch('http://localhost:8080/courses').then((res) =>
        res.json(),
      ),
  })

  useEffect( () => {
    console.log("courses", data);
  }, [data]);

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message



  return (
    <div className="courseDisplay">
      <div>
        <h1>Courses</h1>
        <Button  variant="secondary" onClick={() => refetch()} />
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
            { data?.map( (course, index) => (
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