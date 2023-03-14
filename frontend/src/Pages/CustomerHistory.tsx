import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TransferTable from '../Components/TransferTable'
import './CustomerHistory.css'


const CustomerHistory: React.FC = () => {

   const { id } = useParams()

   const [customer, setCustomer] = useState<Customer>()
   const [customerTransfers, setCustomerTransfers] = useState<Transfer[]>([])
   const [loading, setLoading] = useState(true)

   const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/customers/${id}`)
      const { customer, transfers } = await response.json()
      setCustomer(customer)
      setCustomerTransfers(transfers)
      setLoading(false)
   }

   useEffect(() => {
      fetchData()
   }, [])


   return (
      <div>
         {loading ?
            <div className='loading-spinner'>
               <div className='spinner'></div>
            </div>
            :
            <>
               <h1>{customer?.name}</h1>
               <div className='customer-details'>
                  <h3>Email:&ensp;{customer?.email}</h3>
                  <h3> Current Balance:&ensp;{customer?.balance} $</h3>
               </div>
               {
                  customerTransfers.length == 0 ?
                     <div className='no-transfers'>
                        <h1>No Transfers Yet</h1>
                     </div>
                     :
                     <TransferTable transfers={customerTransfers} />
               }
            </>
         }
      </div>
   )
}

export default CustomerHistory