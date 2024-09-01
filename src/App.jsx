// src/App.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './store/themeSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/HomePage';
import CardPage from './scenes/CardPage';
import "./App.css"

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <div className='div1'>
        <h2>THE <span className='div2'>PRODUCT</span> PLATFORM</h2>
      <button className='btn1' onClick={() => dispatch(toggleTheme())}>
         {theme === 'light' ? 'DARK' : 'LIGHT'} 
      </button>
      </div>
      
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/card" element={<CardPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
