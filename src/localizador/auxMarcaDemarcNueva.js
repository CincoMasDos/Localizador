// *************************************************************************************************
// *********************    auxMarcaDemarcNueva(...)    ********************************************
// *************************************************************************************************
// 
// Descripción: Para el estado activado de marcas y/o demarcaciones, las añade al mapa y, para que
//					 sean visibles en la vista del mapa, extiende sus límites a la posición de cada marca
//					 o a los límites máximo y mínimo en el caso de las demarcaciones.
// Llamada por: 
// 	Función localizaPuntosEnAreas(...)
// Invoca a:
//		nada
// Recibe:
//		- est_marcas	: estado de las marcas (activadas o no) de este tipo de recursos
//		- est_demarc	: estado de las demarcaciones (activadas o no) de este tipo de recursos
//		- marca			: marca a añadir al mapa si están activadas las marcas
//		- demarc			: demarcación a añadir al mapa si están activadas las demarcaciones
//		- limiteMax		: punto de límite máximo del polígono (demarcación) recibido
//		- limiteMin		: punto de límite mínimo del polígono (demarcación) recibido
// Devuelve: 
//		nada
// Variables locales: 
//		ninguna
// Variables Globales
//		- map
//		- bounds

function auxMarcaDemarcNueva(est_marcas,
									  est_demarc,
									  marca,
									  demarc,
									  limiteMax,
									  limiteMin) {

	if (est_marcas) {
		marca.setMap(map);
		bounds.extend(marca.getPosition());
	}
	if (est_demarc) {
		demarc.setMap(map);
		bounds.extend(limiteMax);						
		bounds.extend(limiteMin);
	}

}
