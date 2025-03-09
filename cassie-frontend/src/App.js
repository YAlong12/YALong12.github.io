// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import LocalEvents from './pages/LocalEvents';
import SportsSchedules from './pages/SportsSchedules';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css'; // Keep global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* New Dropdown Pages */}
            <Route path="/pages/activities" element={<Activities />} />
            <Route path="/pages/local-events" element={<LocalEvents />} />
            <Route path="/pages/sports-schedules" element={<SportsSchedules />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
