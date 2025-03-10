import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './PageTransition.css';

const PageTransition = ({ children, location }) => {
    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                key={location.pathname}
                timeout={300}
                classNames="page"
                unmountOnExit
            >
                <main className="page">
                    {children}
                </main>
            </CSSTransition>
        </SwitchTransition>
    );
};

export default PageTransition; 