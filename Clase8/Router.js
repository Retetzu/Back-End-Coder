const express = require('express');
const { Router } = express;

const app = express();

const productos = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use('/', productos)

const listaProductos = []

productos.get('/api/productos', (req, res) => {
    console.log('get ok')
})

productos.post('/api/productos', (req, res, next) => {
    const {title , price} = req.body

    if(!title || !price){        
      res.status(400).send('producto no encontrado')    
}
    next();

}, (req, res) => {

    const {title , price} = req.body

    listaProductos.push({title, price})    
    console.log(req.body);    
    res.send('producto guardado con exito')
})

const PORT = 8080
app.listen(PORT, () => {
    console.log('server on');
})



// productos.get('/api/productos/:id', (req, res) => {
//     const busqueda = listaProductos.find(busqueda => busqueda.id === parseInt(req.body.id))
//     res.send(busqueda)
// })