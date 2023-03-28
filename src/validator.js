
const validator = {
  isValid: (numeroTarjeta) => {
    let respuesta = false;
    if (numeroTarjeta.length >= 11) {
      let arrayNumerico = invertirTarjeta(numeroTarjeta);
      arrayNumerico = multiplicarPares(arrayNumerico);
      const total = sumarElementosArray(arrayNumerico);
      if (total % 10 === 0) {
        respuesta = true;
      }
    }
    console.log(respuesta)
    return respuesta;
  },
  maskify: (numeroTarjeta) => {
    if (numeroTarjeta.length >= 5) {
      const cuatroDigitos = numeroTarjeta.slice(-4);
      const arrayNumeroTarjeta = Array.from(numeroTarjeta);
      const numeroParaEnmascarado = arrayNumeroTarjeta.length - 4;
      let acumuladorNumeroEnmascarado = "";

      for (let i = 0; i < numeroParaEnmascarado; i++) {
        acumuladorNumeroEnmascarado = acumuladorNumeroEnmascarado + "#";
      }
      return acumuladorNumeroEnmascarado + cuatroDigitos;
    } else {
      return numeroTarjeta;
    }
  },
};

validator.maskify('1234567891234')
// la funcion convierte el dato string a un arreglo de datos string("Array.from")
// luego con ".reverse" invierto los datos de mi arreglo , con ".map"
// (transforma cada item de mi array a un nuevo array item por item para darle el que deseo)
// con "Numero()"
function invertirTarjeta(numeroTarjeta) {
  const arrayTarjeta = Array.from(numeroTarjeta).reverse();
  const arrayNumerico = arrayTarjeta.map((numeroString) =>
    Number(numeroString)
  );
  console.log(arrayNumerico);
  return arrayNumerico
}

// ubica los pares
function esPar(numero) {
  return numero % 2 === 0;
}


// la funcion multipica las ubicaciones pares del array******
function multiplicarPares(arrayNumerico) {
  for (let indice = 0; indice < arrayNumerico.length; indice++) {
    const indiceReal = indice + 1;
    if (esPar(indiceReal)) {
      arrayNumerico[indice] = arrayNumerico[indice] * 2;
      if (esNumeroDosDigitos(arrayNumerico[indice])) {
        arrayNumerico[indice] = sumarDigitos(arrayNumerico[indice]);
      }
    }
  }
  console.log(arrayNumerico)
  return arrayNumerico;
}

// reconocemosn si el resultado es mayor a 2 digitos (mayor o = a 10)
function esNumeroDosDigitos(numero) {
  return numero >= 10;
}

// sumar resultados de los resultado de dos digitos
function sumarDigitos(numero) {
  const numeroString = numero.toString();
  const arrayNumero = Array.from(numeroString);

  let acumulador = 0;
  arrayNumero.forEach((element) => {
    acumulador += Number(element);
  });
  console.log(acumulador)
  return acumulador;
}
// sumas los indices de mis arreglos
function sumarElementosArray(arrayNumerico) {
  let total = 0;
  arrayNumerico.forEach((element) => {
    total += element;
  });
  console.log(total)
  return total;
}

export default validator;




