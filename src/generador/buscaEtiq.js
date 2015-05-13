// ***********************************************************************************************
// ************************      Función buscaEtiq(valor)      ***********************************
// ***********************************************************************************************
//
// Descripción: Devuelve la descripción correspondiente al valor de alguno de estos: 
//              tipo de bloque, unidad mínima, comarcas, vicarías o arciprestazgos.
// Llamada por: 
//    función construyeLeyenda(...) 
// Invoca a:
//    nada
// Recibe: 
//    valor
// Devuelve: 
//    descripción correspondiente a ese valor    
// Variables globales:
//    ninguna

function buscaEtiq(valor) {

   var etiquetas = [
      ["amp","Clasificación en intervalos iguales"],
      ["num","Clasificación en intervalos iguales"],
      ["cuant","Clasificación por cuatiles"],
      ["nat","Clasificación por cortes naturales (Jenks)"],
      ["field_prq_id_comarca_value","Comarca"],
      ["field_prq_id_value","Parroquia"],
      ["field_prq_id_arcip_value","Arciprestazgo"],
      ["field_prq_id_vicaria_value","Vicaria"],
      ["0","Todas las comarcas"],
      ["1","ALT VINALOPO"],
      ["2","CAMP DE TURIA"],
      ["3","EL CAMP DE MORVEDRE"],
      ["4","EL COMTAT"],
      ["5","EL VALLE DE AYORA"],
      ["6","L'ALCOIA"],
      ["7","L'HORTA NORD"],
      ["8","L'HORTA OEST"],
      ["9","L'HORTA SUD"],
      ["10","LA CANAL DE NAVARRES"],
      ["11","LA COSTERA"],
      ["12","LA HOYA DE BUÑOL"],
      ["13","LA MARINA ALTA"],
      ["14","LA RIBERA ALTA"],
      ["15","LA RIBERA BAIXA"],
      ["16","LA SAFOR"],
      ["17","LA VALL D'ALBAIDA"],
      ["18","LOS SERRANOS"],
      ["19","RINCON DE ADEMUZ"],
      ["20","REQUENA-UTIEL"],
      ["21","VALENCIA"],
      ["100","Todas las Vicarías"],
      ["100b","Todas las Vicarías menos I y II"],
      ["101","Vic.I"],
      ["102","Vic.II"],
      ["103","Vic.III"],
      ["104","Vic.IV"],
      ["105","Vic.V"],
      ["106","Vic.VI"],
      ["107","Vic.VII"],
      ["108","Vic.VIII"],
      ["200","Todos los Arciprestazgos"],
      ["201","Arc.1"],
      ["202","Arc.2"],
      ["203","Arc.3"],
      ["204","Arc.4"],
      ["205","Arc.5"],
      ["206","Arc.6"],
      ["207","Arc.7"],
      ["208","Arc.8"],
      ["209","Arc.9"],
      ["210","Arc.10"],
      ["211","Arc.11"],
      ["212","Arc.12"],
      ["213","Arc.13"],
      ["214","Arc.14"],
      ["215","Arc.15"],
      ["216","Arc.16"],
      ["217","Arc.17"],
      ["218","Arc.18"],
      ["219","Arc.19"],
      ["220","Arc.20"],
      ["221","Arc.21"],
      ["222","Arc.22"],
      ["223","Arc.23"],
      ["224","Arc.24"],
      ["225","Arc.25"],
      ["226","Arc.26"],
      ["227","Arc.27"],
      ["228","Arc.28"],
      ["229","Arc.29"],
      ["230","Arc.30"],
      ["231","Arc.31"],
      ["232","Arc.32"],
      ["233","Arc.33"],
      ["234","Arc.34"]
   ];
   
   for (var i=0; i<etiquetas.length; i++) {
      if (etiquetas[i][0] == valor) return etiquetas[i][1];
   }
   
}
