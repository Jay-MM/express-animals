const express = require('express');
const app = express();
const path = require('path');
const port  = 3000
const animalData = require('./animals.json')

// //  Unblock static folder so the browser can req resoures
app.use(express.static('public'))
app.use(express.json())

// //  API Routes
app.get('/api/animals', (req, res) => {
   res.json(animalData)
})

app.get('/api/animals/:animalType', (req, res) => {
  const animalType =req.params.animalType
  const pattern = /[a-z]/g
  if (!pattern.test(animalType)) {
    res.status(400).send(`<h1 style="display:flex; justify-content:center; padding-top:183px; font-size:69px "><span style="color:red">ERROR</span>: "${animalType}" is not a valid input. Make sure to use lower-case letters only!</h1>`)
    return
  }

  const results = animalData.filter(a => a.type === animalType)

  if(results.length === 0) {
    return res.status(404).send(`<h1 style="display:flex; justify-content:center; padding-top:183px; font-size:69px "><span style="color:red">ERROR</span>: "${animalType}" not found</h1>`)
  }

  res.json(results)
})

app.post('/api/animals', (req,res) =>{
  const { name, age, type } = req.body

  if (!name || !type || !age) {
    res.status(400).json({ERROR : 'Missing name, type, or age'})
    return
  }

   // Read the last object from the json file and get its id
   const lastAnimal = animalData[animalData.length - 1];
   const lastId = lastAnimal.id;
 
   // Assign the new id as the last id plus one
   const newAnimal = {
     id: lastId + 1,
     ...req.body,
   }

  animalData.push(newAnimal)

  res.json(newAnimal)
  // res.send(req.body) also works here but you will only see the json in when the client sends a GET req


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