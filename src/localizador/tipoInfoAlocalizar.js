// OK medorar desc*************************************************************************************
// ********************         Funciones:          ************************************
// ********************      marcas_parroquias()    ************************************
// ********************      demarcaciones_prq()    ************************************
// ********************        marcas_cmssv()       ************************************
// ********************     demarcaciones_cmssv()   ************************************
// ********************        marcas_cINTRA()      ************************************
// ********************        marcas_arropa()      ************************************
// *************************************************************************************
// 
// Descripción: dibuja o borra en el mapa los recursos solicitados 
// Llamadas por: 
//   botón imagen "Marcas parroquias" (document.locCaritas.src)
//   botón imagen "Demarcaciones parroquias" (document.areasCaritas.src)
//   botón imagen "Marcas CMSS de Valencia" (document.locCMSSV.src)
//   botón imagen "Demarcaciones CMSSV de Valencia" (document.areasCMSSV.src)
//   botón imagen "Contenedores @rropa" (document.cINTRA.src)
//   botón imagen "Tiendas @rropa" (document.arropa.src)
// Invocan a:
//    función muestraOcultaInfo
// Reciben: 
//    - est: que recogen en
//          - est_marcas_prq
//          - est_demarc_prq
//          - est_marcas_cmssv
//          - est_demarc_cmssv
//          - est_marcas_cINTRA
//          - est_marcas_arropa
// Devuelven: 
//    nada   
// Variables locales: 
//    ninguna
// Variables globales:
//    - dibuja
//    en marcas_parroquias():
//      - est_marcas_prq
//      - prqs_marcas_todas
//      - prqs_marcas_direc
//      - prqs_marcas_radio
//      - document.locCaritas.src
//      - locCaritasImagenDesactivado.src
//      - locCaritasImagenActivado.src
//    en demarcaciones_prq():
//      - est_demarc_prq
//      - prqs_demarc_todas
//      - prqs_demarc_direc
//      - prqs_demarc_radio
//      - document.areasCaritas.src
//      - areasCaritasImagenDesactivadas.src
//      - areasCaritasImagenActivadas.src
//    en marcas_cmssv():
//      - est_marcas_cmssv
//      - cmssv_marcas_todas
//      - cmssv_marcas_direc
//      - cmssv_marcas_radio
//      - document.locCMSSV.src
//      - locCMSSVImagenDesactivado.src
//      - locCMSSVImagenActivado.src
//    en demarcaciones_cmssv():
//      - est_demarc_cmssv
//      - cmssv_demarc_todas
//      - cmssv_demarc_direc
//      - cmssv_demarc_radio
//      - document.areasCMSSV.src
//      - areasCMSSVImagenDesactivadas.src
//      - areasCMSSVImagenActivadas.src
//    en marcas_cINTRA():
//      - est_marcas_cINTRA
//      - cINTRA_marcas_todas
//      - cINTRA_marcas_direc
//      - cINTRA_marcas_radio
//      - document.INTRA.src
//      - cINTRAImagenDesactivado.src
//      - cINTRAImagenActivado.src
//    en marcas_arropa():
//      - est_marcas_arropa
//      - arropa_marcas_todas
//      - arropa_marcas_direc
//      - arropa_marcas_radio
//      - document.arropa.src
//      - arropaImagenDesactivado.src
//      - arropaImagenActivado.src

function auxtipoInfoAlocalizar(est,idDibuja) {
  if (est) {
    // y llama a la función localizaRecursos() para dibujar sólo recursos del tipo "idDibuja"
    dibuja = idDibuja;
    toda = false;
    localizaRecursos();
  }
  else {
    // Finalmente, actualizamos el globo en el punto de dirección facilitada, hacemos que 
    // se abra si se hace click en mi_marca o lo abrimos directamente si hay que informa 
    // de algún recurso solicitado que no está disponible.  
    globoEnCasa();
  }
}

function marcas_parroquias() {
  est_marcas_prq = muestraOcultaInfo(est_marcas_prq,
                          prqs_marcas_todas,
                          prqs_marcas_direc,
                          prqs_marcas_radio,
                          document.locCaritas.src,
                          locCaritasImagenDesactivado.src,
                          locCaritasImagenActivado.src)
  auxtipoInfoAlocalizar(est_marcas_prq,11);
}


function demarcaciones_prq() {
  est_demarc_prq = muestraOcultaInfo(est_demarc_prq,
                          prqs_demarc_todas,
                          prqs_demarc_direc,
                          prqs_demarc_radio,
                          document.areasCaritas.src,
                          areasCaritasImagenDesactivadas.src,
                          areasCaritasImagenActivadas.src)
  auxtipoInfoAlocalizar(est_demarc_prq,12);
}
  

function marcas_cmssv() {
  est_marcas_cmssv = muestraOcultaInfo(est_marcas_cmssv,
                           cmssv_marcas_todas,
                           cmssv_marcas_direc,
                           cmssv_marcas_radio,
                           document.locCMSSV.src,
                           locCMSSVImagenDesactivado.src,
                           locCMSSVImagenActivado.src)
  auxtipoInfoAlocalizar(est_marcas_cmssv,21);
}
    

function demarcaciones_cmssv() {
  est_demarc_cmssv = muestraOcultaInfo(est_demarc_cmssv,
                           cmssv_demarc_todas,
                           cmssv_demarc_direc,
                           cmssv_demarc_radio,
                           document.areasCMSSV.src,
                           areasCMSSVImagenDesactivadas.src,
                           areasCMSSVImagenActivadas.src)
  auxtipoInfoAlocalizar(est_demarc_cmssv,22);
}


function marcas_cINTRA() {
  est_marcas_cINTRA = muestraOcultaInfo(est_marcas_cINTRA,
                            cINTRA_marcas_todas,
                            cINTRA_marcas_direc,
                            cINTRA_marcas_radio,
                            document.cINTRA.src,
                            cINTRAImagenDesactivado.src,
                            cINTRAImagenActivado.src)
  auxtipoInfoAlocalizar(est_marcas_cINTRA,3);
}


function marcas_arropa() {
  est_marcas_arropa = muestraOcultaInfo(est_marcas_arropa,
                            arropa_marcas_todas,
                            arropa_marcas_direc,
                            arropa_marcas_radio,
                            document.arropa.src,
                            arropaImagenDesactivado.src,
                            arropaImagenActivado.src)
  auxtipoInfoAlocalizar(est_marcas_arropa,4);
}

function marcas_ot() {
  otTipo = parseFloat(document.getElementById("TipoOtrosRecursos").value);
  if (!est_marcas_ot && otTipo == 500) {
    alert('Has de seleccionar un tipo de "Otros recursos"');
  }
  else { 
    est_marcas_ot = muestraOcultaInfo(est_marcas_ot,
                           auxListasOt(otTipo)[3],
                           auxListasOt(otTipo)[4],
                           auxListasOt(otTipo)[5],
                           document.ot.src,
                           otImagenDesactivado.src,
                           otImagenActivado.src)
    auxtipoInfoAlocalizar(est_marcas_ot,otTipo);
  }
}



