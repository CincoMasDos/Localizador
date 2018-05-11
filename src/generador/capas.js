// ***********************************************************************************************
// ***************************       Funciones:         ******************************************
// ***************************    capaHerramientas()    ******************************************
// ***************************     capaConsultas()      ******************************************
// *************************** capaEtiquetasConsultas() ******************************************
// ***************************      fondoBlanco()       ******************************************
// ***************************      fondoNegro()        ******************************************
// ***************************       controles()        ******************************************
// ***************************     marcasArrastre()      ******************************************
// ***************************      capaLeyenda()       ******************************************
// ***************************     capaFondoLim(id)     ******************************************
// ***************************   auxGrosorLim(grosor)   ******************************************
// ***************************   capaLeyendaLimites()   ******************************************
// ***********************************************************************************************
//
// Descripción: 
//    Funciones que activan y desactivan las capas en el mapa.            
// Llamadas por: 
//    checkboxs del div "capas"
// Invocan a:
//    función ponEtiqueta(...)
//    función ponEtiquetaAux(...)
// Variables globales:
//    - map
//    - controlHerramientas
//    - polisConsulta
//    - etiqConsulta
//    - etiqLeyenda
//    - hayLeyenda
//    - colorLimPrq
//    - grosorLimPrq
//    - colorLimArcip
//    - grosorLimArcip
//    - colorLimVic
//    - grosorLimVic
//    - colorLimComarc
//    - grosorLimComarc
//    - polisFondoPrq
//    - polisFondoArcip
//    - polisFondoVicarias
//    - polisFondoComarcas
//    - hayLeyendaLimites

// *********************** Capa Panel lateral de Herramientas *******************************

function capaHerramientas() {
   if (controlHerramientas) {
      document.getElementById("lateral").style.visibility = 'hidden';
      controlHerramientas = false;
      if (document.getElementById("fondoBlanco").checked) {
         document.getElementById("actDesPanel").src = "imagenes/mostrar_panel2.png";
      }
      else {alert("entra");
         document.getElementById("actDesPanel").src = "imagenes/mostrar_panel.png";
      }
   }
   else {
      document.getElementById("lateral").style.visibility = 'visible';   
      controlHerramientas = true;
      document.getElementById("actDesPanel").src = "imagenes/ocultar_panel.png";
   }
}



// **************** Capa entidades dibujadas resultado de las consultas *************************

function capaConsultas() {
   checkboxCapa = document.getElementById("capaConsultas");
   if (checkboxCapa.checked) {
      for (var i = 0; i < polisConsulta.length; i++) {
         polisConsulta[i].setMap(map);
      }   
   }
   else {
      for (var i = 0; i < polisConsulta.length; i++) {
         polisConsulta[i].setMap(null);
      }   
   
   }
}



// ************* Capa etiquetas de las entidades resultado de las consultas *********************

function capaEtiquetasConsultas() {
   checkboxCapa = document.getElementById("capaEtiquetasConsultas");
   if (checkboxCapa.checked) {
      for (var i = 0; i < etiqConsulta.length; i++) {
        etiqConsulta[i][0].setMap(null);
        var resultados = ponEtiquetaAux(etiqConsulta[i][1],etiqConsulta[i][2],etiqConsulta[i][3]);
        var mensaEtiq = resultados[0];
        var estilo = resultados[1];
        var poli_etiqueta = ponEtiqueta(etiqConsulta[i][0].getPosition(),mensaEtiq,estilo);
        etiqConsulta[i][0] = poli_etiqueta;
      }   
   }
   else {
      for (var i = 0; i < etiqConsulta.length; i++) {
        etiqConsulta[i][0].setMap(null);
      }   
   
   }
}



// *********************** Capa fondo blanco *******************************

function fondoBlanco() {
   checkboxCapa = document.getElementById("fondoBlanco");
   if (checkboxCapa.checked) {
      document.getElementById("fondoNegro").checked = false;
      if (imagenBounds) imagenBounds.setMap(null);
      imagenBounds = new google.maps.GroundOverlay("imagenes/fondoBlanco.png", map.getBounds());
      imagenBounds.setMap(map);      
   }
   else 
      imagenBounds.setMap(null);
}



// *********************** Capa fondo negro *******************************

function fondoNegro() {
   checkboxCapa = document.getElementById("fondoNegro");
   if (checkboxCapa.checked) {
      document.getElementById("fondoBlanco").checked = false;
      if (imagenBounds) imagenBounds.setMap(null);
      imagenBounds = new google.maps.GroundOverlay("imagenes/fondoNegro.png", map.getBounds());
      imagenBounds.setMap(map);      
   }
   else 
      imagenBounds.setMap(null);
}


// ************* Marcas de arrastre *********************

function marcasArrastre() {
   checkboxCapa = document.getElementById("marcasArrastre");
   var checkboxCapa2 = document.getElementById("capaEtiquetasConsultas");
   if (checkboxCapa.checked) {
      if (checkboxCapa2.checked) {
        for (var i = 0; i < etiqConsulta.length; i++) {
          etiqConsulta[i][0].setIcon(imgMarcaArrastrar);
        }
      }
      if (hayLeyenda) {
        etiqLeyenda.setIcon(imgMarcaArrastrar);
      }
      if (hayLeyendaLimites) {
        etiqLeyendaLimites.setIcon(imgMarcaArrastrar);
      }
   }
   else {      
      if (checkboxCapa2.checked) {
        for (var i = 0; i < etiqConsulta.length; i++) {
          etiqConsulta[i][0].setIcon(imgMarcaInvisible);
        }
      }
      if (hayLeyenda) {
        etiqLeyenda.setIcon(imgMarcaInvisible);
      }
      if (hayLeyendaLimites) {
        etiqLeyendaLimites.setIcon(imgMarcaInvisible);
      }
   }
}


