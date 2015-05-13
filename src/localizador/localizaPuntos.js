// *************************************************************************************************
// *************************      localizaPuntos(...)    *******************************************
// *************************************************************************************************
// 
// Descripción: Función auxiliar que localiza y dibuja los recursos puntuales (sólo marcas)
//           solicitados bajo las condiciones de búsqueda (tipo de búsqueda, dirección, radio...)
//           También extiende los límites de mapa para que los recursos dibujados sean visibles.
// Llamada por: 
//    - Función localizaRecursos 
// Invoca a:
//    - Función auxMarcasAlmacenadas(...)
//    - Función auxMarca(...)
//    - Función auxElMasCercano(...)
//    - Función distanciaEntre(...)
// Recibe:
//    - tipoInfo            : Identificador del tipo de recurso (para la utilidad
//                        añadir a informe)
//    - marcas_todas          : listas de marcas de elementos 
//    - marcas_direc            que ya se han dibujado en el mapa
//    - marcas_radio
//    - mensaGlobos[]        : lista de mensajes de cada uno de los recursos 
//    - puntos[]            : lista de las localizaciones de los recursos
//    - imagen              : imagen del icono para la marca de este tipo de recursos
//    - sombra              : sombra del icono para la marca de este tipo de recursos
// Devuelve: 
//    resultados[marcas_todas,
//            marcas_direc,
//            marcas_radio]
// Variables locales: 
//    - i        : contador
//    - marca      : marca de cada recurso localizado
//    - dev        : lista devuelta por la función auxMarca(...)
//    - resultados[]  : lista que almacena los elementos a devolver
// Variables Globales
//    - tipoBusqueda
//    - map
//    - bounds
//    - radioBusqueda
//    - casa

function localizaPuntos(tipoInfo,
                marcas_todas,
                marcas_direc,
                marcas_radio,
                mensaGlobos,
                puntos,
                imagen,
                sombra) {

  //Declaración y/o inicialización de variables locales
  var i=0;
  var marca;
  var dev;
  var resultados = [];
      
  switch (tipoBusqueda) {

    // Si se han de mostrar todas
    case "todas":
      if (marcas_todas.length > 0) {
        auxMarcasAlmacenadas(marcas_todas);
      }
      else {        
        for (i=0; i<puntos.length; i++) {
          dev = auxMarca(i,puntos[i],mensaGlobos[i],tipoInfo,imagen,sombra);
          marca = dev[0];
          marcas_todas.push(marca);
          marca.setMap(map);
          bounds.extend(marca.getPosition());                  
        }
      }
      break;
    
        
    // Si ha de mostrarse sólo la correspondiente por direccion
    case "direccion":
      if (marcas_direc.length > 0) {
        auxMarcasAlmacenadas(marcas_direc);
      }
      else {        
        // Evalua la lista de puntos para ver cuál es el más cercano
        i = auxElMasCercano(puntos,casa);        
        dev = auxMarca(i,puntos[i],mensaGlobos[i],tipoInfo,imagen,sombra);
        marca = dev[0];
        marcas_direc.push(marca);
        marca.setMap(map);
        bounds.extend(marca.getPosition());  
      }       
      break;
      
    // Si ha de mostrarse sólo las que están en un radio de búsqueda
    case "radio":
      if (marcas_radio.length > 0) {
        auxMarcasAlmacenadas(marcas_radio);
      }
      else {        
        // Evalua la lista de puntos para ver los que se encuentran dentro del radio de búsqueda
        for (i=0; i<puntos.length; i++) {
          if (distanciaEntre(puntos[i],casa) < radioBusqueda) {
            dev = auxMarca(i,puntos[i],mensaGlobos[i],tipoInfo,imagen,sombra);
            marca = dev[0];
            marcas_radio.push(marca);
            marca.setMap(map);
            bounds.extend(marca.getPosition());
          } //if
        } //for
      }
      break;
    }//switch

  resultados = [marcas_todas,
            marcas_direc,
              marcas_radio]
            
  return resultados;

}
