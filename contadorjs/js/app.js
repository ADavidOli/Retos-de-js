let contador = 0;
const aumento = document.querySelector("#aumento");
const minuendo = document.querySelector("#minuendo");
// creamos un nodo de texto para poder guardar y mostrar nuestro contador
const nodoTexto = document.createTextNode(contador);
const guardar = document.querySelector("#guardar");
const reset = document.querySelector("#reset");
const resultado = document.querySelector(".numeros");

guardar.addEventListener("click", () => {
  // local storage solo guardar strings, arrays con json
  localStorage.setItem("contador", contador);
  let historial = localStorage.getItem("contador");
  llenarHistorial(historial);
});

reset.addEventListener("click", () => {
  resetearHistorial();
});

aumento.addEventListener("click", () => {
  contador++;
  nodoTexto.nodeValue = contador;
  mostrarNumero(nodoTexto);
});

minuendo.addEventListener("click", () => {
  contador--;
  nodoTexto.nodeValue = contador;
  mostrarNumero(nodoTexto);
});

function mostrarNumero(numero) {
  // para contadores no se usa apend child, se usa textcontent
  resultado.textContent = numero.nodeValue;
}

function llenarHistorial(cadena) {
    // solo en casos donde no quremeos que nos guarde la variable de 0
  if(resultado.textContent === "0") return;
  const almacen = document.querySelector("#historial");
  const lista = document.createElement("P");
  lista.classList.add("lista");
  lista.textContent = cadena;

  almacen.appendChild(lista);
}

function resetearHistorial() {
  contador = 0;
  const lista = document.querySelector("#historial");
  lista.innerHTML = "";
  nodoTexto.nodeValue = contador;
  mostrarNumero(nodoTexto);
  localStorage.clear();
}
