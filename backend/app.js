const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 5000;
const path = "./data.json";
let json;

try {
  if (fs.existsSync(path)) {
    json = require(path);
  }
} catch (err) {
  console.error(err);
}

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send('Backend is running');
});

app.get("/data", async (req, res, next) => {
  try {
    const { data } = await axios.get('https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json');
    if ((json == undefined || json.length == undefined || json.length < 0)) {
      fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.log(err);
        }
        console.log("File has been saved");
      });
    }
    res.status(200).json(json);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/music/:id", async (req, res, next) => {
  fs.readFile('./data.json', 'utf8', function (err, data) {
    const jsonData = JSON.parse(data);
    const index = jsonData.videos.findIndex((music) => {
      return music.id == req.params.id;
    });
    res.status(200).json(jsonData.videos[index]);
  });
});

app.post('/songs', async (req, res) => {
  console.log(req.body.name);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});