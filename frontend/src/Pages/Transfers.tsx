import React, { useEffect, useState } from "react"

interface Transfer {
   _id: string
   from: string
   to: string
   amount: number
   date: string
}

interface TransferTableRowProps {
   transfer: Transfer
}

const TransferTableRow: React.FC<TransferTableRowProps> = ({ transfer }) => {

   const convertDate = (date: string) => {
      const newDate = new Date(date)
      return newDate.toLocaleTimeString() + " " + newDate.toLocaleDateString()
   }

   return (
      <tr>
         <td>{transfer.from}</td>
         <td>{transfer.to}</td>
         <td>{transfer.amount} $</td>
         <td>{convertDate(transfer.date)}</td>
      </tr>
   )
}

interface TransferTableProps {
   transfers: Transfer[]
}

export const TransferTable: React.FC<TransferTableProps> = ({ transfers }) => {

   return (
      <table>
         <thead>
            <tr>
               <th>From</th>
               <th>To</th>
               <th>Amount</th>
               <th>Date</th>
            </tr>
         </thead>
         <tbody>
            {transfers.map((transfer) => (
               <TransferTableRow key={transfer._id} transfer={transfer} />
            ))}
         </tbody>
      </table>
   )
}

const TransfersPage: React.FC = () => {

   const [transfers, setTransfers] = useState<Transfer[]>([])

   const fetchTransfers = async () => {
      const response = await fetch("http://localhost:5000/transfers")
      const data = await response.json()
      setTransfers(data)
   }

   useEffect(() => {
      fetchTransfers()
   }, [])

   return (
      <div>
         <h1>Transfers</h1>
         <TransferTable transfers={transfers} />
      </div>
   )
}

export default TransfersPage
