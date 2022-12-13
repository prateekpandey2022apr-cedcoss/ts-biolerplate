import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import '@shopify/polaris/build/esm/styles.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
