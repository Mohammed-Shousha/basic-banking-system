import React, { useState, useEffect } from 'react'
import CustomerCard from '../Components/CustomerCard'
import Modal from '../Components/Modal'
import './Home.css'

interface Customer {
   _id: string
   name: string
   email: string
   balance: number
}


const Home: React.FC = () => {
   const [customers, setCustomers] = useState<Customer[]>([])
   const [fromId, setFromId] = useState<string>()
   const [toId, setToId] = useState<string>()
   const [updateFrom, setUpdateFrom] = useState<boolean>(true);
   const [amount, setAmount] = useState<string>("")
   const [showModal, setShowModal] = useState<boolean>(false)

   const fetchCustomers = async () => {
      const response = await fetch('http://localhost:5000/customers')
      const data = await response.json()
      setCustomers(data)
   }

   const convertTo2DArray = (arr: Customer[]): Customer[][] => {
      const cols = Math.ceil(arr.length / 2)
      const rows = Math.ceil(arr.length / cols)
      const result = []

      for (let i = 0; i < rows; i++) {
         const row = []

         for (let j = 0; j < cols; j++) {
            const index = i * cols + j

            if (index < arr.length) {
               row.push(arr[index])
            }
         }

         result.push(row)
      }

      return result
   }

   const handleShowModal = (from: boolean = true) => {
      setShowModal(true)
      setUpdateFrom(from)
   }

   const handleCloseModal = () => {
      setShowModal(false)
   }

   const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(event.target.value)
   }

   const handleFromCustomer = (id: string) => {
      setFromId(id)
      handleCloseModal()
   }

   const handleToCustomer = (id: string) => {
      setToId(id)
      handleCloseModal()
   }


   const handleSubmit = async () => {
      const response = await fetch('http://localhost:5000/addTransfer', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            fromId,
            toId,
            amount: parseFloat(amount),
         }),

      })
      const data = await response.json()
      if (data.acknowledged) {
         alert("Transfer successful")
         fetchCustomers()
      }
   }

   useEffect(() => {
      fetchCustomers()
   }, [])

   return (
      <>
         <h1>Make Transfer</h1>
         <div className='container'>
            <div>
               <h2>From</h2>
               {fromId ?
                  <>
                     <CustomerCard
                        customer={customers.find(customer => customer._id === fromId) as Customer}
                        onClick={() => handleShowModal()}
                     />
                     <p>Click the card to select another customer</p>
                  </>
                  :
                  <button onClick={() => handleShowModal()}>Select Customer</button>
               }
            </div>

            <div>
               <h2>To</h2>
               {toId ?
                  <>
                     <CustomerCard
                        customer={customers.find(customer => customer._id === toId) as Customer}
                        onClick={() => handleShowModal(false)}
                     />
                     <p>Click the card to select another customer</p>
                  </>
                  :
                  <button onClick={() => handleShowModal(false)}>Select Customer</button>
               }
            </div>
         </div>

         <div className='amount'>
            <label>Amount:</label>
            <input type="number" value={amount} onChange={handleAmountChange} />
         </div>

         <div className='confirm'>
            <button onClick={handleSubmit}>Transfer</button>
         </div>

         <Modal showModal={showModal} onClose={handleCloseModal}>
            {convertTo2DArray(customers.filter(customer => customer._id !== fromId)).map((customersArr, i) => (
               <div key={i}>
                  {customersArr.map((customer) => (
                     <CustomerCard
                        key={customer._id}
                        customer={customer}
                        onClick={() => updateFrom ? handleFromCustomer(customer._id) : handleToCustomer(customer._id)}
                     />
                  ))}
               </div>
            ))}
         </Modal>
      </>
   )
}

export default Home
