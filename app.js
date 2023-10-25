// Importando módulos necesarios
const readline = require('readline');
const fs = require('fs');
require('colors'); // Agrega colores a la salida en consola

// Creando una interfaz para leer y escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definiendo una clase para representar un Producto
class Producto {
  // Propiedades privadas del Producto
  #codigoProducto;
  #nombreProducto;
  #inventarioProducto;
  #precioProducto;

  // Constructor del Producto
  constructor(){
    this.#codigoProducto = '';
    this.#inventarioProducto = '';
    this.#nombreProducto = 0;
    this.#precioProducto = 0;
  }

  // Métodos para establecer y obtener el código del producto
  set setCodigoProducto(value){
    this.#codigoProducto = value;
  }
  get getCodigoProducto(){
    return this.#codigoProducto;
  }

  // Métodos para establecer y obtener el inventario del producto
  set setInventarioProducto(value){
    this.#inventarioProducto = value;
  }
  get getInventarioProducto(){
    return this.#inventarioProducto;
  }

  // Métodos para establecer y obtener el nombre del producto
  set setNombreProducto(value){
    this.#nombreProducto = value;
  }
  get getNombreProducto(){
    return this.#nombreProducto;
  }

  // Métodos para establecer y obtener el precio del producto
  set setPrecioProducto(value){
    this.#precioProducto = value;
  }
  get getPrecioProducto(){
    return this.#precioProducto;
  }
}

// Definiendo una clase para representar una Tienda de Productos
class ProductosTienda {
  // Propiedad privada: lista de productos
  #listaProducto;

  constructor(){
    this.#listaProducto = [];
  }

  // Método para obtener la lista de productos
  get getListaProductos(){
    return this.#listaProducto;
  }

  // Método para agregar un producto a la lista y guardar en archivo
  agregarProducto(producto) {
    this.#listaProducto.push(producto);
    this.grabarArchivoProductos(); // Guardar en archivo
  }

  // Método para cargar productos desde un archivo
  cargarArchivosProductos() {
    let datosArchivo = [];

    try {
      const data = fs.readFileSync('datos.json', 'utf8'); // Leer archivo
      datosArchivo = JSON.parse(data); // Convertir a objeto JavaScript
    } catch (error) {
      console.error(error); // Manejar error en caso de fallo
    }

    let contador = 0; // Inicializa un contador en 0 para llevar un registro del número de productos procesados.

    if (datosArchivo.length > 0) { // Verifica si hay datos en el archivo (es decir, si el arreglo 'datosArchivo' tiene elementos).
      datosArchivo.forEach(objeto => { // Itera sobre cada objeto en el arreglo 'datosArchivo'.
        contador++; // Incrementa el contador en 1.
    
        let producto = new Producto; // Crea una nueva instancia de la clase 'Producto' y la asigna a la variable 'producto'.
    
        // Establece las propiedades del producto con los valores del objeto actual en el bucle.
        producto.setCodigoProducto = objeto.codigoProducto;
        producto.setNombreProducto = objeto.nombreProducto;
        producto.setInventarioProducto = objeto.inventarioProducto;
        producto.setPrecioProducto = objeto.precioProducto;
    
        this.#listaProducto.push(producto); // Agrega el producto a la lista de productos de la tienda.
      });
    }

    console.log(`Total de productos cargados`.bgRed,` ==>`.bgYellow,` ${contador}`.bgRed);
  }

  // Método para guardar productos en un archivo
  grabarArchivoProductos() {
    // Mapea la lista de productos y crea un nuevo array de objetos con las propiedades deseadas
    const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
      return {
        codigoProducto: producto.getCodigoProducto, // Obtiene el código del producto
        nombreProducto: producto.getNombreProducto, // Obtiene el nombre del producto
        inventarioProducto: producto.getInventarioProducto, // Obtiene el inventario del producto
        precioProducto: producto.getPrecioProducto // Obtiene el precio del producto
      };
    });
  
    const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2); // Convierte el array de objetos a una cadena JSON con formato legible
    const nombreArchivo = 'datos.json'; // Nombre del archivo a escribir
  
    fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8'); // Escribe el JSON en el archivo 'datos.json' en formato UTF-8
    console.log(`DATOS GUARDADOS EN ${nombreArchivo}`); // Imprime un mensaje indicando que los datos se han guardado en el archivo
  }
  

  // Método para mostrar todos los productos en consola
  mostrarProductos() {
    // Itera sobre la lista de productos y muestra la información de cada producto en la consola.
    this.getListaProductos.forEach(producto => {
      console.log(`│ Código: ${producto.getCodigoProducto} │ Nombre: ${producto.getNombreProducto} │ Inventario: ${producto.getInventarioProducto} │ Precio: ${producto.getPrecioProducto} │`);
    });
  }
}

// Crear una instancia de la clase ProductosTienda
let productosTienda = new ProductosTienda;

// Función para agregar un producto desde la consola
function agregarProductoDesdeConsola() {
  rl.question('Ingrese el código del producto: ', (codigo) => {
    rl.question('Ingrese el nombre del producto: ', (nombre) => {
      rl.question('Ingrese el inventario del producto: ', (inventario) => {
        rl.question('Ingrese el precio del producto: ', (precio) => {
          const nuevoProducto = new Producto(); // Crear un nuevo producto
          nuevoProducto.setCodigoProducto = codigo; // Establecer propiedades
          nuevoProducto.setNombreProducto = nombre;
          nuevoProducto.setInventarioProducto = inventario;
          nuevoProducto.setPrecioProducto = precio;

          productosTienda.agregarProducto(nuevoProducto); // Agregar producto a la tienda

          console.clear(); // Limpiar consola
          console.log('Producto agregado exitosamente.'.bgGreen);

          mostrarMenu(); // Mostrar el menú nuevamente
        });
      });
    });
  });
}

// Función para mostrar todos los productos en consola
function mostrarProductosDesdeConsola() {
  productosTienda.mostrarProductos();
  mostrarMenu(); // Mostrar el menú nuevamente
}

// Función para mostrar el menú de opciones en consola
function mostrarMenu() {
  console.log('******************************************************************'.blue);
  console.log(`***********************`.blue,  `INVENTÁRIO`.bgGreen,`  *****************************`.blue);
  console.log('******************************************************************\n'.blue);

  rl.question(`1. Agregar Producto\n2. Mostrar Productos\n3. Limpiar Consola\n4. Salir\nSeleccione una opción:\n` , (opcion) => {
    switch (opcion) {
      case '1':
        agregarProductoDesdeConsola(); // Llamar función para agregar producto
        break;
      case '2':
        mostrarProductosDesdeConsola(); // Llamar función para mostrar productos
        break;
      case '3':
        Limpiar(); // Llamar función para limpiar la consola
        break;
      case '4':
        rl.close(); // Cerrar la interfaz de consola
        break;
      default:
        console.log('Opción no válida. Por favor, seleccione una opción válida.'.bgRed);
        mostrarMenu(); // Mostrar el menú nuevamente
        break;
    }
  });
}

// Función para limpiar la consola
function Limpiar() {
  console.clear();
  console.log(`Total de productos cargados`.bgRed,` ==>`.bgYellow,` ${productosTienda.getListaProductos.length}`.bgRed);
  mostrarMenu();
  
}

// Función principal
function main() {
  console.clear();
  productosTienda.cargarArchivosProductos();
  mostrarMenu();
}



// Llamar a la función principal para iniciar el programa
main();


