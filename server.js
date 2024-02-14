const express = require('express');
const app = express();
const path = require('path');
const port  = 3000
const animalData = require('./animals.json')

// //  Unblock static folder so the browser can req resoures
app.use(express.static('public'))

// //  API Routes

app.get('/api/animals', (req, res) => {
   res.json(animalData)
})

app.get('/api/animals/:animalType', (req, res) => {
  const results = animalData.filter(a => a.type === req.params.animalType)
  if(results.length === 0) {
    return res.status(404).send(`<h1 style="display:flex; justify-content:center; padding-top:333px; font-size:69px "><span style="color:red">ERROR</span>: "${req.params.animalType}" not found</h1>`)
  }

  res.json(results)
})

// // HTML (VIEW) Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})


app.get('/add-animal', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "add-animal.html"))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"))
})

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`)
})