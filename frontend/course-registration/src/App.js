import './App.css';
import React, { useState } from 'react';
import ViewToggle from './components/ViewToggle';
import CoursesDisplay from './components/CoursesDisplay';
import ScheduleDisplay from './components/ScheduleDisplay';

function App() {
  const [state, setState] = useState("courses")

  return (
    <div className="App">
      <h1>Course Registration main page</h1>
      <ViewToggle state={state} setState={setState} />
      { state === 'courses' ? (
        <CoursesDisplay />
      ) : (
        <ScheduleDisplay /> 
      ) }
    </div>
  );
}

export default App;
