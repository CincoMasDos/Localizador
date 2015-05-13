// *************************************************************************************
// ********************* Función muestraOcultaInfo *************************************
// *************************************************************************************
// 
// Descripción: dibuja o borra en el mapa la info (marcas o polígonos) corresponcientes 
// Llamada por: 
//   - marcas_parroquias()
//   - demarcaciones_prq()
//   - marcas_cmssv()
//   - demarcaciones_cmssv()
//   - marcas_cINTRA()
//    - marcas_arropa()
// Invoca a:
//    función localizaRecursos
// Recibe: 
//    - est
//    - todas
//    - direc
//    - radio
// Devuelve: 
//    - est   
// Variables locales: 
//    - i          : contador
//    - est
//    - todas
//    - direc
//    - radio
//    - boton
//    - imgBotonDesactivado
//    - imgBotonActivado
// Variables globales:
//    - tipoBusqueda
//    - map
//    - latCasa
//    - lngCasa
//    - direccionAbuscar

function muestraOcultaInfo(est,
                  todas,
                  direc,
                  radio,
                  boton,
                  imgBotonDesactivado,
                  imgBotonActivado) {

  // Declaración y/o inicialización de variables locales
  var i;
  
  // Si está visible la info (activado el botón)  
  if (est) {
    // la borra del mapa  
    switch (tipoBusqueda) {
      case "todas":
        for (i=0; i<todas.length; i++) {
          todas[i].setMap(null);
        }
        break;
      case "direccion":
        for (var i=0; i<direc.length; i++) {
          direc[i].setMap(null);;
        }
        break;    
      case "radio":
        for (var i=0; i<radio.length; i++) {
          radio[i].setMap(null);;
        }
        break;        
    }
    // y desactiva el botón a la vez que cambia el valor de "est"
    est = false;
    boton = imgBotonDesactivado;
  }
            
  // en cambio, si no está visible la info (desactivado el botón)
  else if (!est) {
    // activa el botón a la vez que cambia el valor de "est"
    boton = imgBotonActivado;
    est = true;
  }
return est;  
}
// ************ Fin Función muestraOcultaInfo ****************************************
