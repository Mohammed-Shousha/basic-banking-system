import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CustomerTable.css'


const CustomerTableRow: React.FC<CustomerTableRowProps> = ({ customer }) => {
   const [showInfo, setShowInfo] = useState(false)

   const handleRowClick = () => {
      setShowInfo(!showInfo)
   }

   return (
      <>
         <tr onClick={handleRowClick} className='customer-row'>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.balance}&emsp;&emsp;{showInfo ? "▲" : "▼"}</td>
         </tr>
         {showInfo && (
            <tr >
               <td className='transfer-history' colSpan={3}>
                  <Link to={`/customers/${customer._id}`} >
                     {customer.name}'s Transfers History
                  </Link>
               </td>
            </tr>
         )}
      </>
   )
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => (
   <table>
      <thead>
         <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
         </tr>
      </thead>
      <tbody>
         {customers.map((customer) => (
            <CustomerTableRow key={customer._id} customer={customer} />
         ))}
      </tbody>
   </table>
)

export default CustomerTable
