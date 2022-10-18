import React from 'react';
import Notes from './pages/Notes/Notes';
import {
  Routes,
  Route,
} from 'react-router-dom';
import Archive from './pages/Archive/Archive';
import Search from './pages/Search/Search';
import SignIn from './pages/Auth/SignIn/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Notes />}/>
      <Route path="/archive" element={<Archive />}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
