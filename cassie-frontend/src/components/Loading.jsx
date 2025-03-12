import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Loading.css';

const Loading = ({ isLoading }) => {
  return (
    <CSSTransition
      in={isLoading}
      timeout={300}
      classNames="loading-fade"
      unmountOnExit
    >
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </CSSTransition>
  );
};

export default Loading; 