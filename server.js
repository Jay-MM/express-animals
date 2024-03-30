
const fs = require('fs')
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
 // Read animals.json contents
  fs.readFile(path.join(__dirname, 'animals.json'), 'utf-8', function(err, data){
    if (err) {
       res.status(500).json(err)
       return
    }
    const json = JSON.parse(data)
    // res.json the parsed array
    res.json(json)
  })
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
  //  read contents of animals.JSON file
  fs.readFile(path.join(__dirname, 'animals.json' ), 'utf-8', function(err,data){
    if (err) {
      res.status(500).json(err)
      return
    }

    // parse string into JSON
    const animalData = JSON.parse(data)
    // push newAnimal into JSON
    animalData.push(newAnimal)
    // stringify animal array & save file
    fs.writeFile(path.join(__dirname, 'animals.json'), JSON.stringify(animalData), function(err, data){
      if (err) {
        res.status(500).json(err)
        return
      }
      res.status(200).send(newAnimal)
      // res.json(newAnimal)
      // res.send(req.body) also works here but you will only see the json in when the client sends a GET req
    }) 
  })
})

app.get('/api/animals/:animalType', (req, res) => {
  const animalType =req.params.animalType
  const pattern = /[a-z]/g
  if (!pattern.test(animalType)) {
    res.status(400).send(`<h1 style="display:flex; justify-content:center; padding-top:183px; font-size:69px "><span style="color:red">ERROR</span>: "${animalType}" is not a valid input. Make sure to use lower-case letters only!</h1>`)
    return
  }
  
      // Read animals.json contents
      fs.readFile(path.join(__dirname, 'animals.json'), 'utf-8' ,function(err, data) {
        if (err) {
          res.status(500).json(err)
          return
        }
        const animalArray = JSON.parse(data)
        // res.json the parsed array
        const results = animalArray.filter(a => a.type === animalType)
      
        if(results.length === 0) {
          return res.status(404).json({ error:'No animals were found. Try adding some.' })
        }
      
        res.json(results)
      }) 
      

})

app.delete('/api/animals/:id', (req, res) => {

  const id = req.params.id
  if (!id) {
    return res.status(400).json({ error: 'We need an id'})
  }
  // read file 
  fs.readFile(path.join(__dirname, 'animals.json'),  'utf8', function(err, data){
    // parse contents
    const animalData = JSON.parse(data)
    // modify contents
    const updatedAnimalData = animalData.filter(animal => id != animal.id)
    console.log(updatedAnimalData)
    // stringify contents re-save file 
    fs.writeFile(path.join(__dirname, 'animals.json'), JSON.stringify(updatedAnimalData), function(err){
      if(err) {
        return res.status(500).json(err)
      }
      res.json(true)
    })
  })

console.log('Delete route hit!')
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