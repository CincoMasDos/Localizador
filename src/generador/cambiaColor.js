// ************************************************************************************************
// **********************      Función cambiaColor(id)     ****************************************
// ************************************************************************************************
//
// Descripción: Al cambiar el valor en los selectores de color, actaualiza a ese color
//              el color del texto y el color de fondo del selector.
// Llamada por: 
//    onchangue de los select de color 
// Invoca a:
//    nada
// Recibe: 
//    id del select
// Devuelve: 
//    nada    
// Variables globales:
//    ninguna

function cambiaColor(id) {
   var select = document.getElementById(id);
   select.style.background = select.value;
   select.style.color = select.value;
}
