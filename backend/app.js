const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const { MongoClient } = require("mongodb");
const Music = require('./models/Music');

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://chiho:test10.@cluster0.njoye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
  keepAlive: 1
});
async function run() {
  try {
    await client.connect();
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const database = client.db('database').collection('music');
    const allMusic = await database.find().toArray();
    res.status(200).json(allMusic);
  } catch (err) {
    res.status(404).send('Sorry page is not loading');
  }
});

app.get("/data", async (req, res, next) => {

});

app.get("/music/:id", async (req, res) => {
  let idNumber = parseInt(req.params.id);
  try {
    const music = client.db('database').collection('music');
    let query = { id: idNumber };
    const musicSong = await music.findOne(query);
    res.status(200).json(musicSong);
  } catch (err) {
    console.log(err);
  }
});

app.post('/addReview/:id', async (req, res) => {
  let idNumber = req.params.id;
  let reviewObject = req.body;
  try {
    const query = { id: idNumber };
    const musicSong = await music.findOne(query);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});