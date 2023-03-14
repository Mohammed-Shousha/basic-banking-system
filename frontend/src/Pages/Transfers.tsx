import React, { useEffect, useState } from "react"
import TransferTable from "../Components/TransferTable"


const TransfersPage: React.FC = () => {

   const [transfers, setTransfers] = useState<Transfer[]>([])

   const fetchTransfers = async () => {
      const response = await fetch("http://localhost:5000/transfers")
      const transfers = await response.json()
      setTransfers(transfers)
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
