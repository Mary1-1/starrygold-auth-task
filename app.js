const express = require('express')
const app = express()


require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const port = process.env.PORT || 3000


app.use(bodyParser.json());


app.use(authRoutes)
app.use(userRoutes)

mongoose.connect(process.env.MONGODB_LOCAL_DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(result =>{
    console.log('database connected');
}).catch(err => console.log(err))

app.listen(port, () =>{
    console.log(`app is running on port ${port}`)
})