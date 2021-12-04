const { MongoClient } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
// Database connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uuip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();
    const database = client.db("Resume_web");
    const cartCollection = database.collection("cart");
    const commentCollection = database.collection("comments");

    app.get("/cart", async (req, res) => {
      const carts = await cartCollection.find({}).toArray();
      res.send(carts);
    });

    app.get("/comments", async (req, res) => {
      console.log("hi");
      const comments = await commentCollection.find({}).toArray();
      res.send(comments);
    });
  } finally {
  }
};
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("hi server");
});

app.listen(port, () => {
  console.log(port);
});
