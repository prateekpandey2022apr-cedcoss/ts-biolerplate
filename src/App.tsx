import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './Components/Login/Login';
import '@shopify/polaris/build/esm/styles.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} /> */}
    </Routes>
  );
}

export default App;
