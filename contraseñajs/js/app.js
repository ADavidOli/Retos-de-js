// primero definimos nuestro elementos dentro del DOM.
const resultado = document.querySelector("#resultado");
const btn = document.querySelector("#generar");
const min = document.querySelector("#min");
const max = document.querySelector("#max");
const sig = document.querySelector("#sig");
const num = document.querySelector("#num");
const long = document.querySelector("#long");

// segundo definimos nuestras variables.


let mins = "abcdefghijklmnñopqrstuvwxyz";
let mayus = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
let signos = "!#$%&/7(=?¡¿-_.~}";
let numeros = "1234567890";

btn.addEventListener("click", () => {
  let campos = "";
  // juntamos nuestros string en la variable campos, si entra la condicion
  if (min.checked) campos += mins;
  if (max.checked) campos += mayus;
  if (num.checked) campos += numeros;
  if (sig.checked) campos += signos;
  // si campo está vacío quiere decir que no se selecciono ninguno.
  if (campos.length === 0) {
    resultado.textContent = "debes de poner al menos un parametro"
    return;
  }
  let password = "";
  // cachamos la longitud de nuestro scrollbar
  let longitud = long.value;

  // implementamos el cripto.getrandomvalues
  const aux = new Uint8Array(longitud);
  self.crypto.getRandomValues(aux);

  for (let i = 0; i < aux.length; i++) {
    // asignamos el password de acuerdo a la longitud del arreglo
    password += campos[aux[i] % campos.length];
  }

  llenarCampo(password);
});

function llenarCampo(string){
    resultado.textContent = string;
}
