import { useState, useEffect } from 'react';
import './App.css';
import Homepage from "./components/Homepage";
import Splashscreen from "./components/Splashscreen";

function App() {
  const [ page, setPage ] = useState(true);
  useEffect(() => {
    let initialTodos = window.localStorage.getItem('initialTodos');
    initialTodos = JSON.parse(initialTodos);
    if (initialTodos) {
        setPage(true);
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
