// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EventList from './pages/EventList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <Link to="/">Home</Link> | <Link to="/events">Events</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <header className="App-header">
      <h1>Welcome to Cassie</h1>
      <p>Your event registration app is under development!</p>
    </header>
  );
}

export default App;
