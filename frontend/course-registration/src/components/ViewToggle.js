import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ViewToggle = ({ state }) => {
  const [radioValue, setRadioValue] = useState('courses');


  return (
    <>
      <ButtonGroup>
        <ToggleButton
          id={`radio-courses`}
          type="radio"
          variant={'outline-primary'}
          name="radio"
          value={"courses"}
          checked={radioValue === "courses"}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {"Courses"}
        </ToggleButton>
        <ToggleButton
          id={`radio-students`}
          type="radio"
          variant={'outline-success'}
          name="radio"
          value={"students"}
          checked={radioValue === "students"}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {"Students"}
        </ToggleButton>
      </ButtonGroup>
    </>
  );
};

export default ViewToggle;