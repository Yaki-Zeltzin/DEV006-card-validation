import validator from './validator.js';

const tarjeta = document.querySelector('#tarjeta'),
  inputNum = document.getElementById('inputNumero'),
  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
  formulario = document.querySelector('#formulario-tarjeta'),
  numeroTarjeta = document.querySelector('#tarjeta .numero'),
  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
  logoMarca = document.querySelector('#logo-marca'),
  firma = document.querySelector('#tarjeta .firma p'),
  mesExpiracion = document.querySelector('#tarjeta .mes'),
  yearExpiracion = document.querySelector('#tarjeta .year'),
  ccv = document.querySelector('#tarjeta .ccv'),
  cerrar_modal = document.querySelector("#btn-cerrar-modal"),
  modal = document.querySelector("#modal"),
  modal_title = document.querySelector(".modal-title"),
  modal_text = document.querySelector(".modal-text");




// * Voltear la tarjeta para mostrar el frente
const mostrarFrente = () => {
  if (tarjeta.classList.contains('active')) {
    tarjeta.classList.remove('active');
  }
}

//Rotación de la tarjeta

tarjeta.addEventListener('click', () => {
  tarjeta.classList.toggle('active');
});

//Botón de abrir formulario
function AbrirFormulario() {
  btnAbrirFormulario.classList.toggle('active')
  formulario.classList.toggle('active')
}

//Select de mes generado dinamicamente
for (let i = 1; i <= 12; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.innerText = i;
  formulario.selectMes.appendChild(option);
}

//Select de año generado dinamicamente
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 5; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.innerText = i;
  formulario.selectYear.appendChild(option);
}

// * Input número de tarjeta
function numerTarjeta(e) {
  const valorInput = e.target.value;

  formulario.inputNumero.value = valorInput
    //Elimina espacios en blanco
    .replace(/\s/g, '')
    //Elimina las letrasç
    .replace(/\D/g, '')
    //Elimina espacio cada 4 números
    //Elimina el último espaciado
    .trim();

  numeroTarjeta.textContent = valorInput;

  if (valorInput === '') {
    numeroTarjeta.textContent = '#### #### #### ####';
    logoMarca.innerHTML = '';
  }

  if (valorInput[0] === 4) {
    logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
    imagen.src = './img/logos/visa.png';
    logoMarca.appendChild(imagen);
  } else if (valorInput[0] === 5) {
    logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
    imagen.src = './img/logos/mastercard.png';
    logoMarca.appendChild(imagen);
  }

  mostrarFrente();
  oculto(valorInput)
  validator.isValid(valorInput)
  return valorInput

  //Mostrar tarjeta de frente
}


// *Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
  const valorInput = e.target.value;

  formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '-');
  nombreTarjeta.textContent = valorInput;
  firma.textContent = valorInput;

  if (valorInput === '') {
    nombreTarjeta.textContent = 'Yaki Romero'
  }

  mostrarFrente();
})

// * Select Mes
formulario.selectMes.addEventListener('change', (e) => {
  mesExpiracion.textContent = e.target.value;
  mostrarFrente();
})

// * Select Year
formulario.selectYear.addEventListener('change', (e) => {
  yearExpiracion.textContent = e.target.value.slice(2);
  mostrarFrente();
})

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
  if (!tarjeta.classList.contains('active')) {
    tarjeta.classList.toggle('active');
  }

  formulario.inputCCV.value = formulario.inputCCV.value
    //Elimina espacios en blanco
    .replace(/\s/g, '')
    //Elimina las letrasç
    .replace(/\D/g, '')

  ccv.textContent = formulario.inputCCV.value
})

//modal
function mostrarModal(e) {
  e.preventDefault()
  const valorTarjeta = inputNum.value
  //console.log(valorTarjeta)
  if (validator.isValid(valorTarjeta) === true) {
    modal.showModal();

  } else {
    modal_title.textContent = 'Lo siento 😌'
    modal_text.textContent = 'Tu número de tarjeta es inválido'
    modal.showModal()
  }
}


cerrar_modal.addEventListener('click', () => {
  modal.close()
  formulario.reset()
})



//maskify
function oculto(valorTarjeta) {

  const numeroOculto = validator.maskify(valorTarjeta);
  numeroTarjeta.textContent = numeroOculto;
  inputNum.value = numeroOculto
  //console.log(numeroOculto)

}


btnAbrirFormulario.addEventListener('toggle', AbrirFormulario())
formulario.addEventListener('submit', mostrarModal)
formulario.inputNumero.addEventListener('keyup', numerTarjeta)

//5191732343975393

