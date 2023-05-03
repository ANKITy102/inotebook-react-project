const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo()
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())//-->middleware   //used to send json from our side
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/auth', require('./routes/auth'))  // brings the data of routes/auth to url localhost/api/auth
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})