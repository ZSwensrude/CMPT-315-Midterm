import './App.css';
import React, { useState } from 'react';
import ViewToggle from './components/ViewToggle';
import CoursesDisplay from './components/CoursesDisplay';
import ScheduleDisplay from './components/ScheduleDisplay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new query client instance
const queryClient = new QueryClient();

function App() {
  const [state, setState] = useState("courses")

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Course Registration main page</h1>
        <ViewToggle state={state} setState={setState} />
        { state === 'courses' ? (
          <CoursesDisplay />
        ) : (
          <ScheduleDisplay /> 
        ) }
      </div>
    </QueryClientProvider>
  );
}

export default App;
