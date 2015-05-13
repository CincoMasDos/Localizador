// *************************************************************************************************
// *************************      listenerAbrirGlobo(...)    ***************************************
// *************************************************************************************************
// 
// Descripción: función que facilita, mediante un listener, que al hacer click sobre un polígono se 
//					 memorice el centro del mapa y se habra un globo, con la info recibida, en el punto
//					 donde se ha hecho el click. También establece en true la variable que controla si
//					 hay un globo abierto
// Llamada por: 
// 	Función localizaPuntosEnAreas(...)
// Invoca a:
//		nada
// Recibe:
//		- poly	: objeto polígono sobre el que se actúa
//		- mGlobo	: info recibida para mostrar en globo
// Devuelve: 
//		nada 	
// Variables locales: 
//		ninguna
// Variables Globales
//		- centro
//		- infoGlobo
//		- map
//		- Globo

function listenerAbrirGlobo(poly,mGlobo) {
	google.maps.event.addListener(poly, "click", function(event) {
		centro = map.getCenter();
		var lat = event.latLng.lat().toFixed(6);
		var lng = event.latLng.lng().toFixed(6);
		infoGlobo.setContent(mGlobo);
		//infoGlobo.setContent(mGlobo+" "+lat+""+lng);
		infoGlobo.setPosition(event.latLng);
		infoGlobo.open(map);
		Globo = true;
	});
}
