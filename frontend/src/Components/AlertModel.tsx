import React from 'react';
import './AlertModal.css';

interface Props {
   showAlert: boolean;
   onClose: () => void;
   message: string;
}

const AlertModal: React.FC<Props> = ({ showAlert, onClose, message }) => (
   <>
      {showAlert &&
         <div className="modal-overlay">
            <div className="modal-container">
               <p>{message}</p>
               <button onClick={onClose}>OK</button>
            </div>
         </div>}
   </>
)

export default AlertModal;
