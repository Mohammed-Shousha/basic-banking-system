import React from 'react'


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

const TransferTable: React.FC<TransferTableProps> = ({ transfers }) => (
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

export default TransferTable

