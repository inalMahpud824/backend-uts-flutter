const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes')
const port = 8000
const path = require('path')
app.use(express.json());
app.use(cors());
app.use(router)
app.use('/images', express.static(path.join(__dirname, '../uploads')));
app.listen(port, () => {
  console.log('server berjalan di port ' + port)
})

module.exports = {app}