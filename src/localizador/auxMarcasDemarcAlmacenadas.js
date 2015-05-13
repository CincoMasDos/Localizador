// *************************************************************************************************
// *********************    auxMarcasDemarcAlmacenadas(...)    *************************************
// *************************************************************************************************
// 
// Descripción: Para el estado activado de marcas y/o demarcaciones, las añade al mapa tomándolas de
//					 las listas recibidas. También, para que sean visibles en la vista del mapa, extiende
//					 sus límites a la posición de cada marca o a los límites máximo y mínimo en el caso
//					 de las demarcaciones.
// Llamada por: 
// 	Función localizaPuntosEnAreas(...)
// Invoca a:
//		Función auxMarcasAlmacenadas(...)
// Recibe:
//		- est_marcas	: estado de las marcas (activadas o no) de este tipo de recursos
//		- est_demarc	: estado de las demarcaciones (activadas o no) de este tipo de recursos
//		- marcas			: lista de marcas a añadir al mapa
//		- demarc			: lista de demarcaciones a añadir al mapa
//		- limiteMax		: lista de puntos límite máximo de cada polígono (demarcación)
//		- limiteMin		: lista de puntos límite mínimo de cada polígono (demarcación)
// Devuelve: 
//		nada	
// Variables locales: 
//		- i	: contador
// Variables Globales
//		- map
//		- bounds

function auxMarcasDemarcAlmacenadas(est_marcas,
												est_demarc,
												marcas,
												demarc,
												limiteMax,
												limiteMin) {
	
	// Declaración y/o inicialización de variables										
	var i;
	
	// Operaciones de la función	
	if (est_marcas) {
		auxMarcasAlmacenadas(marcas);
	}

	if (est_demarc) {
		for (i=0; i<demarc.length; i++) {
			demarc[i].setMap(map);
			bounds.extend(limiteMax[i]);
			bounds.extend(limiteMin[i]);
		}
	}
	
}
