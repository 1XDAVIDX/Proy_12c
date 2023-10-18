const readline = require('readline');
const fs = require('fs');
require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Producto {
  #codigoProducto;
  #nombreProducto;
  #inventarioProducto;
  #precioProducto;

  constructor(){
    this.#codigoProducto = '';
    this.#inventarioProducto = '';
    this.#nombreProducto = 0;
    this.#precioProducto = 0;
  }

  set setCodigoProducto(value){
    this.#codigoProducto = value;
  }
  get getCodigoProducto(){
    return this.#codigoProducto;
  }
  set setInventarioProducto(value){
    this.#inventarioProducto = value;
  }
  get getInventarioProducto(){
    return this.#inventarioProducto;
  }
  set setNombreProducto(value){
    this.#nombreProducto = value;
  }
  get getNombreProducto(){
    return this.#nombreProducto;
  }
  set setPrecioProducto(value){
    this.#precioProducto = value;
  }
  get getPrecioProducto(){
    return this.#precioProducto;
  }
}

class ProductosTienda {
  #listaProducto;

  constructor(){
    this.#listaProducto = [];
  }

  get getListaProductos(){
    return this.#listaProducto;
  }

  

  agregarProducto(producto) {
    this.#listaProducto.push(producto);
    this.grabarArchivoProductos();
  }

  cargarArchivosProductos() {
    let datosArchivo = [];

    try {
      const data = fs.readFileSync('datos.json', 'utf8');
      datosArchivo = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }

    let contador = 0;

    if (datosArchivo.length > 0) {
      datosArchivo.forEach(objeto => {
        contador++;
        let producto = new Producto;
        producto.setCodigoProducto = objeto.codigoProducto;
        producto.setNombreProducto = objeto.nombreProducto;
        producto.setInventarioProducto = objeto.inventarioProducto;
        producto.setPrecioProducto = objeto.precioProducto;
        this.#listaProducto.push(producto);
      });
    }

    console.log(`Total de productos cargados`.bgRed,` ==>`.bgYellow,` ${contador}`.bgRed);
  }

  grabarArchivoProductos() {
    const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
      return {
        codigoProducto: producto.getCodigoProducto,
        nombreProducto: producto.getNombreProducto,
        inventarioProducto: producto.getInventarioProducto,
        precioProducto: producto.getPrecioProducto
      };
    });

    const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);
    const nombreArchivo = 'datos.json';

    fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
    console.log(`DATOS GUARDADOS EN ${nombreArchivo}`);
  }

  mostrarProductos() {
    this.getListaProductos.forEach(producto => {
      console.log(`│ Código: ${producto.getCodigoProducto} │ Nombre: ${producto.getNombreProducto} │ Inventario: ${producto.getInventarioProducto} │ Precio: ${producto.getPrecioProducto} │`);
    });
  }

  
}

let productosTienda = new ProductosTienda;

function agregarProductoDesdeConsola() {
  rl.question('Ingrese el código del producto: ', (codigo) => {
    rl.question('Ingrese el nombre del producto: ', (nombre) => {
      rl.question('Ingrese el inventario del producto: ', (inventario) => {
        rl.question('Ingrese el precio del producto: ', (precio) => {
          const nuevoProducto = new Producto();
          nuevoProducto.setCodigoProducto = codigo;
          nuevoProducto.setNombreProducto = nombre;
          nuevoProducto.setInventarioProducto = inventario;
          nuevoProducto.setPrecioProducto = precio;

          productosTienda.agregarProducto(nuevoProducto);

          console.clear(); 
          console.log('Producto agregado exitosamente.'.bgGreen);

          mostrarMenu(); 
        });
      });
    });
  });
}

function mostrarProductosDesdeConsola() {
  productosTienda.mostrarProductos();
  mostrarMenu(); 
}

function mostrarMenu() {
  console.log('******************************************************************'.blue);
  console.log(`***********************`.blue,  `INVENTÁRIO`.bgGreen,`  *****************************`.blue);
  console.log('******************************************************************\n'.blue);

  rl.question(`1. Agregar Producto\n2. Mostrar Productos\n3. Limpiar Consola\n4. Salir\nSeleccione una opción:\n` , (opcion) => {
    switch (opcion) {
      case '1':
        agregarProductoDesdeConsola();
        break;
      case '2':
        mostrarProductosDesdeConsola();
        break;
      case '3':
        Limpiar();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Opción no válida. Por favor, seleccione una opción válida.'.bgRed);
        mostrarMenu();
        break;
    }
  });
}

function Limpiar() {
  console.clear();
  console.log(`Total de productos cargados`.bgRed,` ==>`.bgYellow,` ${productosTienda.getListaProductos.length}`.bgRed);
  mostrarMenu();
  
}

function main() {
  console.clear();
  productosTienda.cargarArchivosProductos(); 
  mostrarMenu();
}



main(); 


