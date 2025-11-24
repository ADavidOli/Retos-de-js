const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperandos = document.querySelectorAll(".operando");
const input = document.querySelector("#input");
const inputOperador = document.querySelector("#Operador");
const reset = document.querySelector("#AC");

let numeroActual = "";
let primerNumero = null;
let operador = null;
let segundoNumero = null;

reset.addEventListener("click", () => {
  input.value = "";
  inputOperador.value = "";
  numeroActual = "";
  primerNumero = null;
  operador = null;
  segundoNumero = null;
  resetHistorial();
});

botonesNumeros.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // asi puedo ir almacenando valores de mis botones desde mi  target
    numeroActual += e.target.value;
    input.value = numeroActual;
  });
});

botonesOperandos.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Si acabamos de obtener un resultado, numeroActual estará vacío
    // pero primerNumero sí tendrá valor. Eso es válido.
    if (numeroActual === "" && primerNumero === null) return;

    // si numero actual es diferente a vacio 
    // entonces escribimos como primer numero el numero actual
    if (numeroActual !== "") {
      primerNumero = Number(numeroActual);
    }

    // Guardamos operador
    operador = e.target.value;
    // y lo mandamos a nuestro input
    inputOperador.value = operador;

    // Preparamos número actual para que el usuario escriba el segundo número
    numeroActual = "";
  });
});

document.querySelector("#igual").addEventListener("click", () => {
  if (primerNumero === null || operador === null) return;

  if (numeroActual === "") {
    // si el numero actual está vacio, verificamos que el segundo numero este null
    // si está null, sale, no hace nada
    if (segundoNumero === null) return;
  } else {
    // si no está vacío casteamos el numero actual y lo metemos en el segundo numero
    segundoNumero = Number(numeroActual);
  }
  // hacemos una variable resultado con nuestro metodo
  // el metodo recibe operador, el primer numero y el segundo numero
  let resultado = operar(primerNumero, segundoNumero, operador);
  // mandamos el resultado a nuestro input

  input.value = resultado;

  // mandamos nuestro resultado a nuestro historial
  let historial = [primerNumero, segundoNumero, operador]
  recabarHistorial(historial, resultado);

  // para poder multiplicar cada vez que precionamos igual
  // el primer numero le guardamos la variable de resultado
  // el segundo numero ya está guardado así que seguira multiplicando por el primer numero
  primerNumero = resultado;
  numeroActual = "";
  // automaticamente se manda el primer numero
  // no puede ir aqui la funcion porque es mutabilidad en variable
  
});




function operar(a, b, operador) {
  switch (operador) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      return a / b;
    case "x":
      return a * b;
    default:
      return 0;
  }
}
// crear elementos con apendchild
function recabarHistorial(array, resultado) {

  // console.log(array);

  const [primero, segundo, operador] = array;
  // console.log(resultado);

  // buscamos el almacen donde vamos a crear el elemento html
  const almacen = document.querySelector("#historial");
  const p = document.createElement("P");
  p.classList.add("operacion");
  p.textContent = `${primero} ${operador} ${segundo} = ${resultado}`;
  almacen.appendChild(p);
}
// tambien se puede hacer con innerhtml
function resetHistorial() {
  const almacen = document.querySelector("#historial");
  almacen.innerHTML = "";
}
