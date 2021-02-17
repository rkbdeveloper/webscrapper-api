const express = require('express')
const app = express()
const port = process.env.PORT || 3131
const {GetScreenShot, GetFacebookData} = require('./links')

app.get('/', (req, res) => res.status(200).json({ status: 'ok' }))

app.get('/screenshot', (req, res) => {
  const url = req.query.url
  (async () => {
    const buffer = await GetScreenShot(url)
    res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"')
    res.setHeader('Content-Type', 'image/png')
    res.send(buffer)
  })()
})

app.post('/facebook', (req, res) => {
  const url = req.query.url
  (async () => {
    const buffer = await GetFacebookImages(url)
    res.setHeader('Content-Type', 'application/json')
    res.send(buffer)
  })()
})

app.listen(port, () => console.log(`app listening on port ${port}!`))