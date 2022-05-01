require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//ENDPOINTS

//Index
app.get('/', (req, res) => {
    res.json({message: 'Oi Express'})
})

//Person Routes
const personRoutes = require('./routes/PersonRoutes')
app.use('/person', personRoutes)


// MongoDB Connection
const DB_USER =  process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.djtgp.mongodb.net/bancoapi?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000)
    console.log('Database conectada')
})
.catch((err) => console.log(err))

