// ***********************************************************************************************
// *******************      Función descarga_prqs_generador()      *******************************
// ***********************************************************************************************
//
// Descripción: 
//    Lee el xml que contiene los datos necesarios para construir las entidades poligonales
//    de parroquias, forma los correspondientes polígonos y los almacena en las dos listas
//    globales: "polis_prqs" (para los polígonos que se dibujarán tras las consultas
//    a la base de datos) y "polisFondoPrq" (para los polígonos que materializarán los límites
//    territoriales de las parroquias.
// Llamada por: 
//    función load()
// Invoca a:
//    función descargaUrl(...)
//    función limitesPolyXML(...)
//    función listenerAbrirGlobo(...)
// Recibe: 
//    nada
// Devuelve: 
//    nada    
// Variables globales:
//    - polis_prqs
//    - polisFondoPrq


function descarga_prqs_generador() {

	descargaUrl("php/phpsqlgenxml_generador_geo.php?tipo=parroquias", function(data) {
		var xml = data.responseXML;

		// Lee las polilíneas "parroquia"
		var parroquias = xml.documentElement.getElementsByTagName("parroquia");

		// Lee cada línea "parroquia" en "parroquias"
		for (var a = 0; a < parroquias.length; a++) {
	
			// Guarda los atributos de cada "parroquia"
			var id = parroquias[a].getAttribute("id_parroquia");
			var nombre = parroquias[a].getAttribute("nombre");
			var lat = parroquias[a].getAttribute("lat");
			var lng = parroquias[a].getAttribute("lng");
			var loc = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
			var coordenadas = parroquias[a].getAttribute("coordenadas");

			// Construye la lista de puntos "pts" y determina el punto de mayor latlng y el de menor 
			var resultados = limitesPolyXML(coordenadas);
			var pts = resultados[0];
			var limiteMax = resultados[1];
			var limiteMin = resultados[2];

			// Crea un polígono con la lista de puntos "pts"
			var poligono = new google.maps.Polygon({
				paths: pts,
				strokeColor: "#FF3300",
				strokeOpacity: 1,
				strokeWeight: 2,
				fillColor: "#66FF33",
				fillOpacity: 0.3,
				zIndex: 0
			});
			
			var poli = [id,
							poligono,
							limiteMax,
							limiteMin,
							loc,
							nombre];
			polis_prqs.push(poli);

			var poli_fondo = new google.maps.Polygon({
				paths: pts,
				strokeColor: "#000000",
				strokeOpacity: 1,
				strokeWeight: 0.5,
				fillColor: "#000000",
				fillOpacity: 0,
				zIndex: 1
			});
			listenerAbrirGlobo(poli_fondo,
				"<b>Parroquia: </b><br>"+
					+id+". "+nombre);
			polisFondoPrq.push(poli_fondo);
			
		}//for 

	});

}
