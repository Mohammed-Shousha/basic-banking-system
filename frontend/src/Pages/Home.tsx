import React, { useState, useEffect } from 'react'
import AlertModal from '../Components/AlertModel'
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
   const [showAlert, setShowAlert] = useState<boolean>(false)
   const [alertMessage, setAlertMessage] = useState<string>("")


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

   const handleCloseAlert = () => {
      setShowAlert(false)
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

   const handleSwap = () => {
      setFromId(toId)
      setToId(fromId)
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
         setAlertMessage("Transfer Successful")
         setShowAlert(true)
         fetchCustomers()
      } else {
         setAlertMessage(data.error)
         setShowAlert(true)
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
                  <div className='customer-card'>
                     <CustomerCard
                        customer={customers.find(customer => customer._id === fromId) as Customer}
                        onClick={() => handleShowModal()}
                     />
                     <p>Click the card to select another customer</p>
                  </div>
                  :
                  <button onClick={() => handleShowModal()}>Select Customer</button>
               }
            </div>
            {fromId && toId &&
               <div className='swap' onClick={handleSwap}>⇆</div>
            }
            <div>
               <h2>To</h2>
               {toId ?
                  <div className='customer-card'>
                     <CustomerCard
                        customer={customers.find(customer => customer._id === toId) as Customer}
                        onClick={() => handleShowModal(false)}
                     />
                     <p>Click the card to select another customer</p>
                  </div>
                  :
                  <button onClick={() => handleShowModal(false)}>Select Customer</button>
               }
            </div>
         </div>



         <div className='amount'>
            <h2>Amount:</h2>
            <input type="number" value={amount} onChange={handleAmountChange} />
         </div>

         <div className='confirm'>
            <button onClick={handleSubmit}>Transfer</button>
         </div>

         <Modal showModal={showModal} onClose={handleCloseModal}>
            {convertTo2DArray(customers.filter(customer => customer._id !== fromId && customer._id !== toId)).map((customersArr, i) => (
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

         <AlertModal showAlert={showAlert} onClose={handleCloseAlert} message={alertMessage} />
      </>
   )
}

export default Home
