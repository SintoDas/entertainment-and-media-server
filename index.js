const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kjin4dh.mongodb.net/?retryWrites=true&w=majority`;

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
    // const cartCollection = client.db("cartDB").collection("cart");

    app.post("/media", async (req, res) => {
      const media = req.body;
      const result = await mediaCollection.insertOne(media);
      console.log(result);
      res.send(result);
    });
    // app.post("/cart", async (req, res) => {
    //   const cart = req.body;
    //   const result = await cartCollection.insertOne(cart);
    //   console.log(result);
    //   res.send(result);
    // });

    app.get("/media/:brand", async (req, res) => {
      const brand = req.params.brand;
      const query = { brandName: brand };
      const result = await mediaCollection.find(query).toArray();
      console.log(result);
      res.send(result);
    });
    app.get("/single/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await mediaCollection.findOne(query);
      console.log(result);
      res.send(result);
    });
    app.get("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await mediaCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    app.get("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await mediaCollection.findOne(query);
      console.log(result);
      res.send(result);
    });
    // update single user
    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUSer = {
        $set: {
          img: data.img,
          name: data.name,
          brandName: data.brandName,
          type: data.type,
          price: data.price,
          description: data.description,
          rating: data.rating,
        },
      };

      const result = await mediaCollection.updateOne(
        filter,
        updatedUSer,
        options
      );
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
