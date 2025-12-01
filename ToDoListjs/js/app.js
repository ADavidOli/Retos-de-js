const btn = document.querySelector("#agregar");
const input = document.querySelector("#entrada");
const btnClear = document.querySelector(".btn-clear");

document.addEventListener("DOMContentLoaded", () => {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  const tareasCompletadas =
    JSON.parse(localStorage.getItem("completadas")) || [];
  mostraTareas(tareasGuardadas);
  mostraTareasCompletas(tareasCompletadas);
});

btn.addEventListener("click", () => {
  const valor = input.value;

  if (valor === "") {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "<span style='font-size:14px;'>Debes agregar una tarea</span>",
      showConfirmButton: false,
      width: "220px",
      timer: 1500,
    });

    return;
  }

  if (input.dataset.editIndex !== undefined) {
    guardarEdicion(valor);
    return;
  }

  guardar(valor);
});

btnClear.addEventListener("click", () => {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  const tareasCompletadas =
    JSON.parse(localStorage.getItem("completadas")) || [];

  if (tareasGuardadas.length === 0 && tareasCompletadas.length === 0) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title:
        "<span style='font-size:14px;'>No hay ninguna tarea para eliminar</span>",
      showConfirmButton: false,
      width: "220px",
      timer: 1500,
    });
    return;
  }

  Swal.fire({
    title: "¿Estás seguro?",
    text: "perderas todas tus tareas",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "sí, Limpialo todo",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("tareas");
      localStorage.removeItem("completadas");

      const tareas = [];

      mostraTareas(tareas);
      mostraTareasCompletas(tareas);

      Swal.fire({
        title: "¡Limpiando!",
        text: "Tareas borradas",
        icon: "success",
      });
    }
  });
});

function guardar(valor) {
  // creamos un arreglo de tareas con las tareas guardadas o vacío si este no tiene ninguna tarea guardad
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  // le agregamos el valor a la ultima posicion del arreglo de tareas
  tareas.push(valor);
  // guardamos el arreglo actualizado
  localStorage.setItem("tareas", JSON.stringify(tareas));

  //incorporacion con swetalert
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "<span style='font-size:14px;'>Tu tarea ha sido guardada</span>",
    showConfirmButton: false,
    width: "220px",
    timer: 1500,
  });

  // mandamos a la funcion de mostrar tareas
  mostraTareas(tareas);
  // reseteamos el valor del input
  input.value = "";
}

function guardarEdicion(valor) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  //   aqui recibe el valor del indice del input guardado (checar en target sus metodos de input)
  const indice = input.dataset.editIndex;

  tareas[indice] = valor;

  localStorage.setItem("tareas", JSON.stringify(tareas));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "<span style='font-size:14px;'>Tu tarea ha sido editada</span>",
    showConfirmButton: false,
    width: "220px",
    timer: 1500,
  });
  mostraTareas(tareas);

  //   se debe de limpiar el input y eliminar el indice guardado con dataset
  input.value = "";
  delete input.dataset.editIndex;
}

function mostraTareas(lista) {
  const almacen = document.querySelector(".elementos");
  // se debe de limpiar la tabla para que no me agregue datos sobre datos
  almacen.innerHTML = "";

  if (lista.length === 0) {
    const tdNumero = document.createElement("td");
    tdNumero.textContent = "";

    const tr = document.createElement("tr");
    const tdAviso = document.createElement("td");
    tdAviso.textContent = "no hay ninguna tarea creada";

    tr.appendChild(tdNumero);
    tr.appendChild(tdAviso);

    almacen.appendChild(tr);

    return;
  }

  lista.forEach((tarea, indice) => {
    // almacenas el numero de tarea que tiene con js
    const tr = document.createElement("tr");
    const tdNumero = document.createElement("td");
    tdNumero.textContent = indice + 1;

    // almacenamos la tarea en la tabla con js
    const tdTarea = document.createElement("td");
    tdTarea.textContent = tarea;

    // agregamos los botones.
    const tdAcciones = document.createElement("td");
    tdAcciones.classList.add("tdAcciones");

    // creamos los botones para luego agregarlos.
    const btnEditar = document.createElement("BUTTON");
    btnEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';
    btnEditar.classList.add("btn-editar");
    // definimos funciones de uso de editar.
    btnEditar.onclick = () => editarTarea(indice);

    const btnEliminar = document.createElement("BUTTON");
    btnEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btnEliminar.classList.add("btn-eliminar");
    // definimos funcion de eliminar
    btnEliminar.onclick = () => eliminarTarea(indice);

    const btnCompletar = document.createElement("BUTTON");
    btnCompletar.innerHTML = '<i class="fa-solid fa-check"></i>';
    btnCompletar.classList.add("btn-Completar");
    // definimos funcion de completar
    btnCompletar.onclick = () => completarTarea(indice);

    // agregamos de forma gerarquica los elementos a nuestra tabla

    tdAcciones.appendChild(btnEditar);
    tdAcciones.appendChild(btnEliminar);
    tdAcciones.appendChild(btnCompletar);

    tr.appendChild(tdNumero);
    tr.appendChild(tdTarea);
    tr.appendChild(tdAcciones);

    // Agregar la fila a la tabla
    almacen.appendChild(tr);
  });
}

function eliminarTarea(indice) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  Swal.fire({
    title: "¿Estás seguro?",
    text: "eliminar la tarea seleccionada",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "sí, borrala",
  }).then((result) => {
    if (result.isConfirmed) {
      tareas.splice(indice, 1);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      mostraTareas(tareas);
      Swal.fire({
        title: "¡Limpiando!",
        text: "Tarea borrada",
        icon: "success",
      });
    }
  });
}

function editarTarea(indice) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  if (indice < 0 || indice >= tareas.length) {
    console.log("error de indice");
    return;
  }

  input.value = tareas[indice];
  // Guardar qué tarea se está editando con dataset (metodo para guardar algo en elementos html)
  input.dataset.editIndex = indice;
}

function completarTarea(indice) {
  // trabajamos con nuestros dos arreglos localstorage
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  let completas = JSON.parse(localStorage.getItem("completadas")) || [];

  //creamos una variable de aux para almacenar la tarea. borramos y almacenamos
  const aux = tareas.splice(indice, 1)[0];

  // metemos en nuestro arreglo de completadas
  completas.push(aux);
  // actualizamos nuestra tabla de tareas.
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostraTareas(tareas);

  //mandamos a mostrar nuestro elemento de tareas completadas.
  localStorage.setItem("completadas", JSON.stringify(completas));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "<span style='font-size:14px;'>Tarea completada</span>",
    showConfirmButton: false,
    width: "200px",
    timer: 1500,
  });
  mostraTareasCompletas(completas);
}

function mostraTareasCompletas(array) {
  const historial = document.querySelector(".lista-completadas");

  historial.innerHTML = "";

  if (array.length === 0) {
    const p = document.createElement("P");
    p.classList.add("tarea-vacia");
    p.textContent = "Todavia no has completado ninguna tarea";
    historial.appendChild(p);
    return;
  }

  array.forEach((tarea, indice) => {
    const p = document.createElement("P");
    p.classList.add("tarea-completa");
    p.innerHTML = `Completaste la tarea: <span> ${tarea} </span>`;
    historial.appendChild(p);
  });
}
