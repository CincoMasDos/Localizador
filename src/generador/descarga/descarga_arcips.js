// ***********************************************************************************************
// ***********************      Función descarga_arcips()      ***********************************
// ***********************************************************************************************
//
// Descripción: 
//    Lee el xml que contiene los datos necesarios para construir las entidades poligonales
//    de arciprestazgos, forma los correspondientes polígonos y los almacena en las dos 
//    listas globales: "polis_arcips" (para los polígonos que se dibujarán tras las consultas
//    a la base de datos) y "polisFondoArcip" (para los polígonos que materializarán los límites
//    territoriales de los arciprestazgos.
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
//    - polis_arcips
//    - polisFondoArcip

function descarga_arcips() {

   var i;
   var ids = new Array();
   var nombres = new Array();
   var ids_arcip = new Array();
   var ptos_etiquetas = new Array();
   var tipos_poli = new Array();
   var ns_polis = new Array();
   var ns_hijos = new Array();
   var polis_padre = new Array();
   var ptss = new Array();
   var limitesMax = new Array();
   var limitesMin = new Array();
   var paths;   //Almacena la forma de un arciprestazgo
   var path;
   var resultados;

   descargaUrl("php/phpsqlgenxml_generador_geo.php?tipo=arciprestazgos", function(data) {
      var xml = data.responseXML;

      // Lee las polilíneas "arcip"
      var arcips = xml.documentElement.getElementsByTagName("arcip");

      // Lee cada línea "arcip" en "arcips"
      for (i = 0; i < arcips.length; i++) {
   
         // Guarda los atributos de cada "arcip"
         var id = parseFloat(arcips[i].getAttribute("id"));  // id del reg en la BD
         var nombre = arcips[i].getAttribute("nombre");
         var id_arcip = parseFloat(arcips[i].getAttribute("id_arcip"));
         var lat_etiqueta = parseFloat(arcips[i].getAttribute("lat_etiqueta"));
         var lng_etiqueta = parseFloat(arcips[i].getAttribute("lng_etiqueta"));
            var pto_etiqueta = new google.maps.LatLng(lat_etiqueta,lng_etiqueta);
         var tipo_poli = parseFloat(arcips[i].getAttribute("tipo_poli"));
         var n_polis = parseFloat(arcips[i].getAttribute("n_polis"));
         var n_hijos = parseFloat(arcips[i].getAttribute("n_hijos"));
         var poli_padre = parseFloat(arcips[i].getAttribute("poli_padre"));
         var coordenadas = arcips[i].getAttribute("coordenadas");

         // Construye la lista de puntos "pts" y determina el punto de mayor latlng y el de menor 
         var resultados = limitesPolyXML(coordenadas);
         var pts = resultados[0];
         var limiteMax = resultados[1];
         var limiteMin = resultados[2];

         // Añade a la lista local de partes de arciprestazgos
         // las variables a almacenar de cada arcip
         ids.push(id);
         nombres.push(nombre);
         ids_arcip.push(id_arcip);
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
            case 0: // arcip formado por un solo poligono (aunque puede contener un polig isla)
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
                                        ids_arcip,
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

            var poli = [ids_arcip[i],
                        poligono,
                        limiteMax,
                        limiteMin,
                        ptos_etiquetas[i],
                        nombres[i]];
            polis_arcips.push(poli);
            
            var poli_fondo = new google.maps.Polygon({
               paths: paths,
               strokeColor: "#000000",
               strokeOpacity: 1,
               strokeWeight: 0.5,
               fillColor: "#000000",
               fillOpacity: 0,
               zIndex: 2
            });
            listenerAbrirGlobo(poli_fondo,
               "<b>Arciprestazgo: </b><br>"+
               +ids_arcip[i]+". "+nombres[i]);
            polisFondoArcip.push(poli_fondo);
         }
      }//for

   });

}
