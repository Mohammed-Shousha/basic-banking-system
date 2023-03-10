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

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
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

   const from = await customers.findOne({ _id: new ObjectId(fromId) })

   if (from.balance < amount) {
      res.send({ error: 'Insufficient Balance' })
   } else {
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
      res.json(result)
   }
})

app.get('/customers', async (req, res) => {
   const result = await customers.find({}).toArray()
   res.json(result)
})

app.get('/transfers', async (req, res) => {
   const result = await transfers.find({}).toArray()
   res.json(result)
})

app.get('/customers/:id', async (req, res) => {
   const { id } = req.params
   const result = await customers.findOne({ _id: new ObjectId(id) })
   res.json(result)
})



const port = PORT || 5000

app.listen(port, () => {
   console.log(`Example app listening on port ${port}!`)
})
