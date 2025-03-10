import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog-overlay" onClick={onCancel}>
            <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
                <div className="confirm-dialog-content">
                    <div className="confirm-dialog-icon">⚠️</div>
                    <h3>Confirm Unregistration</h3>
                    <p>{message}</p>
                    <div className="confirm-dialog-message">
                        This action cannot be undone. You'll need to register again if you change your mind.
                    </div>
                    <div className="confirm-dialog-actions">
                        <button 
                            className="confirm-dialog-button cancel" 
                            onClick={onCancel}
                        >
                            Keep Registration
                        </button>
                        <button 
                            className="confirm-dialog-button confirm" 
                            onClick={onConfirm}
                        >
                            Yes, Unregister
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog; 