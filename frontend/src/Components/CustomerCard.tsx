import React, { MouseEventHandler } from 'react'
import './CustomerCard.css'

interface Customer {
   _id: string;
   name: string;
   email: string;
   balance: number;
}

interface CustomerCardProps {
   customer: Customer;
   onClick: MouseEventHandler<HTMLDivElement>;
}


const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {
   return (
      <div className="card" onClick={onClick}>
         <div>
            <h5>{customer.name}</h5>
            <h6>{customer.email}</h6>
         </div>
         <p >{customer.balance} $</p>
      </div>
   )
}

export default CustomerCard