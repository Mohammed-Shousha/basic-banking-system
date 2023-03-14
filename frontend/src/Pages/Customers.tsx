import React, { useEffect, useState } from "react"
import CustomerTable from "../Components/CustomerTable"


const CustomersPage: React.FC = () => {

   const [customers, setCustomers] = useState<Customer[]>([])

   const fetchCustomers = async () => {
      const response = await fetch('https://banking-system-backend-nnxb.onrender.com/customers')
      const customers = await response.json()
      setCustomers(customers)
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
