const express = require('express')
const connectToMongo = require("./db");
const cors = require('cors')
const app = express()
const port = 5000

// connect to database - Mongoose
connectToMongo();

app.use(cors())
app.use(express.json())


// Available Routes
app.use("/api/auth", require("./routes/CreateUser"))
app.use("/api/edit", require("./routes/EditDetails"))

app.get('/', (req, res) => {
    res.send('This app is working fine now!')
})

app.listen(port, () => {
    console.log(`User Authentication system running at http://localhost:${port}`)
})