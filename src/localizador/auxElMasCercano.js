// *************************************************************************************************
// ****************************      auxElMasCercano(...)    ***************************************
// *************************************************************************************************
// 
// Descripción: Devuelve el lugar que ocupa, en la lista "puntos[]" de objetos punto recibida, 
//					 el de menor distancia al objeto "punto" evaluado que también recibe.					 
// Llamada por: 
// 	Función localizaPuntos(...)
// Invoca a:
//		Función distanciaEntre(...)
// Recibe:
//		- puntos: lista de objetos punto en la que buscamos el lugar que ocupa 
//					 el de menor distancia al punto evaluado
//		- punto : punto de evaluación
// Devuelve: 
//		i
// Variables locales: 
//		- distMenor : va almacenando la distancia menor encontrada 
//		- j			: contador
//		- distancia	: recoge la distancia calculada por distanciaEntre(...)
//		- i			: valor que devuelve
// Variables Globales
//		ninguna

function	auxElMasCercano(puntos,punto) {
	
	var distMenor = distanciaEntre(puntos[0],punto); 
	for (var j=0; j<puntos.length; j++) {
		var distancia = distanciaEntre(puntos[j],punto); 
		if (distancia <= distMenor) {
			var i=j;
			distMenor = distancia;
		}
	}
	return i;

}
