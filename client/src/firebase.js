const { MongoClient, ServerApiVersion } = require('mongodb');
const db = require('../../server/api/exercise_data_en.json');
const uri = "mongodb+srv://javi9davi:123patata@cluster0.2xfgys2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

async function insertarComida() {
  try {
    await client.connect(); 
    const database = client.db('Cluster0'); 
    const collection = database.collection('exercise'); 
    const result = await collection.insertMany(db); 
    console.log(`Documento insertado con el _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

insertarComida().catch(console.error);