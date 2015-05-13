// ************************************************************************************************
// ****************    Función crearMiMarca    ****************************************************
// ************************************************************************************************
// 
// Descripción: Crea un marcador y abre globo con click en él
// Llamada por:
//    - función load()
//    - funciones descarga_prqs(), descarga_cmssv(), descarga cintra() y descarga_arropa()
//    - función auxMarca(...)
//    - función iniciaLocalizacion()
// Invoca a:
//    nada
// Recibe:
//    - punto      : objeto punto (en el que situará el marcador)
//    - html       : string con el texto a mostrar en el globo de información
//    - imgIcon    : imagen con la que estará representado el marcador
//    - sombraIcon : sombra de la imagen con la que estará representado el marcador
// Devuelve:
//    un marcador 
// Variables locales:
//    - marcador
// Variables globales:
//    - map
//    - centro
//    - infoGlobo
//    - Globo

function crearMiMarca(punto,html,imgIcon,sombraIcon) {
   // Crea y dibuja la marca
   var marcador = new google.maps.Marker({
      map: map,
      position: punto,
      icon: imgIcon,
      shadow: sombraIcon
   });
   // Abre globo al hacer click en ella
   google.maps.event.addListener(marcador, "click", function() {
      centro = map.getCenter();
      infoGlobo.setContent(html);
      infoGlobo.open(map, marcador);
      Globo = true;
   });
   return marcador;
}
//************* fin función crearMiMarca **********************************************************
