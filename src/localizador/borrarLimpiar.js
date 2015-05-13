// *******************************************************************************************
// *****************        Funciones        *************************************************
// *****************    borraListasDirec()   *************************************************
// *****************    borraListasRadio()   *************************************************
// *****************    borraListasTodas()   *************************************************
// *****************    borraListas()        *************************************************
// *****************    limpiarInfoRadio()   *************************************************
// *****************    limpiarInfo()        *************************************************
// *****************    quitarRuta()         *************************************************
// *****************    limpia_mapa()        *************************************************
// *******************************************************************************************
// 
// Descripción: Funciones que vacian las listas de elementos dibujados en el mapa y los
//					 limpian del mapa. También borran, si la hay, la ruta y su info vinculada.
// Llamadas por:
//		- 
//		- funciones 
//		- función 
// Invocan a:
//		nada
// Reciben:
//		nada
// Devuelven:
// 	nada 
// Variables locales:
//		- i	:contador
// Variables globales:
//		- map
//		En borraListasDirec() y limpiarInfo() (menos índice y límites)
//			- prqs_marcas_direc
//			- prqs_demarc_direc
//			- prqs_demarc_direc_limiteMax
//			- prqs_demarc_direc_limiteMin
//			- prqs_indice_direc
//			- cmssv_marcas_direc
//			- cmssv_demarc_direc
//			- cmssv_demarc_direc_limiteMax
//			- cmssv_demarc_direc_limiteMin
//			- cmssv_indice_direc
//			- cINTRA_marcas_direc
//			- arropa_marcas_direc
//		En borraListasRadio() y limpiarInfoRadio() (menos índice y límites)
//			- prqs_marcas_radio
//			- prqs_demarc_radio
//			- prqs_demarc_radio_limiteMax
//			- prqs_demarc_radio_limiteMin
//			- prqs_indice_radio
//			- cmssv_marcas_radio
//			- cmssv_demarc_radio
//			- cmssv_demarc_radio_limiteMax
//			- cmssv_demarc_radio_limiteMin
//			- cmssv_indice_radio
//			- cINTRA_marcas_radio
//			- arropa_marcas_radio
//		En borraLitasTodas() y limpiarInfo() (menos índice)
//			- prqs_marcas_todas
//			- prqs_demarc_todas
//			- prqs_indice_todas
//			- cmssv_marcas_todas
//			- cmssv_demarc_todas
//			- cmssv_indice_todas
//			- cINTRA_marcas_todas
//			- arropa_marcas_todas
//		En limpia_mapa() 
//			- est_marcas_prq
//			- est_demarc_prq
//			- est_marcas_cmssv
//			- est_demarc_cmssv
//			- est_marcas_cINTRA
//			- est_marcas_arropa
//			- document.locCaritas.src
//			- document.areasCaritas.src
//			- document.locCMSSV.src
//			- document.areasCMSSV.src
//			- document.cINTRA.src
//			- document.arropa.src
//		En quitarRuta()
//			- directionsDisplay

function borraListasDirec() {
	// Vacía las listas de marcas, demarcaciones, límites e índices de elementos dibujados en el mapa
	// con el tipo de búsqueda "Dirección" 
	prqs_marcas_direc = [];
	prqs_demarc_direc = [];
	prqs_demarc_direc_limiteMax = [];
	prqs_demarc_direc_limiteMin = [];
	prqs_indice_direc = [];
	cmssv_marcas_direc = [];
	cmssv_demarc_direc = [];
	cmssv_demarc_direc_limiteMax = [];
	cmssv_demarc_direc_limiteMin = [];
	cmssv_indice_direc = [];
	cINTRA_marcas_direc = [];
	arropa_marcas_direc = [];
	for (i = 0; i < idsTiposOt.length; i++) {
		auxListasOt(idsTiposOt[i])[4].length = 0;
	} 
	
}

function borraListasRadio() {
	// Vacía las listas de marcas, demarcaciones, límites e índices de elementos dibujados en el mapa
	// con el tipo de búsqueda "Radio"
	prqs_marcas_radio = [];
	prqs_demarc_radio = [];
	prqs_demarc_radio_limiteMax = [];
	prqs_demarc_radio_limiteMin = [];
	prqs_indice_radio = [];
	cmssv_marcas_radio = [];
	cmssv_demarc_radio = [];
	cmssv_demarc_radio_limiteMax = [];
	cmssv_demarc_radio_limiteMin = [];
	cmssv_indice_radio = [];
	cINTRA_marcas_radio = [];
	arropa_marcas_radio = [];
	for (i = 0; i < idsTiposOt.length; i++) {
		//if ( idsTiposOt[i] == 505) {alert(""+idsTiposOt[i]+": "+auxListasOt(idsTiposOt[i])[5].length+"");}
		auxListasOt(idsTiposOt[i])[5].length = 0;
		//if ( idsTiposOt[i] == 505) {alert("505: "+ot505marc_r.length+"");}
	} 
}

