require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const app = express();
const PORT  = process.env.PORT || 3001
// //  Unblock static folder so the browser can req resoures
app.use(express.static('public'))
app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
console.log(`Server listening at http://localhost:${PORT}`)
})