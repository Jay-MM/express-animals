const router = require('express').Router();
const path = require('path');

// // HTML (VIEW) Routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})


router.get('/add-animal', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "add-animal.html"))
})

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "about.html"))
})


module.exports = router