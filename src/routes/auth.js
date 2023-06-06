const express = require('express')
const routeAuth = express.Router()
const sha256 = require('sha256')
const { conn } = require('../db/connect')
const { usuario } = require('../global')

// GET

routeAuth.get('/login', function (req, res) {

  res.cookie("connect.sid", "", {
    expires: new Date(Date.now())
  })

  res.status(200).cookie('id', '', {
    expires: new Date(Date.now())
  }).render('index', {
    v: 1
  })
})

routeAuth.get('/register', function (req, res) {
  res.status(200).render('index', {
    v: 0
  })
})

// POST

routeAuth.post('/setRegister', async function (req, res) {
  try {
    const sql = 'INSERT INTO usuario SET ?'
    req.body.clave = sha256(req.body.clave)
    const data = req.body
    await conn.query(sql, data)

    res.json({
      msg: 'Ingresado correctamente',
      status: 200
    })
  } catch (err) {
    res.json({
      msg: 'Error al insertar',
      status: 400
    })
  }
})

routeAuth.post('/setLogin', function (req, res) {
  // const textEncoder = new TextEncoder()
  // let data = textEncoder.encode(req.body.clave)
  // let data2 = textEncoder.encode(req.body.clave)
  // puedo codificar el codigo con TextEncoder a array de 8 bits

  // data.forEach(function(el, i){
  //  console.log(data[i] == el);
  // })

  if (encodeURI(req.body.clave).includes('%20') || encodeURI(req.body.clave).includes('<>')) {
    return res.json({
      msg: 'Hemos detectado comportamiento raro en su contraseña, mas mañoso'
    })
  }

  const { clave, nombre } = req.body
  const claveCod = sha256(clave)
  const sqlSelect = `SELECT * FROM usuario WHERE clave = '${claveCod}' AND nombre = '${nombre}'`
  conn.query(sqlSelect, function (err, succ) {
    if (err) return console.log(Error('Error: ' + err))

    if (succ.length === 0) {
      return res.json({
        msg: 'Usuario no existente',
        status: false
      })
    }

    usuario.id = succ[0].id
    usuario.ci = succ[0].ci
    usuario.nombre = succ[0].nombre

    res.cookie('id', succ[0].id).json({
      msg: `/ini/home/${succ[0].clave}`,
      status: true
    })
  })
})

module.exports = routeAuth
