const express = require('express')
const session = require('express-session')
let { usuario } = require('../global')
const routeAuthTrue = express.Router()

routeAuthTrue.use(session({
  secret: '987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b',
  resave: false,
  saveUninitialized: false
}))

routeAuthTrue.get('/home/:id?', function (req, res) {
  if(req.session.usuario) console.log("Sesion existente");
  else req.session.usuario = usuario
    

  if (req.session.usuario.id == 0) return res.redirect('/login')
  
  res.render('home')

  usuario = ""
})

routeAuthTrue.get('/info', function (req, res) {
  res.send('hola')

  console.log(req.session.usuario);

})

module.exports = routeAuthTrue
