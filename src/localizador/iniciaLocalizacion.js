// *************************************************************************************************
// *****************     Función iniciaLocalizacion()      *****************************************
// *************************************************************************************************
// 
// Descripción: Función auxiliar intermedia llamada por situaDireccion() para actualizar 
//           miMensaglobo y la primera opción del select "selectTipoBusqueda". También borra
//           el <div> "posiblesResultados", añade mi_marca al mapa y finalmente llama a 
//           localizaRecursos() para localizar los recursos seleccionados.
// Llamada por:
//    - función situaDireccion()
// Invoca a:
//    - función crearMiMarca(...)
//    - función localizaRecursos()
// Recibe:
//    nada
// Devuelve:
//   nada 
// Variables locales:
//    ninguna
// Variables globales:
//    - miMensaGlobo
//    - direccionAbuscar
//    - tipoBusqueda
//    - mi_marca
//    - casa

function iniciaLocalizacion() {

  // Vaciamos el <div> "posiblesResultados"
  document.getElementById("posiblesResultados").innerHTML ="";

  // Con el nuevo valor de "direccionAbuscar":
  
    // Actualizamos "miMensaGlobo"
    miMensaGlobo = "<div class='globos2'>Localización de la dirección que has "+
              "facilitado:<br><strong>"+direccionAbuscar+"</strong></div>";
    
    // Actualizamos la primera opción del select "selectTipoBusqueda"
    document.getElementById("selectTipoBusqueda").options[0] = 
              new Option("Para: "+direccionAbuscar+"","direc");
  
    // y la establecemos como opción de búsqueda actual
    document.getElementById("selectTipoBusqueda").value= "direc";
    tipoBusqueda = "direccion";
  
  // Añadimos mi_marca al mapa
  mi_marca = new crearMiMarca(casa,miMensaGlobo,imgCasa,sombraCasa);
  
  // Finalmente llamamos a la función que localizará los recursos en el mapa
  localizaRecursos();
      
}
