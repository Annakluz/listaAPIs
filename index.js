var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}
            
var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
  // agregamos las celdas a la fila
var $filaBoton = $("<td />");
    
    var $buscar = $("<span />").addClass("glyphicon glyphicon-zoom-in");
    var $lapiz = $("<span />").addClass("glyphicon glyphicon-pencil");
    var $borrar = $("<span />").addClass("glyphicon glyphicon-remove-circle");
    $filaBoton.append($buscar);
    $filaBoton.append($lapiz);
    $filaBoton.append($borrar);
    
    
  $tr.append($nombreTd);
  $tr.append($estadoTd);
    $tr.append($filaBoton);
  // agregamos filas a la tabla
  $tasksList.append($tr);

    $borrar.click(function(){
        $tr.css("display", "none");
    });
};



var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};



$(document).ready(cargarPagina);

