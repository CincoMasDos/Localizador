// ***********************************************************************************************
// **********************      Función descarga_comarcas()      **********************************
// ***********************************************************************************************
//
// Descripción: 
//    Lee el xml que contiene los datos necesarios para construir las entidades poligonales
//    de comarcas, forma los correspondientes polígonos y los almacena en las dos listas
//    globales: "polis_comarcas" (para los polígonos que se dibujarán tras las consultas
//    a la base de datos) y "polisFondoComarcas" (para los polígonos que materializarán los
//    límites territoriales de las comarcas.
// Llamada por: 
//    función load()
// Invoca a:
//    función descargaUrl(...)
//    función limitesPolyXML(...)
//    función anyadePolisIsla(...)
//    función anyadeParte(...)
//    función listenerAbrirGlobo(...)
// Recibe: 
//    nada
// Devuelve: 
//    nada    
// Variables globales:
//    - polis_comarcas
//    - polisFondoComarcas


function descarga_comarcas() {

	var i;
	var ids = new Array();
	var ids_comarca = new Array();
	var nombres = new Array();
	var ptos_etiquetas = new Array();
	var tipos_poli = new Array();
	var ns_polis = new Array();
	var ns_hijos = new Array();
	var polis_padre = new Array();
	var ptss = new Array();
	var limitesMax = new Array();
	var limitesMin = new Array();
	var paths;	//Almacena la forma de una Comarca
	var path;
	var resultados;

	descargaUrl("php/phpsqlgenxml_generador_geo.php?tipo=comarcas", function(data) {
		var xml = data.responseXML;

		// Lee las polilíneas "comarca"
		var comarcas = xml.documentElement.getElementsByTagName("comarca");

		// Lee cada línea "comarca" en "comarcas"
		for (i = 0; i < comarcas.length; i++) {
	
			// Guarda los atributos de cada "comarca"
			var id = parseFloat(comarcas[i].getAttribute("id"));		// id del reg en la BD
			var id_comarca = parseFloat(comarcas[i].getAttribute("id_comarca"));
			var nombre = comarcas[i].getAttribute("nombre");
			var lat_etiqueta = parseFloat(comarcas[i].getAttribute("lat_etiqueta"));
			var lng_etiqueta = parseFloat(comarcas[i].getAttribute("lng_etiqueta"));
				var pto_etiqueta = new google.maps.LatLng(lat_etiqueta,lng_etiqueta);
			var tipo_poli = parseFloat(comarcas[i].getAttribute("tipo_poli"));
			var n_polis = parseFloat(comarcas[i].getAttribute("n_polis"));
			var n_hijos = parseFloat(comarcas[i].getAttribute("n_hijos"));
			var poli_padre = parseFloat(comarcas[i].getAttribute("poli_padre"));
			var coordenadas = comarcas[i].getAttribute("coordenadas");

			// Construye la lista de puntos "pts" y determina el punto de mayor latlng y el de menor 
			var resultados = limitesPolyXML(coordenadas);
			var pts = resultados[0];
			var limiteMax = resultados[1];
			var limiteMin = resultados[2];

			// Añade a la lista local de partes de Comarcas
			// las variables a almacenar de cada comarca
			ids.push(id);
			ids_comarca.push(id_comarca);
			nombres.push(nombre);
			ptos_etiquetas.push(pto_etiqueta);
			tipos_poli.push(tipo_poli);
			ns_polis.push(n_polis);
			ns_hijos.push(n_hijos);
			polis_padre.push(poli_padre);
			ptss.push(pts);
			limitesMax.push(limiteMax);
			limitesMin.push(limiteMin);	
			
		}//for
		
		for (i = 0; i < ids.length; i++) {
			limiteMax = limitesMax[i];
			limiteMin = limitesMin[i];
			paths = new Array();
			latMax = 0;
			lngMax = 0;
			latMin = 0;
			lngMin = 0;
			switch (tipos_poli[i]) {
				case 0: // comarca formado por un solo poligono (aunque puede contener un polig isla)
					paths.push(ptss[i]);
					if (ns_hijos[i] != 0) {
						paths = anyadePolisIsla(i,
														paths,
														ids[i],
														ns_hijos[i],
														polis_padre,
														ptss);						 
					}
					break;
				case 1:
					paths.push(ptss[i]);
					if (ns_hijos[i] != 0) {
						paths = anyadePolisIsla(i,
														paths,
														ids[i],
														ns_hijos[i],
														polis_padre,
														ptss);	
					}
					resultados = anyadeParte(i,
													 paths,
													 ns_polis[i],
													 tipos_poli,
													 ids_comarca,
													 ns_hijos,
													 polis_padre,
													 ptss,
													 limitesMax,
													 limitesMin,
													 limiteMax,
													 limiteMin);	
					paths = resultados[0];
					limiteMax = resultados[1];
					limiteMin = resultados[2];
					break;
			}
			if (tipos_poli[i] == 0 || tipos_poli[i] == 1) {
				var poligono = new google.maps.Polygon({
					paths: paths,
					strokeColor: "#FF7800",
					strokeOpacity: 1,
					strokeWeight: 2,
					fillColor: "#46461F",
					fillOpacity: 0.25,
					zIndex: 0
				});

				var poli = [ids_comarca[i],
				            poligono,
				            limiteMax,
				            limiteMin,
				            ptos_etiquetas[i],
				            nombres[i]];
				polis_comarcas.push(poli);
				
				var poli_fondo = new google.maps.Polygon({
					paths: paths,
					strokeColor: "#000000",
					strokeOpacity: 1,
					strokeWeight: 0.5,
					fillColor: "#000000",
					fillOpacity: 0,
					zIndex: 4
				});
				listenerAbrirGlobo(poli_fondo,
					"<b>Comarca: </b><br>"+nombres[i]);
				polisFondoComarcas.push(poli_fondo);
			}
		}//for

	});

}
