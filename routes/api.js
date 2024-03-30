const router = require('express').Router();
const path = require('path');
const fs = require('fs')

const dbPath = path.join(__dirname, '..', 'db', 'animals.json')

// //  API Routes
router.get('/animals', (req, res) => {
  // Read animals.json contents
   fs.readFile(dbPath, 'utf-8', function(err, data){
     if (err) {
        res.status(500).json(err)
        return
     }
     const json = JSON.parse(data)
     // res.json the parsed array
     res.json(json)
   })
 })
 
 
 router.post('/animals', (req,res) =>{
   const { name, age, type } = req.body
   
   if (!name || !type || !age) {
     res.status(400).json({ERROR : 'Missing name, type, or age'})
     return
   }
   
   // Read the last object from the json file and get its id
 
   // Read the animals.json file
   fs.readFile(dbPath, 'utf-8', function(err, data){
     if (err) {
       res.status(500).json(err);
       return;
     }
 
     // Parse string into JSON
     const animalData = JSON.parse(data);
     
     // Check if the array is empty
     let lastId;
     if (animalData.length === 0) {
       // If the array is empty, set ID to 1
       lastId = 0;
     } else {
       // If the array is not empty, get the last animal's ID
       const lastAnimal = animalData[animalData.length - 1];
       lastId = lastAnimal.id;
     }
 
     // Assign the new id as the last id plus one
     const newAnimal = {
       id: lastId + 1,
       ...req.body,
     };
 
     // Push newAnimal into JSON
     animalData.push(newAnimal);
 
     // Stringify animal array & save file
     fs.writeFile(dbPath, JSON.stringify(animalData), function(err) {
       if (err) {
         res.status(500).json(err);
         return;
       }
       res.status(200).send(newAnimal);
     });
   });
 });
 
 router.get('/animals/:animalType', (req, res) => {
   const animalType =req.params.animalType
   const pattern = /[a-z]/g
   if (!pattern.test(animalType)) {
     res.status(400).send(`<h1 style="display:flex; justify-content:center; padding-top:183px; font-size:69px "><span style="color:red">ERROR</span>: "${animalType}" is not a valid input. Make sure to use lower-case letters only!</h1>`)
     return
   }
   
       // Read animals.json contents
       fs.readFile(dbPath, 'utf-8' ,function(err, data) {
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
 
 router.delete('/animals/:id', (req, res) => {
 
   const id = req.params.id
   if (!id) {
     return res.status(400).json({ error: 'We need an id'})
   }
   // read file 
   fs.readFile(dbPath,  'utf8', function(err, data){
     // parse contents
     const animalData = JSON.parse(data)
     // modify contents
     const updatedAnimalData = animalData.filter(animal => id != animal.id)
     console.log(updatedAnimalData)
     // stringify contents re-save file 
     fs.writeFile(dbPath, JSON.stringify(updatedAnimalData), function(err){
       if(err) {
         return res.status(500).json(err)
       }
       res.json(true)
     })
   })
 
 console.log('Delete route hit!')
 })

module.exports = router