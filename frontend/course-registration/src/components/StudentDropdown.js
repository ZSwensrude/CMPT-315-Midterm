import React, {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const StudentDropdown = ({ students, onStudentSelect }) => {
  const [selected, setSelected] = useState({});

  const studentSelected = (student) => {
    setSelected(student);
    onStudentSelect(student.studentID ?? -1)
  }


  return(
    <>
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          {!selected.name ? "Select Student" : selected.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          { selected.name && (
            <>
              <Dropdown.Item onClick={() => studentSelected({})} >Deselect</Dropdown.Item>
              <Dropdown.Divider />
            </>
          ) }
          { students.map( (student, index) => (
            <Dropdown.Item 
              key={`student-${index}`}  
              onClick={() => studentSelected(student)} 
              active={student.studentID === selected}
            >{student.name}</Dropdown.Item>
          )) }
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default StudentDropdown;