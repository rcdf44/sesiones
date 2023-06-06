require('dotenv').config()
const express = require('express')
const app = express()
const { join } = require('path')
const { port } = require('./config')
const { connect } = require('./db/connect')
const cookieParser = require('cookie-parser')
const routeAuth = require('./routes/auth')
const routeAuthTrue = require('./routes/authTrue')
const routeCar = require('./routes/carro')
connect()

app.use(cookieParser())

app.use(express.static(join(__dirname, './public')))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', join(__dirname, './views'))

app.use('/', routeAuth)

app.use('/ini', routeAuthTrue)

app.use("/car", routeCar)

app.listen(port, function () { console.log(`escuchando en el puerto ${port}`) })
