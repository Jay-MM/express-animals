const express = require('express');
const routes = require('./routes');
const app = express();
const port  = 3000

// //  Unblock static folder so the browser can req resoures
app.use(express.static('public'))
app.use(express.json())
app.use(routes)

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`)
})