const express = require('express');
const { Router } = express;

const app = express();

const productos = Router();

const listaProductos = []

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

app.get('/api/productos', (req, res) => {
    res.send(listaProductos)
  })

app.get('/api/productos/:id', (req, res) => {
    const busqueda = listaProductos.find(busqueda => busqueda.id === parseInt(req.body.id))
    res.send(busqueda)
})

app.post('/api/productos', (req, res, next) => {
    const title = req.title
    if (!title) {
        res.status(400).send('some data missing')
    }
    next()
},
    (req, res) => {
        console.log(req.body);
        res.send('El producto fue recibido')
}) 

app.put('/api/productos/:id', (req, res, next) => {
    res.send('post ok')
})

app.delete('/api/productos/:id', (req, res) => {
    const deleteado = listaProductos.find(deleteado => deleteado.id === parseInt(req.body.id))
    if (!deleteado) return res.status(404).send('Producto no encontrado')
    const index = listaProductos.indexOf(deleteado)
    listaProductos.splice(index, 1)
    res.send(deleteado)
})

app.use('/productos', productos)

const PORT = 8080
app.listen(PORT, () => {
    console.log('server on');
})