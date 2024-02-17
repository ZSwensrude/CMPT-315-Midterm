import './App.css';
import React, { useState } from 'react';
import ViewToggle from './components/ViewToggle';
import CoursesDisplay from './components/CoursesDisplay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new query client instance
const queryClient = new QueryClient();

function App() {
  const [state, setState] = useState("courses")

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Course Registration App</h1>
        <ViewToggle state={state} setState={setState} />
        <hr />
        <CoursesDisplay scheduleDisplay={state !== 'courses'} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
