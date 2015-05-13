// ***********************************************************************************************
// *************************         Funciones:           ****************************************
// *************************     anyadePolisIsla(...)     ****************************************
// *************************       anyadeParte(...)       ****************************************
// ***********************************************************************************************
//
// Descripción: 
//    Funciones que añaden al path de la entidad que se está constuyendo, la parte de un
//    polígono isla (si existe) o la parte de otro polígono que también forme parte de esa
//    entidad (también en el caso de que exista)            
// Llamadas por: 
//    función descarga_arcips()
//    función descarga_vicarias()
//    función descarga_comarcas()
// Invocan a:
//    nada
// Variables globales:
//    ninguna


function anyadePolisIsla(i,
                         paths,
                         id,
                         n_hijos,
                         polis_padre,
                         ptss) {
   
   var ocu = 0;
   
   for (var j=0; j < ptss.length; j++) {
      if (polis_padre[j] == id) {
         ocu++;
         paths.push(ptss[j]);
         if (ocu == n_hijos) {
            break;
         }                        
      }
   }   
   return paths;
}


function anyadeParte(i,
                     paths,
                     n_polis,
                     tipos_poli,
                     ids_arcip,
                     ns_hijos,
                     polis_padre,
                     ptss,
                     limitesMax,
                     limitesMin,
                     limiteMax,
                     limiteMin) {
                     
   var ocu = 0;
   var latMax = limiteMax.lat();
   var lngMax = limiteMax.lng();
   var latMin = limiteMin.lat();
   var lngMin = limiteMin.lng();
   
   for (var j=0; j < ptss.length; j++) {
      if (tipos_poli[j] == 2 && ids_arcip[j] == ids_arcip[i]) {
         ocu++;
         paths.push(ptss[j]);
         if (limitesMax[j].lat() > latMax) {latMax = limitesMax[j].lat();}
         if (limitesMax[j].lng() > lngMax) {lngMax = limitesMax[j].lng();}
         if (limitesMin[j].lat() < latMin) {latMin = limitesMin[j].lat();}
         if (limitesMin[j].lng() < lngMin) {lngMin = limitesMin[j].lng();}
         
         if (ns_hijos[j] != 0) {
            paths = anyadePolisIsla(j,
                                    paths,
                                    ids[j],
                                    ns_hijos[j],
                                    polis_padre,
                                    ptss);
         }
         if (ocu == n_polis) {
            break;
         }                     
      }
   }
   limiteMax = new google.maps.LatLng(latMax,lngMax);
   limiteMin = new google.maps.LatLng(latMin,lngMin);

   return [paths,limiteMax,limiteMin];
   
}
