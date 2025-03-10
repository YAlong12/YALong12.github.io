// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventsList from './pages/EventsList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './pages/CreateEvent';
import PageTransition from './components/PageTransition';

import './App.css';

const AppContent = () => {
    const location = useLocation();

    return (
        <div className="app-container">
            <Header />
            <PageTransition location={location}>
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<EventsList />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/events/create" 
                        element={
                            <ProtectedRoute adminOnly>
                                <CreateEvent />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </PageTransition>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
