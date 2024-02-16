import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './components.css'

const CoursesDisplay = () => {

  

  return (
    <div className="courseDisplay">
      <div>
        <h1>Courses</h1>
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
            {/* gonna need to map through courses to display here */}
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>3/6</td>
            </tr>
          </tbody>
        </Table>
      </div>  
    </div>
  );
};

export default CoursesDisplay;