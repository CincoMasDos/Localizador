// **********************************************************************************************
// **********************      Función construyeLeyenda(...)      ********************************
// ***********************************************************************************************
//
// Descripción: Construye la leyenda de la consulta y la coloca en el mapa.
//              También genera el informe de la consulta//              
// Llamada por: 
//    función consultaBD()   
// Invoca a:
//    función buscaEtiq(...)
//    función ponTextoVar(...)
//    función separadorMiles(...)
//    función ponEtiqueta(...)
// Variables globales:
//    - udMinima
//    - texto
//    - GVF
//    - hayLeyenda
//    - anyadir_consulta
//    - etiqLeyenda

function construyeLeyenda(bloques,
                          resultIndiv,
                          operador,
                          valor,
                          color) {
   
   // Almacena la descripción de la unidad mínima
   var udMin = buscaEtiq(udMinima);
   
   // Construye la descripción del área de estudio
   var areas = "";
   var areasEstudio = document.getElementById("selectAreaDeEstudio");
   for (var i=0; opt=areasEstudio.options[i]; i++) {
      if (opt.selected) { 
         areas = areas + buscaEtiq(opt.value) +" ";
      }
   }
   

   // *********** Construcción de la leyenda para las consultas en bloque  ******************

   if (modoConsulta == "bloque") {
   
      if (hayLeyenda) {
         etiqLeyenda.setMap(null);
      }
   
      for (var i=0; i<variables.length; i++) {
      
         if (variables[i][0] == variable) {
         
            var textovar = ponTextoVar(variables[i][0],variables[i][1]);   
            
            if (tipoBloque == "nat") var GVFtext = "GVF = "+GVF.toFixed(4)+"<br>";
            else var GVFtext = "";
                  
            // Inicio del contenido de la leyenda en el mapa
            texto = "<div class='leyenda_grande'><b>Leyenda:</b><hr>"+
               "<div class='cajas'><b>Ud.de análisis:</b> "+udMin+"<br>"+
               "<b>Área estudio:</b> "+areas+"<br>"+buscaEtiq(tipoBloque)+"<br>"+GVFtext+"<br>"+
               ""+textovar+"<br></div>";
            // Inicio de los detalles para el informe
            var detalles = "<h2>Informe:</h2><hr><br><b>Ud.de análisis:</b> "+udMin+"<br>"+
               "<b>Área estudio:</b> "+areas+"<br>"+buscaEtiq(tipoBloque)+"<br>"+
               GVFtext+"<br>"+textovar+"<br><br>"+
               "<table border='1' style='font-size: 0.95em;' cellspacing='0' cellpadding='5'>"+
               "<tr><th><b>Intervalo</b></th><th><b>Id</b></th>"+
               "<th><b>Nombre</b></th><th><b>Valor</b></th></tr>";
            break;   
            
         }
         
      }   
      
      for (var i=0; i<bloques.length; i++) {
      
         num2 = separadorMiles(bloques[i][0][1]);   
         
         // Continuación de los detalles para el informe
         if (bloques[i][2].length !=0) {
            detalles = detalles + "<tr><td align=center rowspan='"+bloques[i][2].length+"'><b>"+
               +separadorMiles(bloques[i][0][0])+" - "+num2+"</b><br></td>";
         }
         else {
            detalles = detalles + "<tr><td align=center><b>"+
               +separadorMiles(bloques[i][0][0])+" - "+num2+"</b><br></td>"+
               "<td align=center colspan='3'>Ningún resultado</td></tr>";
         }
         
         if (bloques[i][2].length !=0) {
            for (var j=0; j<bloques[i][2].length; j++) {
               valorBloq = separadorMiles(bloques[i][3][j]);
               if (j==0) {
                  detalles = detalles + "<td align=center>"+bloques[i][2][j]+"</td>"+
                                        "<td>"+bloques[i][4][j]+"</td>"+
                                        "<td align=center>"+valorBloq+"</td></tr>";
               }
               else {
                  detalles = detalles + "<tr><td align=center>"+bloques[i][2][j]+"</td>"+
                                        "<td>"+bloques[i][4][j]+"</td>"+
                                        "<td align=center>"+valorBloq+"</td></tr>";
               }
            }
         }
         
         // Continuación del contenido de la leyenda en el mapa
         texto = texto + "<div class='leyenda_colores' style='background-color:"+
                                 bloques[i][1]+"'></div>"+
                                 "<div class='leyenda_texto'>"+
                                 ""+separadorMiles(bloques[i][0][0])+" - "+num2+"</div>";
      }
      detalles = detalles + "</table><br><br>";
      texto = texto + "</div>";
   
      document.getElementById("informe").innerHTML = detalles;
      
      etiqLeyenda = ponEtiqueta(map.getCenter(),texto,"etiqLeyenda");
      hayLeyenda = true;

   }
   
   
   // *********** Construcción de la leyenda para las consultas individuales  ******************
   
   else if (modoConsulta == "individual") {
   
      var detallesValores = "<table border='1' "+
                            "       style='font-size: 0.95em;' "+
                            "       cellspacing='0' cellpadding='5'>"+
               "<tr><th><b>Id</b></th><th><b>Nombre</b></th><th><b>Valor</b></th></tr>";
      
      for (var i=0; i<resultIndiv.length; i++) {      
         valorInd = separadorMiles(resultIndiv[i][1]);
         detallesValores = detallesValores + 
                              "<tr><td align=center>"+resultIndiv[i][0]+"</td>"+
                              "<td>"+resultIndiv[i][2]+"</td>"+
                              "<td align=center>"+valorInd+"</td></tr>";      
      }
      detallesValores = detallesValores + "</table><br><br>";
   
      for (var i=0; i<variables.length; i++) {
      
         if (variables[i][0]==variable) {
         
            var textovar = ponTextoVar(variables[i][0],variables[i][1]);
   
            if (anyadir_consulta) {
               texto = texto + "<div class='leyenda_grande'>"+
                  "<div class='cajas'><b>Ud.de análisis:</b> "+udMin+"<br>"+
                  "<b>Área estudio:</b> "+areas+"</div><br>"+
                  ""+textovar+"<br>";
               var detalles = "<b>Ud.de análisis:</b> "+udMin+"<br>"+
                  "<b>Área estudio:</b> "+areas+"<br><br>"+
                  textovar+" "+operador+" "+separadorMiles(valor)+"<br><br>"+detallesValores;
            }
            else {
               document.getElementById("informe").innerHTML = "";
               texto = "<div class='leyenda_grande'><b>Leyenda:</b><hr>"+
                  "<div class='cajas'><b>Ud.de análisis:</b> "+udMin+"<br>"+
                  "<b>Área estudio:</b> "+areas+"</div><br>"+
                  ""+textovar+"<br>";
               var detalles = "<h2>Informe:</h2><hr><b>Ud.de análisis:</b> "+udMin+"<br>"+
                  "<b>Área estudio:</b> "+areas+"<br><br>"+
                  textovar+" "+operador+" "+separadorMiles(valor)+"<br><br>"+detallesValores;
            }
            break;   
         }
      }
      
      if (operador == "[,]") {
         var partesValor = valor.split("-");
         texto = texto +"<div class='leyenda_colores' style='background-color:"+color+"'></div>"+
            "<div class='leyenda_texto'>"+
            separadorMiles(partesValor[0])+" - "+separadorMiles(partesValor[1])+
            "</div></div>";
      }
      else {
         texto = texto +"<div class='leyenda_colores' style='background-color:"+color+"'></div>"+
            "<div class='leyenda_texto'>"+operador+" "+separadorMiles(valor)+"</div></div>";
      }
   
      document.getElementById("informe").innerHTML+= detalles;
      
      if (anyadir_consulta) {
         var punto = etiqLeyenda.getPosition(); 
         etiqLeyenda.setMap(null);
      }
      else {
         var punto = map.getCenter();
      }
      
      etiqLeyenda = ponEtiqueta(punto,texto,"etiqLeyenda");
      hayLeyenda = true;
      
      if (!anyadir_consulta) anyadir_consulta = true;

   }

   
   // *********** Construcción de la leyenda para las consultas de situaciones  ******************
   
   else if (modoConsulta == "situaciones") {
   
      if (hayLeyenda) {
         etiqLeyenda.setMap(null);
      }
   
      var detallesValores = "<table border='1' "+
                            "       style='font-size: 0.95em;' "+
                            "       cellspacing='0' cellpadding='5'>"+
               "<tr><th><b>Id</b></th><th><b>Nombre</b></th><th><b>Valor</b></th></tr>";
               
      for (var i=0; i<resultIndiv.length; i++) {
         detallesValores = detallesValores + 
                           "<tr><td align=center>"+resultIndiv[i][0]+"</td>"+
                           "<td>"+resultIndiv[i][2]+"</td>"+
                           "<td>"+resultIndiv[i][1]+"</td></tr>";   
      }
      detallesValores = detallesValores + "</table><br><br>";

      var detalles = "<h2>Informe:</h2><hr><b>Ud.de análisis:</b> "+udMin+"<br>"+
            "<b>Área estudio:</b> "+areas+"<br><br>"+
            frecuSitu+" SITUACIONES MÁS FRECUENTES<br><br>"+detallesValores;


      texto = "<div class='leyenda_grande'><b>Leyenda:</b><hr>"+
                  "<div class='cajas'><b>Ud.de análisis:</b> "+udMin+"<br>"+
                  "<b>Área estudio:</b> "+areas+"</div><br>"+
                  frecuSitu+" SITUACIONES MÁS FRECUENTES<br>";

      for (var i = 0; i < descSituaciones.length; i++) {
         texto = texto +
            "<div class='leyenda_colores' style='background-color:"+coloresSitu[i]+"'></div>"+
            "<div class='leyenda_texto'>"+descSituaciones[i]+"</div>";
      }
      texto = texto + "</div>";
   
      document.getElementById("informe").innerHTML = "";
      document.getElementById("informe").innerHTML+= detalles;
      
      var punto = map.getCenter();
      
      etiqLeyenda = ponEtiqueta(punto,texto,"etiqLeyendaSitu");
      hayLeyenda = true;
      
      if (!anyadir_consulta) anyadir_consulta = true;

   }
   
}

