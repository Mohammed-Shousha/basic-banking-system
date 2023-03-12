import React from "react"
import "./Modal.css"

type Props = {
   showModal: boolean;
   onClose: () => void;
   children: React.ReactNode;
};


const Modal: React.FC<Props> = ({ showModal, onClose, children }) => (
   <>
      {showModal &&
         <div className="modal">
            <div className="modal-content">
               {children}
               <span className="close" onClick={onClose}>&times;</span>
            </div>
         </div>
      }
   </>
);

export default Modal;