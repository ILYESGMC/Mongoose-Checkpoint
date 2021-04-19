require('dotenv').config({path:'./config/.env'})
const express = require('express')
const app = express();
const mongoose = require('mongoose')

const user =  process.env.USER; 
const password = process.env.PASSWORD;
const Mongourl = `mongodb+srv://${user}:${password}@cluster0.zbckh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;


//Parse data
app.use(express.json())
app.use('/person', require('./Routes/personRoute'))

mongoose.connect(Mongourl,{ useUnifiedTopology: true, useNewUrlParser: true },(err)=>{
    err ? console.log(err) : console.log('DB is connected')
})
app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server running on ${hostname}:${port}`)
})