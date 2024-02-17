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
          {"All Courses"}
        </ToggleButton>
        <ToggleButton
          id={`radio-schedules`}
          type="radio"
          variant={'outline-success'}
          name="radio"
          value={"schedules"}
          checked={state === "schedules"}
          onChange={(e) => setState(e.currentTarget.value)}
        >
          {"Student Schedule"}
        </ToggleButton>
      </ButtonGroup>
    </>
  );
};

export default ViewToggle;