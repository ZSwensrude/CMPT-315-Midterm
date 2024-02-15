import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ViewToggle = ({ state, setState }) => {
  return (
    <>
      <ButtonGroup>
        <ToggleButton
          id={`radio-courses`}
          type="radio"
          variant={'outline-primary'}
          name="radio"
          value={"courses"}
          checked={state === "courses"}
          onChange={(e) => setState(e.currentTarget.value)}
        >
          {"Courses"}
        </ToggleButton>
        <ToggleButton
          id={`radio-students`}
          type="radio"
          variant={'outline-success'}
          name="radio"
          value={"students"}
          checked={state === "students"}
          onChange={(e) => setState(e.currentTarget.value)}
        >
          {"Students"}
        </ToggleButton>
      </ButtonGroup>
    </>
  );
};

export default ViewToggle;