const express = require('express')
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text())
const port = process.env.PORT || 3131


const {GetScreenShot, GetFacebookData} = require('./function')
const {instagram} = require('./functions')

app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))

app.get('/screenshot', (req, res) => {
  const url = req.query['url'];
  (async () => {
    const buffer = await GetScreenShot(url)
    res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"')
    res.setHeader('Content-Type', 'image/png')
    res.send(buffer)
  })()
})

app.post('/facebook', (req, res) => {
  const url = req.body.url;
  (async () => {
    const buffer = await GetFacebookData(url)
    res.setHeader('Content-Type', 'application/json')
    res.send(buffer)
  })()
})


app.post('/instagram', (req, res) => {
  console.log(req.query);
  console.log(req.params);
  console.log(req.body);
  const url = req.body.url;
  console.log(url);
  (async () => {
    const buffer = await instagram.GetImage(url);
    res.setHeader('Content-Type', 'application/json')
    res.send(buffer)
  })()
})



app.listen(port, () => console.log(`app listening on port ${port}!`))