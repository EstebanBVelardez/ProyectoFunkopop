import { Funko } from './funkoClass.js';

//import { validarGeneral } from './validaciones.js';



let listaFunkopop = [];
const modalProducto = new bootstrap.Modal(document.getElementById('modalFunkopop'))

//Variable bande que me ayuda a decidir cuando tengo que modificar y cuando estoy tratando de agregar un funko
//modificarFunkopop = true estoy modificando, cuando sea false estoy agregando un nuevo funko
let modificarFunkopop = false;

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
    if (validarCodigo(document.getElementById("codigo")) == true &&
        validarNombre(document.getElementById("nombre")) &&
        validarNum(document.getElementById("numSerie")) &&
        validarCategoria(document.getElementById("categoria")) &&
        validarConsulta(document.getElementById("descripcion"))) {
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
    } else {
        alert('los datos son incorrectos')
    }
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
            <button class="btn btn-warning" onclick="prepararFunkopop(this)" id="${_listaFunkopop[i].codigo}">Editar</button>
            <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id="${_listaFunkopop[i].codigo}">Borrar</button>
        </td>`
            //agregar la fila al padre
        tabla.innerHTML += filas
            //        tabla.innerHTML = tabla.innerHTML + filas

    }
}

window.eliminarFunkopop = function(boton) {
    console.log(boton.id)
    Swal.fire({
        title: '¿Estas seguro de eliminar el Funkopop?',
        text: "No puedes volver atras luego de eliminar el producot",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            //Agregar la logica para eliminar el Funkpop
            // let funkopopFiltrado = listaFunkopop.filter(function(producto) {
            //     return producto.codigo != boton.id
            // });
            let funkopopFiltrado = listaFunkopop.filter((producto) => {

                return producto.codigo != boton.id
            })
            console.log(funkopopFiltrado)
            listaFunkopop = funkopopFiltrado;
            //Guardar los datos en localstorage
            localStorage.setItem('listaFunkokey', JSON.stringify(funkopopFiltrado))
                //Cargar los nuevos datos en la tabla
            leerDatos();

            Swal.fire(
                'Eliminado!',
                'El funkopop seleccionado fue eliminado',
                'success'
            )
        }
    })
}

window.prepararFunkopop = function(boton) {
    console.log(boton)
        //buscar el funkopop seleccionado
    let funkopopEncontrado = listaFunkopop.find((producto) => { return producto.codigo === boton.id });

    console.log(funkopopEncontrado)
        //Completar con los datos todos los input del formulario
    document.getElementById('codigo').value = funkopopEncontrado.codigo;
    document.getElementById('nombre').value = funkopopEncontrado.nombre;
    document.getElementById('numSerie').value = funkopopEncontrado.numSerie;
    document.getElementById('categoria').value = funkopopEncontrado.categoria;
    document.getElementById('descripcion').value = funkopopEncontrado.descripcion;
    document.getElementById('imagen').value = funkopopEncontrado.imagen;

    //mostrar ventana modal
    modalProducto.show()
}


//validaciones

window.validarCodigo = function(codigo) {
    console.log("desde el blur");
    if (codigo.value.trim() === "") {
        codigo.className = "form-control is-invalid";
        return false;
    } else {
        codigo.className = "form-control is-valid";
        return true;
    }
}

window.validarNombre = function(nombre) {
    console.log("desde el blur");
    if (nombre.value.trim() === "") {
        nombre.className = "form-control is-invalid";
        return false;
    } else {
        nombre.className = "form-control is-valid";
        return true;
    }
}

window.validarNum = function(inputNum) {
    console.log("desde el blur");
    if (inputNum.value.trim() != "" && !isNaN(inputNum.value)) {
        inputNum.className = "form-control is-valid";
        return true;
    } else {
        inputNum.className = "form-control is-invalid";
        return false;
    }
}

window.validarCategoria = function(categoria) {
    console.log("desde el blur");
    if (categoria.value.trim() === "") {
        categoria.className = "form-control is-invalid";
        return false;
    } else {
        categoria.className = "form-control is-valid";
        return true;
    }
}

window.validarConsulta = function(consulta) {
    if (consulta.value.trim() != "" && consulta.value.length >= 10) {
        consulta.className = "form-control is-valid";
        return true;
    } else {
        consulta.className = "form-control is-invalid";
        return false;
    }
}

/*function validarGeneral() {
    if (
        validarCodigo(document.getElementById("codigo")) == true &&
        validarNombre(document.getElementById("nombre")) &&
        validarNum(document.getElementById("numSerie")) &&
        validarCategoria(document.getElementById("categoria")) &&
        validarConsulta(document.getElementById("descripcion"))
    ) {
        return true;
    } else {
        return false;
    }
}*/