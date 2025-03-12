import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated (you can modify this based on your auth implementation)
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return (
      <div className="not-signed-in">
        <div className="message-box">
          <h2>Not Signed In</h2>
          <p>Please sign in to access your dashboard</p>
          <Navigate to="/login" state={{ from: window.location.pathname }} replace>
            <button className="sign-in-button">Sign In</button>
          </Navigate>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 