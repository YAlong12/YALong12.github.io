import React from 'react';
import './WelcomeSection.css';
import decorativeBorder from '../assets/decorative-border.png';

function WelcomeSection() {
    return (
        <div className="welcome-container">
            <h1>Welcome to Cassie</h1>
            <p>Your place for community events in Gilbert.</p>
            
            {/* Decorative Border */}
            <div className="decorative-border"></div>
        </div>
    );
}

export default WelcomeSection;
