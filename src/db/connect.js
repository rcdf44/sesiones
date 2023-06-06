const { createConnection } = require('mysql')
const mysqlConfig = require('./config')

const conn = createConnection(mysqlConfig)

async function connect () {
  try {
    conn.connect()
    console.log('conectado correctamente')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  conn,
  connect
}
