const router = require('express').Router();
const path = require('path');
const fs = require('fs')
const connection = require('../db/connection');

const dbPath = path.join(__dirname, '..', 'db', 'animals.json')

// //  API Routes
router.get('/animals', async (req, res) => {
  try{
    const [results] = await connection.promise().query(`
    SELECT animals.id, animals.name, animals.age, animalTypes.name AS animalType
    FROM animals
    INNER JOIN animalTypes ON animals.animalTypeId = animalTypes.id
    `)
    res.json(results)
  }catch(err){
    res,status(500).json(err)
  }

 })
 
 
 router.post('/animals', async (req,res) =>{
  const { name, age, animalTypeId, hasOwner } = req.body
  
  if (!name || !animalTypeId || !age) {
    res.status(400).json({ERROR : 'Missing name, animalTypeId, or age'})
    return
  }

   try {
     await connection.promise().query('INSERT INTO animals (name, age, animalTypeId, hasOwner) VALUES (?,?,?,?)',[name, age, animalTypeId, hasOwner])
     res.json('Animal has been added successfully!')
   } catch (err) {
     res.status(500).json(err)
   }
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
 
 router.delete('/animals/:id', async (req, res) => {
 
   const id = req.params.id
   if (!id) {
     return res.status(400).json({ error: 'We need an id'})
   }

    try{
      const [results] = await connection.promise().query('DELETE FROM animals WHERE id = ?', [id])
      res.json('Animal has been deleted successfully!')
    } catch (err) {
      res.status(500).json(err)
    }

 console.log('Delete route hit!')
 })

module.exports = router