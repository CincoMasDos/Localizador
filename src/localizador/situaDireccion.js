// *************************************************************************************************
// **********************   Función situaDireccion   ***********************************************
// *************************************************************************************************
// 
// Descripción: para una respuesta positiva del geocodificador, geolocaliza la dirección de 
//           búsqueda y lanza el proceso de localización llamando a "localizaRecursos". 
//           En caso de no haber respuesta positiva del geocodificador, indica el motivo. 
// Llamada por: 
//   onsubmit del form "busquedaForm"
// Invoca a:
//    función limpiarInfo()
//    función quitarRuta()
//    función borraListas()
//    función localizaRecursos()
//    función iniciaLocalizacion()
// Recibe: 
//    nada
// Devuelve: 
//    nada   
// Variables locales: 
//    - geo          : cliente geocoder
//    - localidad      : cadena que recoge del formulario la localidad del punto a localizar
//    - calleynumero    : cadena que recoge del formulario la calle y número del punto a localizar 
//    - dirAbuscarGeocod: direccionAbuscar con añadido de "Comunidad Valenciana" (será la que se 
//                  le pase al geocodificador para afinar mejor los resultados)
//    - i          : contador
//    - motivo        : cadena que recoge el error dado por el geocodificador
//    - limBusqPref    : establece los límites geográficos de búsqueda preferencial para el 
//                  geocodificador
// Variables globales:
//    - direccionAbuscar
//    - bounds
//    - toda
//    - casa
//    - mi_marca

    
function situaDireccion() {
  
  //Declaración y/o inicialización de variables locales
  
  var geo = new google.maps.Geocoder();
  var localidad = document.getElementById("localidad").value;
  var calleynumero = document.getElementById("calleynumero").value;
  direccionAbuscar = ""+calleynumero+", "+localidad+"";
  var dirAbuscarGeocod = ""+direccionAbuscar+"";
                                                // para mejorar la búsqueda
  var i=0;
  var motivo;
  var limBusqPref = new google.maps.LatLngBounds(new google.maps.LatLng(40.041, -1.512),
                                  new google.maps.LatLng(38.399, 0.345));
  
  // Borramos todo lo dibujado en el mapa y las listas de resultados 
  // ya que la dirección de búsqueda va a cambiar
  limpiarInfo();
  quitarRuta();
  borraListas();
  mi_marca.setMap(null);

  // Reinicializamos la variable global que controla los límites de mapa para que los recursos
  // localizados se vean
  bounds = new google.maps.LatLngBounds();
  
  // Establecemos en true la variable que indica si han de burscarse todos los tipos de recursos
  toda = true;  
  
  // Ejecutamos el geolocalizador
  geo.geocode( { 'address': dirAbuscarGeocod,
            'bounds': limBusqPref},
            function (results, status) {
    
    if (status == "OK") {
    
      // Si hay un único resultado
      if (results.length == 1) {
      
        // Vaciamos el <di> "posiblesResultados" (por si tuviera algo)
        document.getElementById("posiblesResultados").innerHTML = "";
        
        // Establecemos el punto resultado de la geocodificación como "casa"
        casa = results[0].geometry.location;
        
        // Si el resultado es el punto "genérico" para la ciudad de Valencia
        if (casa.lat()==39.4702393 && casa.lng()==-0.3768049 
          || results[0].formatted_address == "Valencia, España")
        {
          alert('No se ha podido encontrar: "'+direccionAbuscar+'". Revisa el nombre '+
          'de la calle, quizá en el mapa aparezca escrito de otra forma.')
        }
        
        else {
          // Asignamos a direccionAbuscar la dirección devuelta por el geocodificador
          direccionAbuscar = results[0].formatted_address;

          // Iniciamos el proceso de localización
          iniciaLocalizacion();
        }
      

      }
      
      // Si hay más de un resultado, pregunta "¿Qué dirección buscas?" de entre las posibles
      else {
      
        // Añadimos al <div> "posiblesResultados", un encabezado
        document.getElementById("posiblesResultados").innerHTML = "¿Qué dirección buscas?:";
        
        // Recorremos los posibles resultados y los muestra en un listado
        for (i=0; i<results.length; i++) {
        
          casa = results[i].geometry.location;
                    
          // Añadimos al <div> "posiblesResultados", un hipervínculo por dirección que permita
          // seleccionar la que elijamos
          document.getElementById("posiblesResultados").innerHTML += "<br>"+(i+1)+": "+
          "<a href='javascript:casa=new google.maps.LatLng("+casa.lat()+","+casa.lng()+");"+
          "direccionAbuscar="+'"'+results[i].formatted_address+'"'+";iniciaLocalizacion();'>"+
          ""+results[i].formatted_address+"</a>";
          // NOTAS: 
          //    1. Asignamos el valor a "casa" generando un nuevo LatLng porque si no,
          //      en esta instrucción javascript no reconoce bien el LatLng
          //    2. Los +'"' y '"'+ de más son para que no dé error al pasar por javascript
          //      la dirección formateada devuelta por el geocodificador
          
        }//for
        
      }//else
      
    }//if (status == "OK")
    
      // Si no ha habido ningún resultado, decodifica/traduce el error mostrado
    else {
      motivo="Código: "+status;
      if (status=="ERROR") {
        motivo = "Código: "+status+" (Se ha producido un error al establecer "+
        "la comunicación con los servidores de Google)";
      }
      else if (status=="INVALID_REQUEST") {
        motivo = "Código: "+status+" (La solicitud de geocodificación no es válida)";
      }
      else if (status=="OVER_QUERY_LIMIT") {
        motivo = "Código: "+status+" (Se ha superado el límite de solicitudes en un "+
        "período de tiempo demasiado breve)";
      }
      else if (status=="REQUEST_DENIED") {
        motivo = "Código: "+status+" (No se permite que la página web utilice el geocoder)";
      }
      else if (status=="UNKNOWN_ERROR") {
        motivo = "Código: "+status+" (No se pudo procesar una solicitud de codificación "+
        "geográfica debido a un error del servidor. Puede que la solicitud se realice "+
        "correctamente si lo intentas de nuevo)";
      }
      else if (status=="ZERO_RESULTS") {
        motivo = "Código: "+status+" (No se ha encontrado ningún resultado para "+
        "esta solicitud de geocodificación)";
      }
      alert('No se ha podido encontrar "'+direccionAbuscar+ '". ' + motivo);
    }
  } 
  ); //fin de ejecución del geolocalizador (geo.getLocations)

} //***************** fin función situaDireccion ***************************************************
    
    
