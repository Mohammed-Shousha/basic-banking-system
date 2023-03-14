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

const lookup = [
   {
      $lookup: {
         from: 'Customers',
         localField: 'from',
         foreignField: '_id',
         as: 'from_customer',
      },
   },
   {
      $lookup: {
         from: 'Customers',
         localField: 'to',
         foreignField: '_id',
         as: 'to_customer',
      },
   },
   {
      $addFields: {
         from: { $arrayElemAt: ['$from_customer.name', 0] },
         to: { $arrayElemAt: ['$to_customer.name', 0] }
      }
   },
   {
      $project: {
         from_customer: 0,
         to_customer: 0,
      },
   }
]

app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
   res.send('Banking System API')
})

app.post('/addTransfer', async (req, res) => {
   const { fromId, toId, amount } = req.body

   if (!fromId || !toId || !amount) {
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
      from: new ObjectId(fromId),
      to: new ObjectId(toId),
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
   const result = await transfers.aggregate(lookup).toArray()

   result.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
   })

   return res.json(result)
})

app.get('/customers/:id', async (req, res) => {
   const { id } = req.params

   const result = await customers.findOne({ _id: new ObjectId(id) })

   const transfersFrom = await transfers.aggregate([{ $match: { from: new ObjectId(id) } }, ...lookup]).toArray()
   const transfersTo = await transfers.aggregate([{ $match: { to: new ObjectId(id) } }, ...lookup]).toArray()
   const allTransfers = [...transfersFrom, ...transfersTo]
   
   allTransfers.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
   })
   
   return res.json({ customer: result, transfers: allTransfers })
})


const port = PORT || 5000

app.listen(port, () => {
   console.log(`Example app listening on port ${port}!`)
})
