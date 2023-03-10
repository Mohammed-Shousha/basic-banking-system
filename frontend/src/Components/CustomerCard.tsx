import React, { MouseEventHandler } from 'react'
import './CustomerCard.css'

interface CustomerFields {
   _id: string;
   name: string;
   email: string;
   balance: number;
}

interface Customer {
   customer: CustomerFields;
   onClick: MouseEventHandler<HTMLDivElement>;
}


const CustomerCard: React.FC<Customer> = ({ customer, onClick }) => {
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