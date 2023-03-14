import React from "react"
import "./Modal.css"


interface ModalProps {
   showModal: boolean
   onClose: () => void
   children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ showModal, onClose, children }) => (
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
)

export default Modal