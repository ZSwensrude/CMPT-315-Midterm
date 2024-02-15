import './App.css';
import React, { useState } from 'react';
import ViewToggle from './components/ViewToggle';
import CoursesDisplay from './components/CoursesDisplay';
import StudentsDisplay from './components/StudentsDisplay';

function App() {
  const [state, setState] = useState("courses")

  return (
    <div className="App">
      <h1>Course Registration main page</h1>
      <ViewToggle state={state} setState={setState} />
      { state === 'courses' ? (
        <CoursesDisplay />
      ) : (
        <StudentsDisplay /> 
      ) }
    </div>
  );
}

export default App;
