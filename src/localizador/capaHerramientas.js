// ***********************************************************************************************
// ***************************         Función          ******************************************
// ***************************    capaHerramientas()    ******************************************
// ***********************************************************************************************
//
// Descripción: 
//    Funcion que activa y desactiva el panel lateral de herramientas.            
// Llamadas por: 
//
// Invocan a:
//    
// Variables globales:
//    - map
//    - controlHerramientas


// *********************** Capa Panel lateral de Herramientas *******************************

function capaHerramientas() {
   if (controlHerramientas) {
      document.getElementById("lateral").style.visibility = 'hidden';
      controlHerramientas = false;
      document.getElementById("actDesPanel").src = "imagenes/mostrar_panel.png";
   }
   else {
      document.getElementById("lateral").style.visibility = 'visible';   
      controlHerramientas = true;
      document.getElementById("actDesPanel").src = "imagenes/ocultar_panel.png";
   }
}
