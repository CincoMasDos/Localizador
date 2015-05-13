// *************************************************************************************************
// ****************************      distanciaEntre(...)    ****************************************
// *************************************************************************************************
// 
// Descripción: Devuelve la distancia en metros entre los dos objetos punto que recibe
// Llamada por: 
// 	Función localizaPuntosEnAreas(...)
//		Función localizaPuntos(...)
//		Función auxElMasCercano(...)
// Invoca a:
//		nada
// Recibe:
//		- A y B: objetos punto
// Devuelve: 
//		- distancia 	
// Variables locales: 
//		- distancia
// Variables Globales
//		ninguna

function distanciaEntre(A,B) {
	var distancia = google.maps.geometry.spherical.computeDistanceBetween(A,B);
	return distancia;
}
