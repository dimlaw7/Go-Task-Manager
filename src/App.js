import { useState, useEffect } from 'react';
import './App.css';
import Homepage from "./components/Homepage";
import Splashscreen from "./components/Splashscreen";

function App() {
  const [ page, setPage ] = useState(true);
  useEffect(() => {
    const getTodos = window.localStorage.getItem('initialTodos');
    if (getTodos) {
      const initialTodos = JSON.parse(getTodos);
      if (initialTodos.length > 0) {
        setPage(true);
      }
    }
    else{
      setPage(false);
    }
  }, [])
  return (
    <>
      { page ? <Homepage/> : <Splashscreen appState={setPage} /> }
    </>
  );
}

export default App;