// *********************** Capa controles de mapa de Google Maps *******************************

function controles() {
   checkboxCapa = document.getElementById("controles");
   if (checkboxCapa.checked) {
      var misOpciones = {
         disableDefaultUI: false,
         mapTypeControl: true
      };
      map.setOptions(misOpciones);   

   }
   else {
      var misOpciones = {
         disableDefaultUI: true,
         mapTypeControl: false
      };
      map.setOptions(misOpciones);         
   }
}


// ******************* Capa Leyenda de la/s consulta/s realizada/s *******************************

function capaLeyenda() {
   checkboxCapa = document.getElementById("capaLeyenda");
   if (checkboxCapa.checked) {
      etiqLeyenda.setMap(map);
      hayLeyenda = true;
   }
   else {
      etiqLeyenda.setMap(null);
      hayLeyenda = false;   
   }
}



// *********************** Capas de límites terriroriales *******************************

function capaFondoLim(id) {
   checkboxCapa = document.getElementById(id);
   switch (id) {
      case "capaFondoPrq":
         var polis = polisFondoPrq;
         colorLimPrq = document.getElementById("colorLimPrq").value;
         var color = colorLimPrq;
         grosorLimPrq = parseFloat(document.getElementById("grosorLimPrq").value);
         var grosor = grosorLimPrq;
         break;
      case "capaFondoArcip":
         var polis = polisFondoArcip;
         colorLimArcip = document.getElementById("colorLimArcip").value;
         var color = colorLimArcip;
         grosorLimArcip = parseFloat(document.getElementById("grosorLimArcip").value);
         var grosor = grosorLimArcip;
         break;
      case "capaFondoVicarias":
         var polis = polisFondoVicarias;
         colorLimVic = document.getElementById("colorLimVic").value;
         var color = colorLimVic;
         grosorLimVic = parseFloat(document.getElementById("grosorLimVic").value);
         var grosor = grosorLimVic;
         break;
      case "capaFondoComarcas":
         var polis = polisFondoComarcas;
         colorLimComarc = document.getElementById("colorLimComarc").value;
         var color = colorLimComarc;
         grosorLimComarc = parseFloat(document.getElementById("grosorLimComarc").value);
         var grosor = grosorLimComarc;
         break;
   }
   if (checkboxCapa.checked) {
      for (var i = 0; i < polis.length; i++) {
         polis[i].setMap(null);
         polis[i].setOptions({
            strokeColor: color,
            strokeWeight: grosor
         });
         polis[i].setMap(map);
      }   
   }
   else {
      for (var i = 0; i < polis.length; i++) {
         polis[i].setMap(null);
      }   
   
   }
}



// ******************* Capa leyenda de los límites territoriales *******************************

function auxGrosorLim(grosor) {
   switch (grosor) {
      case 0.5: grosor = 1; break;
      default: grosor = grosor + 1;
   }
   return grosor;
}

function capaLeyendaLimites() {
   checkboxCapa = document.getElementById("capaLeyendaLimites");
   if (checkboxCapa.checked) {
      if (document.getElementById("capaFondoPrq").checked
         || document.getElementById("capaFondoArcip").checked
         || document.getElementById("capaFondoVicarias").checked
         || document.getElementById("capaFondoComarcas").checked) {
         
         if (etiqLeyendaLimites) {
            var punto = etiqLeyendaLimites.getPosition();
            etiqLeyendaLimites.setMap(null);
         }
         else { 
            var punto = map.getCenter();
         }
            
         var leyendaLimites = "<div class='leyenda_grande'><b>Límites:</b><hr>";
         if (document.getElementById("capaFondoPrq").checked) {
            leyendaLimites = leyendaLimites + 
                  "<div><div class='leyenda_colores_limites' style='"+
                  "background-color:"+colorLimPrq+"; "+
                  "height:"+auxGrosorLim(grosorLimPrq)+";'></div>"+
                  "<div class='leyenda_texto_limites'>Parroquias</div></div>";
         }
         if (document.getElementById("capaFondoArcip").checked) {
            leyendaLimites = leyendaLimites + 
                  "<div><div class='leyenda_colores_limites' style='"+
                  "background-color:"+colorLimArcip+"; "+
                  "height:"+auxGrosorLim(grosorLimArcip)+";'></div>"+
                  "<div class='leyenda_texto_limites'>Arciprestazgos</div></div>";
         }
         if (document.getElementById("capaFondoVicarias").checked) {
            leyendaLimites = leyendaLimites + 
                  "<div><div class='leyenda_colores_limites' style='"+
                  "background-color:"+colorLimVic+"; "+
                  "height:"+auxGrosorLim(grosorLimVic)+";'></div>"+
                  "<div class='leyenda_texto_limites'>Vicarías</div></div>";
         }
         if (document.getElementById("capaFondoComarcas").checked) {
            leyendaLimites = leyendaLimites + 
                  "<div><div class='leyenda_colores_limites' style='"+
                  "background-color:"+colorLimComarc+"; "+
                  "height:"+auxGrosorLim(grosorLimComarc)+";'></div>"+
                  "<div class='leyenda_texto_limites'>Comarcas</div></div>";
         }
         leyendaLimites = leyendaLimites + "</div>";
         etiqLeyendaLimites = ponEtiqueta(punto,leyendaLimites,"etiqLeyendaLimites");
         hayLeyendaLimites = true;
      }
   }
   else if (hayLeyendaLimites) {
      etiqLeyendaLimites.setMap(null);
      hayLeyendaLimites = false;
   }

}
