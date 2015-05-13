// ***********************************************************************************************
// **********************      Función dibujaEntidades(...)      *********************************
// ***********************************************************************************************
//
// Descripción: 
//    Dibuja las entidades resultado de las consultas y sus correspondientes etiquetas
// Llamada por: 
//    función consultaBD()
// Invoca a:
//    función listenerAbrirGlobo(...)
// Recibe: 
//    - k
//    - id
//    - TotalVariable
//    - desUdMinima
//    - textovar
//    - polis
//    - bloques
//    - paraInforme
//    - color
//    - desc
// Devuelve: 
//    nada    
// Variables globales:
//    - modoConsulta
//    - polisConsulta
//    - etiqConsulta
//    - bounds
//    - map

function dibujaEntidades(k,
                         id,
                         TotalVariable,
                         desUdMinima,
                         textovar,
                         polis,
                         bloques,
                         paraInforme,
                         color,
                         desc) {
                         
   if (modoConsulta == "bloque") {
      var color = bloques[k][1];
   }
                         
   for (j = 0; j < polis.length; j++) {
      if (polis[j][0] == id) {
         if (modoConsulta == "bloque") {
            bloques[k][2].push(id);
            bloques[k][3].push(TotalVariable);
            bloques[k][4].push(polis[j][5]); //Nombre
         }
         polis[j][1].setOptions({
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.75
         });
         
         if (modoConsulta == "individual") {
            paraInforme.push([id,TotalVariable,polis[j][5]]);
                                                     //Nombre         
         }
         
         if (modoConsulta =="situaciones") {
            paraInforme.push([id,desc,polis[j][5]]);
            listenerAbrirGlobo(polis[j][1],
                        "<div class='globos'><b>"+desUdMinima+":</b><br>"+
                        id+". "+polis[j][5]+"<br>"+
                        "<b>"+frecuSitu+" Situaciones más frecuentes</b>: <br>"+
                        desc+"</div>");
         }
         else {
            listenerAbrirGlobo(polis[j][1],
               "<div class='globos'><b>"+desUdMinima+":</b><br>"+
               id+". "+polis[j][5]+"<br>"+
               "<b>"+textovar+"</b>: <br>"+
               TotalVariable+"</div>");
         }
                     
         polis[j][1].setMap(map);
         polisConsulta.push(polis[j][1]);
         
         if (modoConsulta =="situaciones") {
            var devolucion = ponEtiquetaAux(id,polis[j][5],desc);
         }
         else {            
            var devolucion = ponEtiquetaAux(id,polis[j][5],TotalVariable);
         }
         var mensaEtiq = devolucion[0];
         var estilo = devolucion[1];

         var poli_etiqueta = ponEtiqueta(polis[j][4],mensaEtiq,estilo);
         poli_etiqueta.setMap(null);
         
         if (modoConsulta =="situaciones") {
            etiqConsulta.push([poli_etiqueta,id,polis[j][5],desc]);
         }
         else {            
            etiqConsulta.push([poli_etiqueta,id,polis[j][5],TotalVariable]);
         }
                              
         bounds.extend(polis[j][2]);
         bounds.extend(polis[j][3]);
      }
   }
}
