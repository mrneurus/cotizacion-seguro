// cotizador constructor
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function (seguro) {
  /* 
         1 = americano = 1.15
        2 = asiatico = 1.05
        3 = europeo = 1.35
    
    */
  const coefAmericano = 1.15;
  const coefAsia = 1.05;
  const coefEuropeo = 1.35;

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * coefAmericano;
      break;
    case "2":
      cantidad = base * coefAsia;
      break;
    case "3":
      cantidad = base * coefEuropeo;
  }

  //leer año

  const diferencia = new Date().getFullYear() - this.anio;

  cantidad -= (diferencia * 3 * cantidad) / 100;

  // miramos el tipo de seguro :

  if (this.tipo === "basico") {
    cantidad = cantidad * 1.3;
  } else {
    cantidad = cantidad * 1.5;
  }
  return cantidad;
};

// lo que se muestra

function Interfaz() {}

// mensaje de error al faltar datos:

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.innerHTML = `${mensaje}`;

  formulario.insertBefore(div, document.querySelector(".form-group"));

  setTimeout(function () {
    document.querySelector(".error").remove();
  }, 3000);

  setTimeout(function () {
    document.querySelector(".correcto").remove();
  }, 1400);
};

Interfaz.prototype.mostrarCotizacion = function (seguro, cotizacion) {
  const resultado = document.getElementById("resultado");
  let marca;
  switch (seguro.marca) {
    case "1":
      marca = "Americano";
      break;
    case "2":
      marca = "Asiatico";
      break;
    case "3":
      marca = "Europeo";
      break;
  }

  console.log(marca);
  const div = document.createElement("div");
  div.innerHTML = `
         <p class="header">Resumen</p>
         <p>  Marca = ${marca}</p>
         <p>  Año = ${seguro.anio}</p>
         <p> Tipo de seguro = ${seguro.tipo}</p>
         <p> <strong> Total Cotizacion = ${cotizacion}</p> </strong>  
    `;

  const spinner = document.querySelector("#cargando img");
  spinner.style.display = "block";

  setTimeout(function () {
    spinner.style.display = "none";
    resultado.appendChild(div);
  }, 1400);
};

// eventlisteners

const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  const tipoSeguro = document.querySelector('input[name="tipo"]:checked').value;

  /* crea instancia de interfaz */

  const interfaz = new Interfaz();

  if (
    marcaSeleccionada === "" ||
    anioSeleccionado === "" ||
    tipoSeguro === ""
  ) {
    interfaz.mostrarMensaje(
      "El formulario esta incompleto.Revisar todos los campos",
      "error"
    );
  } else {
    const resultados = document.querySelector("#resultado div");

    if (resultados !== null) {
      resultados.remove();
    }

    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipoSeguro);

    // cotizacion

    const cantidad = seguro.cotizarSeguro(seguro);

    interfaz.mostrarMensaje("Cotizando", "correcto");
    interfaz.mostrarCotizacion(seguro, cantidad);
  }
});

const max = new Date().getFullYear(),
  min = max - 20;

const selectAnios = document.getElementById("anio");
for (let index = max; index > min; index--) {
  let option = document.createElement("option");
  option.value = index;
  option.innerHTML = index;
  selectAnios.appendChild(option);
}
