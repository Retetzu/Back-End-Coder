
const { promises: fs } = require('fs')

class Contenedor {
    constructor(ruta){
        this.ruta = ruta;
    }

    async fileInJSON() {
        let fileTxt = await fs.readFile(this.ruta, "utf-8");
        let type = JSON.parse(fileTxt);
        return type;
      }

    async save(nuevoObjeto) {
        const objetos = await this.getAll()

        let newId
        if(objetos.length == 0) {
            newId = 1
        } else {
            const ultimoId = objetos[objetos.length - 1].id
            newId = ultimoId + 1;
        }

        objetos.push({...nuevoObjeto, id: newId})

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2))
            return newId
        }
        catch (error) {
            throw Error('Error al guardar: $(error)')
        }
    }

    async getById(id) {
        let type = await this.fileInJSON();
        let product = type.find((product) => product.id == id);
        return console.log(product);
      }

    async getRandom() {
        const objetos = await this.getAll()

        const lastId = objetos[objetos.length - 1].id
        const random = Math.floor((Math.random() * (lastId + 1)));
            return this.getById(random)
    }
    
    

    async getAll() { 
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objetos);
        }
        catch (error) {
            return []
        }
    } 

    async deleteById(id) {
        const objetos = await this.getAll()
        
        const nuevoObjeto = objetos.filter(element => element.id !== id)
        if(nuevoObjeto.length === objetos.length) {
            return []
        }

        try {
            await fs.writeFile(this.ruta, JSON.stringify(nuevoObjeto, null, 2))
        } catch (error) {
            throw new Error('Error')
        }
    }

    async deleteAll() {
            try {
              await fs.unlink(this.ruta);
          } catch(error) {
              console.log(error.message);
          }
    }
}

module.exports = Contenedor

const listaProductos = new Contenedor('../Clase6/DB/Productos.txt')
// listaProductos.deleteAll()
// listaProductos.save({title: 'Tinta', Price: '1600'})
// listaProductos.getAll()
// listaProductos.getById(5)