const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

 

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_ASSIGNMENT}:${process.env.DB_PASSWORD}@cluster0.klwxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
  
      await client.connect(); 
      const productCollection = client.db("assignment-product").collection("product");
      const itemsCollection = client.db("assignment-product").collection("item");

    //   get data 
      app.get('/products', async(req,res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products) 
      });

      app.get('/products/:id', async(req, res) => {
        const id = req.params.id; 
        const query = {_id: ObjectId(id)};
        const product = await productCollection.findOne(query);
        res.send(product) 
      })

      app.post('/products', async(req, res) =>{
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);
        res.send(result)
      })
  
      app.delete('/products/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await productCollection.deleteOne(query);
        res.send(result)
      })


      // app.post('/select', async(req, res) => {
      //   const selectInfo = req.body;
      //   const result = await selectCollection.insertOne(selectInfo);
      //   res.send(result)
      // })

      app.put('/products/:id', async(req, res) => {
        const id = req.params.id;
        const update = req.body;
        console.log(update)
        const filter = {_id: ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = { 
          $set: { 
            quantity: update.number,
          }
        };
        const result = await productCollection.updateOne(filter, updateDoc, options);
        res.send(result)
      })

      app.post('/item', async(req, res) =>{
        const newProduct = req.body;
        const result = await itemsCollection.insertOne(newProduct);
        res.send(result)
      })
      app.get('/item', async(req,res) => {
        const query = {};
        const cursor = itemsCollection.find(query);
        const item = await cursor.toArray();
        res.send(item) 
      });
 
    } finally { 
    //   await client.close(); 
    } 
  } 
  run().catch(console.dir);

   
 
app.listen(port, ()=>{
    console.log('successfully connected', port)
})