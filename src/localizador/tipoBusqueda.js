// ** Revisar la explicación previa


// ************************************************************************************************
// ********************* Funciones que controlan el tipo de búsqueda ******************************
// *********************          tipoBusquedaTodas()                ******************************
// *********************        tipoBusquedaDireccion()              ******************************
// *********************          tipoBusquedaRadio()                ******************************
// *********************             cambiaRadio()                   ******************************
// ************************************************************************************************
//
// Descripción: Funciones que controlan (con la variable global tipoBusqueda), si se muestran 
//          (de los recursos seleccionados) sólo los correspondientes a la dirección dada,
//           los que se encuentran en un radio determinado o todos.  
// Llamada por: 
//   checkbox del formulario "tipobusquedaForm"
// Invoca a:
//    función localizaRecursos()
//    función limpiarInfoRadio()
//    función borraListasRadio()
// Recibe: 
//    nada
// Devuelve: 
//    nada   
// Variables locales: 
//    ninguna
// Variables globales:
//    - tipoBusqueda
//    - latCasa
//    - lngCasa
//    - direccionAbuscar
//    - radioBusqueda
//    - prqs_marcas_radio
//    - prqs_demarc_radio
//    - prqs_indice_radio
//    - cmssv_marcas_radio
//    - cmssv_demarc_radio
//    - cmssv_indice_radio
//    - cINTRA_marcas_radio

    
function cambiaTipoBusqueda() {
  switch (document.getElementById("selectTipoBusqueda").value) {
    case "direc":
      tipoBusqueda = "direccion";
      limpiarInfo();
      bounds = new google.maps.LatLngBounds();
      toda = true;
      break;
    case "radio":
      tipoBusqueda = "radio";
        limpiarInfo();
        bounds = new google.maps.LatLngBounds();
        toda = true;          
        if (document.getElementById('radioBusqueda').value != radioBusqueda) {
          radioBusqueda = document.getElementById('radioBusqueda').value;
          borraListasRadio();          
        }
      break;
    case "todas":
      tipoBusqueda = "todas";
      limpiarInfo();
      bounds = new google.maps.LatLngBounds();
      toda = true;
      break;
  }
  localizaRecursos();
}

    
// Si cambia el radio de búsqueda
function cambiaRadio() {
  if (document.getElementById("radioBusqueda").value != radioBusqueda) {
    radioBusqueda = document.getElementById("radioBusqueda").value;
    document.getElementById("selectTipoBusqueda").value="radio";
    tipoBusqueda = "radio";
    limpiarInfo();
    bounds = new google.maps.LatLngBounds();
    borraListasRadio();
    toda = true;
    localizaRecursos();
  }
}

// Si cambia el tipo de los "otros recursos" a buscar
function cambiaTipoOtrosRecursos() {
  if (document.getElementById("TipoOtrosRecursos").value != otTipo) {
    limpiarInfoOtrosRecursos();
    otTipo = parseFloat(document.getElementById("TipoOtrosRecursos").value);
    dibuja = otTipo;
    if (!est_marcas_ot) {
      est_marcas_ot = true;
      document.ot.src = otImagenActivado.src;
    }
    localizaRecursos();
  }
}

// ****************** Fin funciones que controlan el tipo de búsqueda *****************************
