import { useState } from 'react';
import './App.css';
import Homepage from "./components/Homepage";
import Splashscreen from "./components/Splashscreen";

function App() {
  const [ page, setPage ] = useState(false);
  return (
    <>
      { page ? <Homepage/> : <Splashscreen appState={setPage} /> }
    </>
  );
}

export default App;
