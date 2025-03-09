// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import Dashboard from './pages/Dashboard';
import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Wrapper for consistent background */}
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
