const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// PASS : PODaGSQLYTVruhf2


app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://assignment:PODaGSQLYTVruhf2@cluster0.klwxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
  
      await client.connect(); 
      const productCollection = client.db("assignment-product").collection("product");

      app.get('/product', async(req,res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products) 
      });
 
    } finally { 
    //   await client.close(); 
    } 
  } 
  run().catch(console.dir);
 
app.listen(port, ()=>{
    console.log('successfully connected', port)
})