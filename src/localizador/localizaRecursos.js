// *************************************************************************************************
// ********************    Función localizaRecursos    *********************************************
// *************************************************************************************************
// 
// Descripción: Ayudado de las funciones auxiliares localizaPuntosEnAreas(...) y localizaPuntos(...)
//           dibuja en el mapa los recursos solicitados
// Llamada por: 
//   función iniciaLocalizacion()
//   función marcas_parroquias()
//   función demarcaciones_prq()
//   función marcas_cmssv()
//   función demarcaciones_cmssv()
//    función marcas_cINTRA()
//    función marcas_arropa()
// Invoca a:
//    localizaPuntosEnAreas(...)
//    localizaPuntos(...)
//    globoEnCasa()
// Recibe: 
//    nada
// Devuelve: 
//    nada   
// Variables locales: 
//    - resultados[]    : lista en la que se devuelven los resultados de las llamadas a las
//                  funciones localizaPuntosEnAreas(...) y localizaPuntos(...)
//
// Variables globales:
//    - miMensaGlobo
//
//    - casa
//    - map
//
//    - est_marcas_prq
//    - est_demarc_prq   
//    - est_marcas_cmssv
//    - est_demarc_cmssv
//    - est_marcas_cINTRA
//    - est_marcas_arropa
//
//    - prqs_marcas_todas
//    - prqs_marcas_direc
//    - prqs_marcas_radio
//    - prqs_demarc_todas
//    - prqs_demarc_direc
//    - prqs_demarc_direc_limiteMax
//    - prqs_demarc_direc_limiteMin
//    - prqs_demarc_radio
//    - prqs_demarc_radio_limiteMax
//    - prqs_demarc_radio_limiteMin
//
//    - cmssv_marcas_todas
//    - cmssv_marcas_direc
//    - cmssv_marcas_radio
//    - cmssv_demarc_todas
//    - cmssv_demarc_direc
//    - cmssv_demarc_direc_limiteMax
//    - cmssv_demarc_direc_limiteMin
//    - cmssv_demarc_radio
//    - cmssv_demarc_radio_limiteMax
//    - cmssv_demarc_radio_limiteMin
//
//    - cINTRA_marcas_todas
//    - cINTRA_marcas_direc
//    - cINTRA_marcas_radio
//
//    - arropa_marcas_todas
//    - arropa_marcas_direc
//    - arropa_marcas_radio
//
//    - prqs_mensaGlobo
//    - prqs_punto
//
//    - cmssv_mensaGlobo
//    - cmssv_punto
//
//    - cINTRA_mensaGlobo
//    - cINTRA_punto
//
//    - arropa_mensaGlobo
//    - arropa_punto
//
//    - polys_prqs  
//    - polys_prqs_limiteMax
//    - polys_prqs_limiteMin
//  
//    - polys_cmssv
//    - polys_cmssv_limiteMax
//    - polys_cmssv_limiteMin
//
//    - imgCaritas
//    - sombraCaritas
//
//    - imgCMSSV
//    - sombraCMSSV
//
//    - imgCINTRA
//    - sombraCINTRA
//
//    - imgArropa
//    - sombraArropa
//
//    - bounds
  
