import { Funko } from './funkoClass.js';

//import { validarGeneral } from './validaciones.js';


let listaFunkopop = [];
const modalProducto = new bootstrap.Modal(document.getElementById('modalFunkopop'))

let btnAgregar = document.getElementById('btnAgregar')
btnAgregar.addEventListener('click', function() {
    modalProducto.show()
})

//llamar a la funcion leerdatos del localstorage
leerDatos();

let nuevoFunkopop = new Funko(1, 'dasd', 'asdasdas222', 'dc', 'sadasd', 'asdasd')
console.log(nuevoFunkopop)


window.agregarFunkopop = function(event) {
    event.preventDefault()
    console.log('dentro de agregar funko')
        //validar general
        //if(validargeneral){
        //aqui agrego un nuevo producto - continua
        //}else{
        //}
        //parte 1
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let numSerie = document.getElementById("numSerie").value;
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;

    //creo el nuevo producto funkpop
    let nuevoFunkopop = new Funko(codigo, nombre, numSerie, categoria, descripcion, imagen)
        //agrego el nuevo funkopop a la lista
    listaFunkopop.push(nuevoFunkopop)
        //guardar lista de funkos en localStorage
    localStorage.setItem('listaFunkokey', JSON.stringify(listaFunkopop))
        //limpiar el formulario
    limpiarFormulario()
        //mostrar mensaje al usuario que el producto fue creado 
    Swal.fire(
            'Nuevo Funkopop',
            'El Funkopop se agrego correctamente',
            'success'
        )
        //llamar a la funcion leerDatos
    leerDatos();
    //cerrar la ventana modal
    modalProducto.hide();
}

function limpiarFormulario() {
    document.getElementById('formFunkopop').reset()
}

function leerDatos() {
    //Esta funcion se encargara de leer los datos del localstorage
    if (localStorage.length > 0) {
        //traer los datos del local storage
        let _listaFunkopop = JSON.parse(localStorage.getItem('listaFunkokey'))
        console.log(_listaFunkopop)

        //Preguntar si mi arreglo listaFunkopop tiene datoss
        if (listaFunkopop.length === 0) {
            listaFunkopop = _listaFunkopop;
        }

        dibujarDatosEnTabla(_listaFunkopop)
    }
}

function dibujarDatosEnTabla(_listaFunkopop) {
    //esta funcion se encargara de agregar los datos del LS en cada fila de la tabla
    let tabla = document.getElementById('tablaFunkopop');
    //borramos la filas que tenga extra
    tabla.innerHTML = ''
    let filas;

    //for (let i = 0; i < _listaFunkopop.length; i++){}
    //recorro todo el arreglo con for in
    for (let i in _listaFunkopop) {
        filas = `<td>${_listaFunkopop[i].codigo}</td>
        <td>${_listaFunkopop[i].nombre}</td>
        <td>${_listaFunkopop[i].numSerie}</td>
        <td>${_listaFunkopop[i].categoria}</td>
        <td>${_listaFunkopop[i].descripcion}</td>
        <td>${_listaFunkopop[i].imagen}</td>
        <td>
            <button class="btn btn-warning">Editar</button>
            <button class="btn btn-danger" onclick="eliminarFunkopop(this)">Borrar</button>
        </td>`
            //agregar la fila al padre
        tabla.innerHTML += filas
            //        tabla.innerHTML = tabla.innerHTML + filas

    }
}

window.eliminarFunkopop = function(boton) {
    console.log("dentro de la funcion funkopop")
}