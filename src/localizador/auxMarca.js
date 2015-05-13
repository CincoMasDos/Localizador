// *************************************************************************************************
// **************************      auxMarca(...)    ************************************************
// *************************************************************************************************
// 
// Descripción: crea una marca y un nuevo mensaje personalizado, que incluye 'Cómo llegar'
//					 y 'Añadir a informe', para la marca de este recurso localizado.
// Llamada por: 
// 	Función localizaPuntosEnAreas(...)
//		Función localizaPuntos(...)
// Invoca a:
//		Función crearMiMarca(...)
// Recibe:
//		- i				: posición en las listas globales del recurso localizado
//		- punto			: objeto punto de ese recurso
//		- mensaGlobo	: información base del recurso que se mostrará en su globo 
//		- tipoInfo		: identificador del tipo de recurso
//		- imagen			: imagen del icono para la marca de este tipo de recursos
//		- sombra			: sombra del icono para la marca de este tipo de recursos
// Devuelve: 
//		dev[marca,
//			 mGlobo] 	
// Variables locales: 
//		- mGlobo			: nuevo mensaje de información para el globo que se mostrará en este recurso
//		- marca			: marca para el recurso localizado
//		- dev				: lista en la que se devuelven los resultados de la función
// Variables Globales
//		- casa

function auxMarca(i,
						punto,
						mensaGlobo,
						tipoInfo,
						imagen,
						sombra) {

	var mGlobo = "<div class='globos'>"+mensaGlobo+""+
			"<a href='javascript:setDirections("+'"'+punto+'"'+")'>"+
			"Cómo llegar</a>"+"&nbsp;&nbsp;"+
			"<a href='javascript:anyadiraInforme("+i+","+tipoInfo+")'>Añadir a informe</a>"+"</div>";
			// NOTA: 
			//		Los +'"' y '"'+ de más son para que no dé error al pasar por javascript
			//		el LatLng "punto"
	var marca = new crearMiMarca(punto,mGlobo,imagen,sombra);
	marca.setMap(null);
	var dev = [marca,mGlobo];
	return dev;
}
