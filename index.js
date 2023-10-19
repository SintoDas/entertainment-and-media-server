const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// password 2INcDjEHBXnt89UF
//
// user sintodas1996

const uri =
  "mongodb+srv://sintodas1996:2INcDjEHBXnt89UF@cluster0.kjin4dh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // creating database
    const mediaCollection = client.db("mediaDB").collection("media");

    app.post("/media", async (req, res) => {
      const media = req.body;
      const result = await mediaCollection.insertOne(media);
      console.log(result);
      res.send(result);
    });

    app.get("/media/:brand", async (req, res) => {
      const brand = req.params.brand;
      const query = { brandName: brand };
      const result = await mediaCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Crud is running ....");
});

app.listen(port, () => {
  console.log(` APP listening on port ${port}`);
});