function localizaRecursos() {

  //bloquearPagina();
    
  //Declaración y/o inicialización de variables locales
  var resultados = [];
  
  // Iniciamos el proceso de localización de recursos ayudados por las funciones auxiliares 
  //  localizaPuntosEnAreas y localizaPuntos
  
  // ================ Localización de PARROQUIAS ============================================
  
    // Si está activado el botón de las marcas o el de sus demarcaciones
    if (est_marcas_prq && (dibuja == 11 || toda) 
      || est_demarc_prq && (dibuja == 12 || toda) ) {
      
      resultados = localizaPuntosEnAreas (1,
                              est_marcas_prq,
                              est_demarc_prq,
                              prqs_marcas_todas,
                              prqs_marcas_direc,
                              prqs_marcas_radio,
                              prqs_demarc_todas,
                              prqs_demarc_direc,
                              prqs_demarc_direc_limiteMax,
                              prqs_demarc_direc_limiteMin,
                              prqs_demarc_radio,
                              prqs_demarc_radio_limiteMax,
                              prqs_demarc_radio_limiteMin,
                              prqs_mensaGlobo,
                              prqs_punto,
                              polys_prqs,
                              polys_prqs_limiteMax,
                              polys_prqs_limiteMin,
                              imgCaritas,
                              sombraCaritas);
                            
      prqs_marcas_todas = resultados[0];
      prqs_marcas_direc = resultados[1];
      prqs_marcas_radio = resultados[2];
      prqs_demarc_todas = resultados[3];
      prqs_demarc_direc = resultados[4];
      prqs_demarc_direc_limiteMax = resultados[5];
      prqs_demarc_direc_limiteMin = resultados[6];
      prqs_demarc_radio = resultados[7];
      prqs_demarc_radio_limiteMax = resultados[8];
      prqs_demarc_radio_limiteMin = resultados[9];
    }
                          

  // ========= Localización de CMSS (Centros Munic. Servicios Sociales Valencia) ============

    // Si está activado el botón de las marcas o el de sus demarcaciones
    if (est_marcas_cmssv && (dibuja == 21 || toda) 
      || est_demarc_cmssv && (dibuja == 22 || toda)) {  
      
      resultados = localizaPuntosEnAreas (2,
                              est_marcas_cmssv,
                              est_demarc_cmssv,
                              cmssv_marcas_todas,
                              cmssv_marcas_direc,
                              cmssv_marcas_radio,
                              cmssv_demarc_todas,
                              cmssv_demarc_direc,
                              cmssv_demarc_direc_limiteMax,
                              cmssv_demarc_direc_limiteMin,
                              cmssv_demarc_radio,
                              cmssv_demarc_radio_limiteMax,
                              cmssv_demarc_radio_limiteMin,
                              cmssv_mensaGlobo,
                              cmssv_punto,
                              polys_cmssv,
                              polys_cmssv_limiteMax,
                              polys_cmssv_limiteMin,
                              imgCMSSV,
                              sombraCMSSV);
                            
      cmssv_marcas_todas = resultados[0];
      cmssv_marcas_direc = resultados[1];
      cmssv_marcas_radio = resultados[2];
      cmssv_demarc_todas = resultados[3];
      cmssv_demarc_direc = resultados[4];
      cmssv_demarc_direc_limiteMax = resultados[5];
      cmssv_demarc_direc_limiteMin = resultados[6];
      cmssv_demarc_radio = resultados[7];
      cmssv_demarc_radio_limiteMax = resultados[8];
      cmssv_demarc_radio_limiteMin = resultados[9];
    }


  // ================= Localización de contenedores @rropa (INTRA) ==========================

    // Si está activado el botón de las marcas
    if (est_marcas_cINTRA && (dibuja == 3 || toda) ) {
    
      resultados = localizaPuntos (3,
                          cINTRA_marcas_todas,
                          cINTRA_marcas_direc,
                          cINTRA_marcas_radio,
                          cINTRA_mensaGlobo,
                          cINTRA_punto,
                          imgCINTRA,
                          sombraCINTRA);
                            
      cINTRA_marcas_todas = resultados[0];
      cINTRA_marcas_direc = resultados[1];
      cINTRA_marcas_radio = resultados[2];
    }
    
    
  // ================= Localización de tiendas @rropa (INTRA) ==========================

    // Si está activado el botón de las marcas
    if (est_marcas_arropa && (dibuja == 4 || toda) ) {
    
      resultados = localizaPuntos (4,
                          arropa_marcas_todas,
                          arropa_marcas_direc,
                          arropa_marcas_radio,
                          arropa_mensaGlobo,
                          arropa_punto,
                          imgArropa,
                          sombraArropa);
                            
      arropa_marcas_todas = resultados[0];
      arropa_marcas_direc = resultados[1];
      arropa_marcas_radio = resultados[2];
    }
    
    
  // ================= Localización de otros recursos ==========================

    // Si está activado el botón de las marcas
    if (est_marcas_ot && ((dibuja == 501 ||
                    dibuja == 502 ||
                    dibuja == 503 ||
                    dibuja == 504 ||
                    dibuja == 505 ||
                    dibuja == 506 ||
                    dibuja == 507 ||
                    dibuja == 508 ||
                    dibuja == 509 ||
                    dibuja == 510 ||
                    dibuja == 511 ||
                    dibuja == 512 ||
                    dibuja == 513 ||
                    dibuja == 514 ||
                    dibuja == 515 ||
                    dibuja == 516 ||
                    dibuja == 517 ||
                    dibuja == 518 ||
                    dibuja == 519 ) || toda) ) {
      
      resultados = localizaPuntos (dibuja,
                          auxListasOt(otTipo)[3], // ...marc_todas,
                          auxListasOt(otTipo)[4], // ...marc_direc,
                          auxListasOt(otTipo)[5], // ...marc_radio,
                          auxListasOt(otTipo)[2], // ..._mensaGlobo,
                          auxListasOt(otTipo)[1], // ..._punto,
                          imgOt,
                          sombraOt);
      
      auxListasOt(otTipo)[3] = resultados[0];
      auxListasOt(otTipo)[4] = resultados[1];
      auxListasOt(otTipo)[5] = resultados[2];
    }
    

  // Ajustamos la vista del mapa a todas las marcas visualizadas.
  bounds.extend(casa);
  map.fitBounds(bounds);
  //cont++;
  //var limite1 = crearMiMarca(bounds.getNorthEast(),""+cont+"",imgCasa,sombraCasa);
  //var limite2 = crearMiMarca(bounds.getSouthWest(),""+cont+"",imgCasa,sombraCasa);
  //document.getElementById("prompt").innerHTML+= ""+bounds+"<br>";

      
  // Actualizamos el globo en el punto de dirección facilitada, hacemos que se abra si se hace
  // click en mi_marca o lo abrimos directamente si hay que informa de algún recurso 
  // solicitado que no está disponible.  
  globoEnCasa();
  
  //habilitarPagina();
          
} // ****************** fin function localizaRecursos ****************************************
