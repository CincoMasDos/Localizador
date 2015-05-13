// *************************************************************************************************
// ************************    auxMarcasAlmacenadas(...)    ****************************************
// *************************************************************************************************
// 
// Descripción: Añade al mapa cada una de las marcas contenidas en la lista y, para que sea visible
//					 en la vista del mapa, extiende sus límites a la posición de cada una
// Llamada por: 
// 	Función localizaPuntos(...)
// Invoca a:
//		nada
// Recibe:
//		- marcas	: lista de marcas a añadir al mapa
// Devuelve: 
//		nada	
// Variables locales: 
//		- i		: contador
// Variables Globales
//		- map
//		- bounds

function auxMarcasAlmacenadas(marcas) {

	for (var i=0; i<marcas.length; i++) {
		marcas[i].setMap(map);
		bounds.extend(marcas[i].getPosition());
	}

}
