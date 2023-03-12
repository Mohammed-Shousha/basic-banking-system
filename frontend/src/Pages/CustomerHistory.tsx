import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TransferTable } from './Transfers'
import './CustomerHistory.css'

interface Customer {
   _id: string
   name: string
   email: string
   balance: number
}

interface Transfer {
   _id: string
   from: string
   to: string
   amount: number
   date: string
}


const CustomerHistory: React.FC = () => {

   const { id } = useParams()

   const [customer, setCustomer] = useState<Customer>({
      _id: '',
      name: '',
      email: '',
      balance: 0
   })
   const [customerTransfers, setCustomerTransfers] = useState<Transfer[]>([])

   const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/customers/${id}`)
      const customer = await response.json()
      setCustomer(customer)
      const response2 = await fetch(`http://localhost:5000/customerTransfers/${id}`)
      const transfers = await response2.json()
      setCustomerTransfers(transfers)
   }

   useEffect(() => {
      fetchData()
   }, [])


   return (
      <div>
         <h1>{customer.name}</h1>
         <div className='customer-details'>
            <h3>Email:&ensp;{customer.email}</h3>
            <h3> Current Balance:&ensp;{customer.balance} $</h3>
         </div>
         {customerTransfers.length > 0 ?
            <TransferTable transfers={customerTransfers} />
            :
            <div className='no-transfers'>
               <h1>No Transfers Yet</h1>
            </div>
         }
      </div>

   )
}

export default CustomerHistory