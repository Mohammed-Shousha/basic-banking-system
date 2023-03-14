import React from 'react'
import './CustomerCard.css'


const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => (
   <div className="card" onClick={onClick}>
      <div>
         <h5>{customer.name}</h5>
         <h6>{customer.email}</h6>
      </div>
      <p >{customer.balance} $</p>
   </div>
)


export default CustomerCard