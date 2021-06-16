const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.json());
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const paystackRoutes = require('./routes/paystack')
const paypalRoutes = require('./routes/paypal')
const transanctionRoutes = require('./routes/transanction')
const stripeRoutes = require('./routes/stripe')
const port = process.env.PORT || 3000



app.use(stripeRoutes)
app.use(authRoutes)
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use(paystackRoutes)
app.use(paypalRoutes)
app.use(transanctionRoutes)


//MONGODB_LOCAL_DATABASE=mongodb://localhost:27017/starrygold-auth-task
//MONGODB_LOCAL_DATABASE=mongodb+srv://mary:marypassword@cluster0.golld.mongodb.net/cluster0?retryWrites=true&w=majority
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