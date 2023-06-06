const nombre = document.getElementById('nombre')
const clave = document.getElementById('clave')
const cedula = document.getElementById('cedula')
const form = document.getElementById('form')

class Consulta {
  constructor (nombre, clave, cedula, valor) {
    this.nombre = nombre
    this.clave = clave
    this.cedula = cedula
    this.valor = valor
  }

  register () {
    axios.post('/setRegister', {
      nombre: this.nombre,
      ci: this.cedula,
      clave: this.clave
    }).then(function (res) {
      const status = res.data.status
      if (status === 200)location.href = '/login'
    }).catch(function (err) {
      console.log(err)
    })
  }

  login () {
    axios.post('/setLogin', {
      nombre: this.nombre,
      clave: this.clave
    }).then(function (res) {
      const url = res.data.msg
      const status = res.data.status

      if (!status) {
        alert(url)
        return
      }

      location.href = url
    }).catch(function (err) {
      console.log(err)
    })
  }

  query () {
    if (this.valor === 0) this.register()
    else this.login()
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const consulta = new Consulta(nombre.value, clave.value, cedula === null ? '' : cedula.value, v)
  consulta.query()
})
