import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Customers.css"

interface Customer {
   _id: string
   name: string
   email: string
   balance: number
}

interface CustomerTableRowProps {
   customer: Customer
}

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

interface CustomerTableProps {
   customers: Customer[]
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
   return (
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
}

const CustomersPage: React.FC = () => {

   const [customers, setCustomers] = useState<Customer[]>([])

   const fetchCustomers = async () => {
      const response = await fetch('http://localhost:5000/customers')
      const data = await response.json()
      setCustomers(data)
   }


   useEffect(() => {
      fetchCustomers()
   }, [])


   return (
      <div>
         <h1>Customers</h1>
         <CustomerTable customers={customers} />
      </div>
   )
}

export default CustomersPage
