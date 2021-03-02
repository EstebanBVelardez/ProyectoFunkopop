function agregarFunkopop(event) {
    event.preventDefault();
    console.log("dentro de agregar funko");
}

function validarCodigo(codigo) {
    console.log("desde el blur");
    if (codigo.value.trim() === "") {
        codigo.className = "form-control is-invalid";
        return false;
    } else {
        codigo.className = "form-control is-valid";
        return true;
    }
}

function validarNombre(nombre) {
    console.log("desde el blur");
    if (nombre.value.trim() === "") {
        nombre.className = "form-control is-invalid";
        return false;
    } else {
        nombre.className = "form-control is-valid";
        return true;
    }
}

function validarNum(inputNum) {
    console.log("desde el blur");
    if (inputNum.value.trim() != "" && !isNaN(inputNum.value)) {
        inputNum.className = "form-control is-valid";
        return true;
    } else {
        inputNum.className = "form-control is-invalid";
        return false;
    }
}

function validarCategoria(categoria) {
    console.log("desde el blur");
    if (categoria.value.trim() === "") {
        categoria.className = "form-control is-invalid";
        return false;
    } else {
        categoria.className = "form-control is-valid";
        return true;
    }
}

function validarConsulta(consulta) {
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
        validarCodigo(document.getElementById("codigo")).value == true &&
        validarNombre(document.getElementById("nombre")).value &&
        validarNum(document.getElementById("numSerie")).value &&
        validarCategoria(document.getElementById("categoria")).value &&
        validarConsulta(document.getElementById("descripcion")).value
    ) {
        return true;
    } else {
        return false;
    }
}*/