function borraListasTodas() {
	// Vacía las listas de marcas, demarcaciones e índices de elementos dibujados en el mapa
	// con el tipo de búsqueda "Todas"
	prqs_marcas_todas = [];
	prqs_demarc_todas = [];
	prqs_indice_todas = [];
	cmssv_marcas_todas = [];
	cmssv_demarc_todas = [];
	cmssv_indice_todas = [];
	cINTRA_marcas_todas = [];
	arropa_marcas_todas = [];
	for (i = 0; i < idsTiposOt.length; i++) {
		auxListasOt(idsTiposOt[i])[3].length = 0;
	}
}

function borraListas() {
	// Ejecuta las 3 funciones anteriores
	borraListasDirec();
	borraListasRadio();
	borraListasTodas();
}

function limpiaDeMapaLista(lista) {
	for (var i = 0; i < lista.length; i++) { 
		lista[i].setMap(null);
	}
}

function limpiarInfoOtrosRecursos() {
	// Limpia del mapa las marcas de "Otros recursos" 
	limpiaDeMapaLista(auxListasOt(otTipo)[3]);
	limpiaDeMapaLista(auxListasOt(otTipo)[4]);
	limpiaDeMapaLista(auxListasOt(otTipo)[5]);
}


function limpiarInfoRadio() {
	// Limpia del mapa las marcas y demarcaciones de elementos dibujados con el tipo de 
	// búsqueda "Radio"
	limpiaDeMapaLista(prqs_marcas_radio);
	limpiaDeMapaLista(prqs_demarc_radio);
	limpiaDeMapaLista(cmssv_marcas_radio);
	limpiaDeMapaLista(cmssv_demarc_radio);
	limpiaDeMapaLista(cINTRA_marcas_radio);
	limpiaDeMapaLista(arropa_marcas_radio);
	limpiaDeMapaLista(auxListasOt(otTipo)[5]);
}

function limpiarInfo() {
	// Para limpiar del mapa todos los elementos dibujados, ejecuta las dos funciones anteriores
	limpiarInfoRadio();
	limpiarInfoOtrosRecursos();
	// y después limpia del mapa las marcas y demarcaciones de elementos dibujados con los tipos de 
	// búsqueda "Dirección" y "Todas"
	limpiaDeMapaLista(prqs_marcas_todas);
	limpiaDeMapaLista(prqs_marcas_direc);
	limpiaDeMapaLista(prqs_demarc_todas);
	limpiaDeMapaLista(prqs_demarc_direc);
	limpiaDeMapaLista(cmssv_marcas_todas);
	limpiaDeMapaLista(cmssv_marcas_direc);
	limpiaDeMapaLista(cmssv_demarc_todas);
	limpiaDeMapaLista(cmssv_demarc_direc);
	limpiaDeMapaLista(cINTRA_marcas_todas);
	limpiaDeMapaLista(cINTRA_marcas_direc);
	limpiaDeMapaLista(arropa_marcas_todas);
	limpiaDeMapaLista(arropa_marcas_direc);
}

  
function quitarRuta() {
	// Limpia del mapa la ruta (si la hay) y vacía el panel de su descripción
	directionsDisplay.setMap(null);
	directionsDisplay.setPanel(null);
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("informeRuta"));
}

function limpia_mapa() {
	// Para limpiar del mapa todos los elementos localizados y la ruta calculada (si la hubiera)
	// ejecuta estas 2 funciones definidas antes
	//bloquearPagina();
	limpiarInfo();
	quitarRuta();
	
	// establece en "false" las las variables que controlan el estado de los botones (activados o no)
	// de los diferentes tipos de recursos (marcas y demarcaciones)
	est_marcas_prq = false;
	est_demarc_prq = false;
	est_marcas_cmssv = false;
	est_demarc_cmssv = false;
	est_marcas_cINTRA = false;
	est_marcas_arropa = false;
	est_marcas_ot = false;
	
	// actualiza el globo en la marca de nuestra dirección
	globoEnCasa();
	
	// y pone en estado desactivado dichos botones
	document.locCaritas.src = locCaritasImagenDesactivado.src;
	document.areasCaritas.src = areasCaritasImagenDesactivadas.src;
	document.locCMSSV.src = locCMSSVImagenDesactivado.src;
	document.areasCMSSV.src = areasCMSSVImagenDesactivadas.src;
	document.cINTRA.src = cINTRAImagenDesactivado.src;
	document.arropa.src = arropaImagenDesactivado.src;
	document.ot.src = otImagenDesactivado.src;
	//habilitarPagina();
}
