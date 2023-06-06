const express = require('express')
const session = require('express-session')
const routeCar = express.Router()

routeCar.use(session({
    secret: '987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b',
    resave: false,
    saveUninitialized: false
}))
  

routeCar.get("/carros", function(req, res) {
    console.log(req.session);
    res.send("ruuuuuuuun")
})


module.exports = routeCar