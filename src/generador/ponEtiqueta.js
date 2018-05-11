// ************************************************************************************************
// ****************      Función ponEtiqueta(punto,etiqueta,estilo)     ***************************
// ************************************************************************************************
//
// Descripción: Dibuja una marca con la etiqueta indicada, en el punto facilitado 
//              y con el estilo sumintrado:
// Llamada por: 
//    función construyeLeyenda(...) 
//    función capaLeyendaLimites()
//    función capaEtiquetasConsultas()
// Invoca a:
//    función MarkerWithLabel(...)
// Recibe: 
//    punto,etiqueta,estilo
// Devuelve: 
//    marca    
// Variables globales:
//    map
//    imgMarcaArrastrar

function ponEtiqueta(punto,etiqueta,estilo) {
   var marker = new MarkerWithLabel({
      position: punto,
      draggable: true,
      map: map,
      labelContent: etiqueta,
      labelAnchor: new google.maps.Point(22, 0),
      labelClass: estilo, // la clase CSS para la etiqueta
      labelStyle: {opacity: 0.75}
   });
   checkboxCapa = document.getElementById("marcasArrastre");
   if (checkboxCapa.checked) {
     marker.setIcon(imgMarcaArrastrar);
   }
   else marker.setIcon(imgMarcaInvisible);
   return marker;
}
