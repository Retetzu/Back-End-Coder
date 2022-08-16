const Contenedor = require('../Clase4/Archivos')

const listaProductos = new Contenedor('./DB/Productos.txt')

const http = require('http')

const express = require('express')

const app = express()


const server = http.createServer((req, res, next) => {
    res.end('Hola')
})

app.get('/', (req, res, next) => {
    res.send('<h1 style="color:green;"> Welcome </h1>')
})

app.listen(8080, ()=> {
   console.log("Welcome Server running under http://localhost:8080");
})

app.get('/productos', async(req, res) => {
  try {
    const objetos = await listaProductos.getAll()
    res.json({objetos})
  } catch (error) {
    res.send(`Error al leer el archivo: ${error}`)
    throw Error(`Error al leer el archivo: ${error}`)
  }
})

//Hacer algo parecido con math.random y getById

app.get('/productoRandom', async(req, res) => {
  try {
    const randomProduct = await listaProductos.getRandom()
    res.json({randomProduct});
  } catch (error) {
    res.send(`Error al leer el archivo: ${error}`)
    throw Error(`Error al leer el archivo: ${error}`)
  }
})