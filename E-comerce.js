class Hamburguesa{
    constructor(nombre, precio, id, imagen, combo){
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.imagen = imagen
        this.combo = combo
    }
}

const Hamburguesa1 = new Hamburguesa(("Rafiki"),(1200),(1),("cheeseburger.jpg"),("Incluye Papas"))
const Hamburguesa2 = new Hamburguesa(("King Kong"),(1450),(2),("burger 2.jpg"),("Incluye Papas"))
const Hamburguesa3 = new Hamburguesa(("Donkey Kong"),(1500),(3),("burger3.jpg"),("Incluye Papas"))
const Hamburguesa4 = new Hamburguesa(("Papas Salvajes"),(450),(4),("gorilaPapas.jpg"),("Incluye Papas"))
const Hamburguesa5 = new Hamburguesa(("Blue Gorila"),(1300),(5),("burger 2.jpg"),("Incluye Papas"))

let Hamburguesas = [Hamburguesa1,Hamburguesa2,Hamburguesa3,Hamburguesa4,Hamburguesa5]



let productosEnCarrito = []
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    //Entra por primera -- setear el array el original
    console.log("Seteando el array carrito por primera vez")
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}


if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    console.log("Seteando el array carrito por primera vez")
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

localStorage.setItem("Hamburguesas",Hamburguesas)
localStorage.setItem("Hamburguesas", JSON.stringify(Hamburguesas));
JSON.parse(localStorage.getItem("Hamburguesas"));

//capturas DOM
let divProductos = document.getElementById("productos")
let btnGuardarHamburguesa = document.getElementById("guardarHaburguesaBtn")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

//Eventos
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
}) 
botonFinalizarCompra.addEventListener("click",()=>{
    Swal.fire('Su Pedido se realizo!!')
    compraTotal
})


//FUNCIONES DEL PROYECTO
//function AGREGAR AL CARRITO

class Ofertas{
    constructor(titulo, precios){
        this.titulo = titulo,
        this.precios = precios
    }
}



const oferta1 = new Ofertas("Oferta Por La Rafiki", "1200")
const oferta2 = new Ofertas("Oferta Por La Donkey Kong", "1240")
let Ofertones = [oferta1, oferta2]


function llamarOfertas(resultado){
    return new Promise((res, rej)=>{
        if(resultado){
            res(Ofertones)
        }else{
            rej("No se pudo encontrar ofertas")
        }
    })
}

llamarOfertas()











function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let HamburguesaL of array){
        let hamburguesaNueva = document.createElement("div")
        hamburguesaNueva.innerHTML = `<div id="${HamburguesaL.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 200px;"src="./Images/${HamburguesaL.imagen}"  alt="${HamburguesaL.nombre} de Gorila Burgers">
                                    <div class="card-body">
                                        <h4 class="card-title">${HamburguesaL.nombre}</h4>
                                        <p>Combo: ${HamburguesaL.combo}</p>
                                        <p class="">Precio: ${HamburguesaL.precio}</p>
                                    <button id="${HamburguesaL.id}" class="btn btn-outline-success btnAgregarAlCarrito">Agregar al carrito</button>
                                    </div>
    </div>`
    divProductos.appendChild(hamburguesaNueva)
    let btnAgregar = document.getElementById(`${HamburguesaL.id}`)
    btnAgregar.addEventListener("click", ()=>{
        agregarAlCarrito(HamburguesaL)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu Hamburguesa Se Agrego Al Carrito',
            showConfirmButton: false,
            timer: 1400
          })
    })
}
}

function agregarAlCarrito(HamburguesaL){
    console.log(HamburguesaL)
    productosEnCarrito.push(HamburguesaL)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito",productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    JSON.parse(localStorage.getItem("carrito"));
    console.log("Hamburguesa Agregada con Exito")
}

function cargarProductosCarrito(array){
    modalBody.innerHTML = ""
    //El elemento (en este caso objetos) es el parámetro de arrow function
    array.forEach((productoCarrito)=>{
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="./Images/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.nombre}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i>Eliminar</button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito,indice)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           //chequeo que funciona
           console.log(`Boton eliminar ${productoCarrito.nombre}`)
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           //Eliminar del array de comprar
           productosEnCarrito.splice(indice,1) 
           console.log(productosEnCarrito)
           //Eliminar del storage
           localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
        })
    })
}


mostrarCatalogo(Hamburguesas)