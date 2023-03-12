import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

dotenv.config()


const app = express()
const { MONGO_URI, PORT } = process.env

const client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })

const db = client.db('Banking-System')
const customers = db.collection('Customers')
const transfers = db.collection('Transfers')


const idToName = async (transfers) => {
   const result = await customers.find().toArray()

   const idToName = {}
   result.forEach((customer) => {
      idToName[customer._id] = customer.name
   })

   transfers.forEach((transfer) => {
      transfer.from = idToName[transfer.from]
      transfer.to = idToName[transfer.to]
   })

   return transfers
}

app.use(express.json())
app.use(cors())


app.get('/', (_, res) => {
   res.send('Banking System API')
})

// app.post('/addUsers', async (req, res) => {
//    const result = await customers.insertMany(dummeyData)
//    res.send(result)
// })

// app.post('/deleteUsers', async (req, res) => {
//    const result = await customers.deleteMany({})
//    res.send(result)
// })


// app.post('/clearTransfers', async (req, res) => {
//    const result = await transfers.deleteMany({})
//    res.send(result)
// })

app.post('/addTransfer', async (req, res) => {
   const { fromId, toId, amount } = req.body
   
   if(!fromId || !toId || !amount) {
      return res.send({ error: 'Invalid Data' })
   }

   const from = await customers.findOne({ _id: new ObjectId(fromId) })

   if (!from) {
      return res.send({ error: 'Account Not Found' })
   }

   if (from.balance < amount) {
      return res.send({ error: 'Insufficient Balance' })
   }

   await customers.updateOne(
      { _id: new ObjectId(fromId) },
      { $inc: { balance: -amount } }
   )
   await customers.updateOne(
      { _id: new ObjectId(toId) },
      { $inc: { balance: amount } }
   )
   const result = await transfers.insertOne({
      from: fromId,
      to: toId,
      amount,
      date: new Date(),
   })
   return res.json(result)
})

app.get('/customers', async (_, res) => {
   const result = await customers.find().toArray()
   return res.json(result)
})

app.get('/transfers', async (_, res) => {
   const result = await transfers.find().toArray()

   const allTransfers = await idToName(result)

   allTransfers.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
   })

   return res.json(allTransfers)
})

app.get('/customers/:id', async (req, res) => {
   const { id } = req.params
   const result = await customers.findOne({ _id: new ObjectId(id) })
   return res.json(result)
})

app.get('/customerTransfers/:id', async (req, res) => {
   const { id } = req.params
   const transfersFrom = await transfers.find({ from: id }).toArray()
   const transfersTo = await transfers.find({ to: id }).toArray()
   const allTransfers = [...transfersFrom, ...transfersTo]

   const userTransfers = await idToName(allTransfers)

   userTransfers.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
   })

   return res.json(userTransfers)
})


const port = PORT || 5000

app.listen(port, () => {
   console.log(`Example app listening on port ${port}!`)
})
