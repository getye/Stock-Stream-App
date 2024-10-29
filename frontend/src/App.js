import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {NavBar} from './navigation/NavBar';
import Register from './components/Register';
import View from './components/Admin/View';
import { Home } from './components/home';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
         <NavBar />
      </ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/view" element={<View />} />
        </Routes>
    </Router>
  );
};

export default App;
