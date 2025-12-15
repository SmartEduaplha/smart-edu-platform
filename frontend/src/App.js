import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard'; // 👈 استدعاء الصفحة الجديدة

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="App font-sans text-right" dir="rtl">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 👇 الباب السري للمعلم */}
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;