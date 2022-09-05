import React from 'react';
import Notes from './pages/Notes/Notes';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Archive from './pages/Archive/Archive';
import Search from './pages/Search/Search';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Notes />}/>
      <Route path="/archive" element={<Archive />}/>
      <Route path="/search" element={<Search />}/>
    </Routes>
  );
}

export default App;
