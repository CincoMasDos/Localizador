// ***********************************************************************************************
// ***************************      Función consultaBD      **************************************
// ***********************************************************************************************
//
// Descripción: Función que genera la consulta a la base de datos y llama a las funciones que lo
//              dibujan en el mapa y generan la leyenda y el informe.
// Llamada por: 
//    Botones input de realizar consultas
// Invoca a:
//    función limpiamapa()
//    función estableceRGB()
//    función descargaUrl(...)
//    función fnum(...)
//    función redondea(...)
//    función getJenks(...)
//    función calculaGVF(...)
//    función construyeLeyenda(...)
//    función dibujaEntidades(...)
// Recibe: 
//    nada
// Devuelve: 
//    nada    
// Variables globales:
//    - modoConsulta
//    - operador
//    - ejecutarConsulta
//    - udMinima
//    - areasEstudioSel
//    - colorLimPrq
//    - colorLimArcip
//    - colorLimVic
//    - colorLimComarc
//    - tipoDato
//    - variable
//    - tipoBloque
//    - intervalo
//    - color1
//    - color2
//    - color1RGB
//    - color2RGB
//    - ejecutarConsulta
//    - valor
//    - color
//    - frecuSitu
//    - coloresSitu
//    - colorSitu1
//    - colorSitu2
//    - colorSitu3
//    - colorSitu4
//    - colorSitu5
//    - colorSitu6
//    - colorSitu7
//    - colorSitu8
//    - colorSitu9
//    - colorSitu10
//    - variables

function consultaBD() {

   // Establecemos en "true" la variable que controla si continuamos ejecutando la consulta
   ejecutarConsulta = true;
   
   // Recogemos el valor de la unidad mínima de análisis
   udMinima = document.getElementById("selectUnidadMinima").value;
   
   // Almacenamos todas las opciones del selector de Áreas de estudio   
   var areasEstudio = document.getElementById("selectAreaDeEstudio");
   
   // Vaciamos la lista que almecenará las opciones seleccionadas
   areasEstudioSel.length = 0;
   
   // Recorremos las opciones del selector de Áreas de estudio y si la opción está seleccionada,
   // la añadimos a la lista "areasEstudioSel"
   for (var i=0; opt=areasEstudio.options[i]; i++) {
      if (opt.selected) {
         switch (opt.value) {
            case "0":
               for (var j=1; j<=21; j++) {
                  areasEstudioSel.push(j+"");
               }
               break;
         
            case "100":
               for (var j=101; j<=108; j++) {
                  areasEstudioSel.push(j+"");
               }
               break;
         
            case "100b":
               for (var j=103; j<=108; j++) {
                  areasEstudioSel.push(j+"");
               }
               break;
         
            case "200":
               areasEstudioSel.length = 0;
               for (var j=201; j<=234; j++) {
                  areasEstudioSel.push(j+"");
               }
               break;
               
            case "200b":
               areasEstudioSel.length = 0;
               for (var j=210; j<=234; j++) {
                  areasEstudioSel.push(j+"");
               }
               break;
         
            default:         
               areasEstudioSel.push(opt.value);
               break;
         }
      }
   }// fin recorremos las opciones del selector de Áreas de estudio
   
   
   // Si no se ha seleccionado ninguna opción del selector de Áreas de estudio,
   // lanza un mensaje de alerta
   if (areasEstudioSel.length == 0) {
      alert("Has de seleccionar el Área de estudio");
   }
   
   // Si hay opciones seleccionadas, continuamos la realización de la consulta
   else {
   
      //Recogemos los colores excogidos para las lineas de límite
      colorLimPrq = document.getElementById("colorLimPrq").value;
      colorLimArcip = document.getElementById("colorLimArcip").value;
      colorLimVic = document.getElementById("colorLimVic").value;
      colorLimComarc = document.getElementById("colorLimComarc").value;   
      
      // Dependiendo del tipo de consulta, recogemos los correspondientes valores que intervendrán
      // en ella y generamos la url que llamará al php que genera el xml con sus resultados
            
      // Si es una consulta "en bloque"                 
      if (modoConsulta == "bloque") {
      
         // Limpiamos las consultas existentes en el mapa y en el informe
         limpiamapa();
         
         // Recogemos los valores que intervendrán en la consulta
         tipoDato = document.getElementById("tipoDatoEnBloque").value; 
         variable = document.getElementById("variableEnBloque").value;
         tipoBloque = document.getElementById("tipoBloque").value;
         intervalo = validaInput(document.getElementById("intervalo").value);
         color1 = document.getElementById("color1").value;
         color2 = document.getElementById("color2").value;
         
         // Almacenamos sus correspondientes valores RGB
         color1RGB = estableceRGB(color1);
         color2RGB = estableceRGB(color2);
         
         // Y generamos la url que llamará al php
         var searchUrl = "php/phpsqlgenxml_generador_consultas.php?udMinima="+udMinima+
                  "&area="+areasEstudioSel+
                  "&tipoDato="+tipoDato+
                  "&variable="+variable+
                  "&operador=>=&valor=0";
         
         // Si el número de intervalos es menor que 2, lanza un mensaje de alerta y pone en
         // "false" la variable que controla si ejecutamos la consulta
         if (tipoBloque != "amp" && intervalo < 2) {
            alert("El número de intervalos ha de ser al menos 2");
            ejecutarConsulta = false;
         }

      }// fin si es "en bloque"
      
      // Si es una consulta "individual" 
      else if (modoConsulta == "individual") {
      
         // Si la consulta no la vamos a añadir a las anteriores,
         // limpiamos las consultas que haya
         if (!anyadir_consulta) limpiamapa();
         
         // Recogemos los valores que intervendrán en la consulta
         tipoDato = document.getElementById("tipoDatoIndividual").value; 
         variable = document.getElementById("variableIndividual").value;
         operador = document.getElementById("operadorIndividual").value;
         valor = validaInput(document.getElementById("valorIndividual").value);
         color = document.getElementById("colorIndividual").value;
         
         // Y generamos la url que llamará al php
         var searchUrl = "php/phpsqlgenxml_generador_consultas.php?udMinima="+udMinima+
                  "&area="+areasEstudioSel+
                  "&tipoDato="+tipoDato+
                  "&variable="+variable+
                  "&operador="+operador+
                  "&valor="+valor+"";

      }// fin si es "individual"
      
      // Si es una consulta de "situaciones más frecuentes" 
      else if (modoConsulta == "situaciones") {
      
         // Limpiamos las consultas existentes en el mapa y en el informe
         limpiamapa();
         
         // Recogemos los valores que intervendrán en la consulta
         frecuSitu = document.getElementById("frecuSitu").value;
         coloresSitu.length = 0;
         colorSitu1 = document.getElementById("colorSitu1").value; coloresSitu.push(colorSitu1);
         colorSitu2 = document.getElementById("colorSitu2").value; coloresSitu.push(colorSitu2);
         colorSitu3 = document.getElementById("colorSitu3").value; coloresSitu.push(colorSitu3);
         colorSitu4 = document.getElementById("colorSitu4").value; coloresSitu.push(colorSitu4);
         colorSitu5 = document.getElementById("colorSitu5").value; coloresSitu.push(colorSitu5);
         colorSitu6 = document.getElementById("colorSitu6").value; coloresSitu.push(colorSitu6);
         colorSitu7 = document.getElementById("colorSitu7").value; coloresSitu.push(colorSitu7);
         colorSitu8 = document.getElementById("colorSitu8").value; coloresSitu.push(colorSitu8);
         colorSitu9 = document.getElementById("colorSitu9").value; coloresSitu.push(colorSitu9);
         colorSitu10= document.getElementById("colorSitu10").value;coloresSitu.push(colorSitu10);
         
         // Y generamos la url que llamará al php
         var searchUrl = "php/phpsqlgenxml_generador_consultas.php?udMinima="+udMinima+
                  "&area="+areasEstudioSel+
                  "&tipoDato=6"+
                  "&variable="+
                  "&operador="+
                  "&valor=";
                  
      }// fin si es de "situaciones más frecuentes"
      
      // Determinamos la descripción de la variable de estudio elegida 
      for (var i=0; i<variables.length; i++) {      
         if (variables[i][0] == variable) {            
            var textovar = ponTextoVar(variables[i][0],variables[i][1]);
         }
      }
   
      //alert(searchUrl);

      
      // *************  Ejecución de la consulta   **************************************
      
      // Se ejecuta si así lo establece la variable que lo controla
      if (ejecutarConsulta) { //1
      
      // Llamamos a la función descargaUrl que efectúa la consulta
      descargaUrl(searchUrl, function(data) {
      
         // Antes de recoger los resultados, según la unidad mínima de análisis elegida,
         // establecemos la lista de entidades poligonales que se utilizarán y la descripción
         // de dicha unidad mínima  
         switch (udMinima) {
            case "field_prq_id_value":
               var polis = polis_prqs;
               var desUdMinima = "Parroquia";
               break;
            case "field_prq_id_arcip_value":
               var polis = polis_arcips;
               var desUdMinima = "Arciprestazgo";
               break;
            case "field_prq_id_vicaria_value":
               var polis = polis_vicarias;
               var desUdMinima = "Vicaría";
               break;
            case "field_prq_id_comarca_value":
               var polis = polis_comarcas;
               var desUdMinima = "Comarca";
               break;
      
         }
      
         // Almacenamos el xml que devuelve el php
         var xml = data.responseXML;
         
         // Almacenamos en esta lista cada resultado devuelto
         var resultados = xml.documentElement.getElementsByTagName("resultado");
         
         // Si la consulta es "en bloque" o "individual",
         // almacenamos el mínimo y el máximo de los valores 
         if (modoConsulta == "bloque" || modoConsulta == "individual") {
            var minimo=parseFloat(resultados[0].getAttribute("TotalVariable"));
            var maximo=parseFloat(resultados[resultados.length-1].getAttribute("TotalVariable"));
         }
         
         // Si no hay resultados que satisfagan la consulta, lanzamos un mensaje de alerta
         // y evitamos que continúe ejecutándose la consulta
         if (resultados.length == 0) {
            ejecutarConsulta = false;
            alert("No hay "+desUdMinima+"s que cumplan las condiciones de la consulta");
         }   

         
         // *******   Si es una consulta "en bloque"   ******* 

         if (modoConsulta == "bloque") {
   
            // Determinamos los bloques y sus colores de representación
            var bloques = new Array();
            
            // Dependiendo del tipo de bloque, determinamos n (número de intervalos) y,
            // si es necesario, la amplitud,
            switch (tipoBloque) {
               case "amp":
                  var amplitud = intervalo;
                  var n = maximo/intervalo;
                  if (parseInt(n)-n != 0)
                     n = parseInt(n)+1;
                  else 
                     n = parseInt(n);            
                  break;
               case "num":
                  var n = intervalo;
                  var amplitud = maximo/n;
                  break;
               case "cuant":
                  var n = intervalo;
                  var amplitud = resultados.length/n;
                  amplitud = parseInt(amplitud);      
                  break;
               case "nat":
                  var n = intervalo;
                  break;
            }
            
            
            // Si el número de intervalos es mayor que 10 
            // o mayor que el número de valores a clasificar,
            // lanza un mensaje de alerta y evita que se siga ejecutando la consulta
            
            if (n <= 10 && n > resultados.length) {
               ejecutarConsulta = false;
               if (tipoBloque == "amp") {
                  alert("Introduce un valor mayor como amplitud de intervalo.\n"+
                        "Con una amplitud de "+amplitud+", el número de intervalos "+
                        "es "+n+", mayor que el número de entidades a "+
                        "clasificar ("+resultados.length+").");   
               }
               else {
                  alert("Introduce un valor menor como número de intervalos.\n"+
                        "El número de intervalos ("+n+") es mayor que el número "+
                        "de entidades a clasificar ("+resultados.length+")");                  
               }
            }
            
            if (n>10) {
               ejecutarConsulta = false;
               if (tipoBloque == "amp") {
                  alert("Introduce un valor mayor como amplitud de intervalo.\n"+
                        "Con una amplitud de "+amplitud+", el número de intervalos "+
                        "es "+n+". Y más de 10 intervalos ya no favorecen la interpretación "+
                        "del mapa resultante.");
               }
               else {
                  alert("Introduce un valor menor como número de intervalos.\n"+
                        "Más de 10 intervalos ya no favorecen la interpretación "+
                        "del mapa resultante.");                  
               }
            }
            
            
            // Si podemos seguir ejecutando la consulta            
            if (ejecutarConsulta) { //2
            
               // Determinamos los colores de cada bloque, en formato hexadecimal               
               var color1R = color1RGB[0];
               var color1G = color1RGB[1];
               var color1B = color1RGB[2];
               var color2R = color2RGB[0];
               var color2G = color2RGB[1];
               var color2B = color2RGB[2];
            
               var incrR = parseInt((color2R-color1R)/n);
               var incrG = parseInt((color2G-color1G)/n);
               var incrB = parseInt((color2B-color1B)/n);
         
               var colorR = new String();
               var colorG = new String();
               var colorB = new String();
               colorR = color1R;
               colorG = color1G;
               colorB = color1B;
            
               var limite1 = 0;
               var limite2;
               var j;
            
               for (var i = 0; i < n; i++) {
                  colorR = parseInt(colorR) + incrR;
                  colorG = parseInt(colorG) + incrG;
                  colorB = parseInt(colorB) + incrB;
                  var colorRhex = colorR.toString(16);
                     if (colorRhex.length<2) {colorRhex="0"+colorRhex};
                  var colorGhex = colorG.toString(16);
                     if (colorGhex.length<2) {colorGhex="0"+colorGhex};
                  var colorBhex = colorB.toString(16);
                     if (colorBhex.length<2) {colorBhex="0"+colorBhex};
                  var colorhex = "#"+colorRhex+
                                  ""+colorGhex+
                                  ""+colorBhex+"";
                                  
                  switch (tipoBloque) {
                     case "amp":
                        if (i == n-1) {
                           limite2 = fnum(maximo);
                        }
                        else {
                           limite2 = limite1+amplitud;
                           if (tipoDato=="2" || tipoDato=="3" || tipoDato=="4" || tipoDato=="5" )
                              limite2 = redondea(limite2)-0.1;   
                           else
                              limite2 = redondea(limite2)-1;   
                        }            
                        bloques[i] = [[limite1,limite2],colorhex,[],[],[]];
                        limite1 = limite1+intervalo;   
                        break;
                     case "num":
                        if (i == n-1) {
                           limite2 = fnum(maximo);
                        }
                        else {
                           limite2 = limite1+amplitud;
                           if (tipoDato=="2" || tipoDato=="3" || tipoDato=="4" || tipoDato=="5" )
                              limite2 = redondea(limite2)-0.1;   
                           else
                              limite2 = redondea(limite2)-1;   
                        }
                        bloques[i] = [[limite1,limite2],colorhex,[],[],[]];
                        limite1 = limite1+amplitud;
                        limite1 = redondea(limite1);
                        break;
                     default: // "cuant" || "nat" 
                        bloques[i] = [[0,0],colorhex,[],[],[]];
                        break;
                  }            

               }
            	// fin determinación de los colores de cada bloque, en formato hexadecimal

               
               // Si el tipo de bloque es "cuantil"
               
               if (tipoBloque == "cuant") {
                           
                 // Recorremos los resultados y los vamos dibujando según el color del bloque 
                 // del que cumplen las condiciones de intervalo 
                                    
                 // En el caso de que no se pueda hacer un reparto exacto por intervalos,
                 // repartiremos el exceso de elementos dando un elemento más a cada uno de los 
                 // primeros bloques, hasta que sea necesario
                 var exceso = resultados.length-(n*amplitud);
                 var k1 = 0;
                 if (exceso!=0)
                    var k2 = amplitud + 1; // para repartir el exceso
                                          // entre los primeros intervalos
                 else
                    var k2 = amplitud;
                 var k = 0;
                  
                 // Establecemos los límites del primer bloque
                 limite1 = fnum(parseFloat(resultados[k1].getAttribute("TotalVariable")));
                 limite2 = fnum(parseFloat(resultados[k2-1].getAttribute("TotalVariable")));
                 bloques[0][0][0] = limite1;
                 bloques[0][0][1] = limite2;
                                 
                 // Recorremos las lista de valores de entidades devuelta por la consulta y, 
                 // a la vez que vamos estableciendo los límites del resto de bloques, 
                 // vamos dibujando cada entidad con el color correspondiente a su bloque
                 
                 for (i = 0; i < resultados.length; i++) {
                 
                  var id = parseInt(resultados[i].getAttribute("id"));
                  var TotalVar=fnum(parseFloat(resultados[i].getAttribute("TotalVariable")));
                     
                  if (i>=k1 && i<k2) {}
                  else {
                     if (k+1!=n) k++; // evita saltar a un siguiente bloque "k" inexistente
                                      // en los casos que el último intervalo tiene algún 
                                      // elemento más que el resto   
                     k1 = k2;
                        
                     if (k < exceso)
                        k2 = k2 + amplitud + 1; // para repartir el exceso
                                                // entre los primeros intervalos
                     else
                        k2 = k2 + amplitud;
                        
                     // Rellenamos los límites de intervalo en el array "bloques"   
                     limite1 = fnum(parseFloat(resultados[k1].getAttribute("TotalVariable")));
                     if (i == resultados.length-1) 
                       limite2=fnum(parseFloat(resultados[i].getAttribute("TotalVariable")));
                     else
                       limite2=fnum(parseFloat(resultados[k2-1].getAttribute("TotalVariable")));
                       bloques[k][0][0] = limite1;
                       bloques[k][0][1] = limite2;
                                             
                  }                                       
                  
                  // Dibujamos la entidad actual con el color correspondiente a su bloque
                  dibujaEntidades(k,
                                  id,
                                  TotalVar,
                                  desUdMinima,
                                  textovar,
                                  polis,
                                  bloques,
                                  "",
                                  "",
                                  "");
                        
                 }
                  
               }// fin si es "cuantil"


					// Si el tipo de bloque es "nat" 
               else if (tipoBloque == "nat") {
               
                  // Calculamos los grupos por el método de Jenks de cortes naturales
                  var datos = new Array();
                  for (i = 0; i < resultados.length; i++) {
                     var TotalVar = fnum(parseFloat(resultados[i].getAttribute("TotalVariable")));
                     datos.push(TotalVar);
                  }
                  
                  serie = new geostats(datos); 
                  serie.getJenks(n);
                  
                  var grupos = new Array();
                  for (i = 0; i < n; i++) {
                     var partes = serie.ranges[i].split(" - ");
                     grupos.push([parseFloat(partes[0]),parseFloat(partes[1])]);
                  }
                  
                  // Calculamos GVF (Goodness of Variance Fit: bondad del ajuste de la varianza)
                  GVF = calculaGVF(datos,grupos);
                  
                  // Inicializamos los valores de los límites de los bloques
                  // El límite inferior el que nos devuelve getJenks
                  // El superior, como getJenks nos devuelve el inferior de la siguiente clase,
                  // lo iniciamos a 0 y lo rellenaremos a continuación
                  for (var k = 0; k < n; k++) {
                     bloques[k][0][0] = grupos[k][0];
                     bloques[k][0][1] = 0;
                  }                  
                  
                                    
                  // Recorremos los resultados y los vamos dibujando según el color del bloque 
                  // del que cumplen las condiciones de intervalo 
                  for (i = 0; i < resultados.length; i++) {
                     var id = parseInt(resultados[i].getAttribute("id"));
                     var TotalVar = fnum(parseFloat(resultados[i].getAttribute("TotalVariable")));
                     if (i == resultados.length-1) {
                        k = grupos.length-1;                  
                     }
                     else {
                        for (var k = 0; k < grupos.length; k++) {
                           if (TotalVar >= grupos[k][0] && TotalVar < grupos[k][1] ) {
                              break;
                           }
                        }
                     }
                     if (k == grupos.length) k = k-1;
                     bloques[k][0][1] = TotalVar;
                     dibujaEntidades(k,
                                     id,
                                     TotalVar,
                                     desUdMinima,
                                     textovar,
                                     polis,
                                     bloques,
                                     "",
                                     "",
                                     "");
                  }                  
               
               }
               
               // si el tipo de bloque no es ni "cuant" ni "nat"               
               else {

                  // Recorremos los resultados y los vamos dibujando según el color del bloque 
                  // del que cumplen las condiciones de intervalo 
                  for (i = 0; i < resultados.length; i++) {
                     var id = parseInt(resultados[i].getAttribute("id"));
                     var TotalVar = fnum(parseFloat(resultados[i].getAttribute("TotalVariable")));
                     for (var k = 0; k < bloques.length; k++) {
                        if (TotalVar >= bloques[k][0][0] && TotalVar <= bloques[k][0][1] ) {
                           dibujaEntidades(k,
                                           id,
                                            TotalVar,
                                            desUdMinima,
                                            textovar,
                                            polis,
                                            bloques,
                                            "",
                                            "",
                                            "");
                        }
                     }
                  }
                  
               }
               
               // Ajustamos los límites del mapa
               map.fitBounds(bounds);
               
               // Y construimos la leyenda correspondiente
               construyeLeyenda(bloques,"","","","");
            
            }// if(ejecutarConsulta) 2
         
         }// fin si es "en bloque"



         // *******  Si es una consulta "individual"   *******

         else if (modoConsulta == "individual") {
         
            if(ejecutarConsulta) {
         
               var paraInforme = new Array();
               for (var i = 0; i < resultados.length; i++) {
                  var id = parseInt(resultados[i].getAttribute("id"));
                  var TotalVar = fnum(parseFloat(resultados[i].getAttribute("TotalVariable")));
                  dibujaEntidades("",
                                  id,
                                  TotalVar,
                                  desUdMinima,
                                  textovar,
                                  polis,
                                  "",
                                  paraInforme,
                                  color,
                                  "");
               }
               
               // Ajustamos los límites del mapa
               map.fitBounds(bounds);
               
               // Y construimos la leyenda correspondiente
               construyeLeyenda("",
                                paraInforme,
                                operador,
                                valor,
                                color);
                                
            }// if (ejecutarConsulta) 2
            
         }
         
         
         // *******  Si es una consulta "situaciones"   *******
         
         else if (modoConsulta =="situaciones") {
            var paraInforme = new Array();
            var situacionesMasFrecuentes = new Array();
            for (var i = 0; i < resultados.length; i++) {
               var situacionesyVeces = new Array();
               var id = parseInt(resultados[i].getAttribute("id"));
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion1"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion2"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion3"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion4"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion5"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion6"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion7"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion8"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion9"));
                  situacionesyVeces.push(vecesSituacion);
               var vecesSituacion = parseInt(resultados[i].getAttribute("situacion10"));
                  situacionesyVeces.push(vecesSituacion);

               var masfrecuente1 = [0,0];
               for (var j = 0; j < situacionesyVeces.length; j++) {
                  if (situacionesyVeces[j] > masfrecuente1[1]) {
                     masfrecuente1 = [j+1,situacionesyVeces[j]];
                  }
               }

               var masfrecuente2 = [0,0];
               for (var j = 0; j < situacionesyVeces.length; j++) {
                  if (situacionesyVeces[j] != masfrecuente1[1] && 
                      situacionesyVeces[j] > masfrecuente2[1] ) {
                     masfrecuente2 = [j+1,situacionesyVeces[j]];
                  }
               }
               var masfrecuente3 = [0,0];
               for (var j = 0; j < situacionesyVeces.length; j++) {
                  if (situacionesyVeces[j] != masfrecuente1[1] &&
                      situacionesyVeces[j] != masfrecuente2[1] && 
                      situacionesyVeces[j] > masfrecuente3[1] ) {
                     masfrecuente3 = [j+1,situacionesyVeces[j]];
                  }
               }
               var masfrecuente4 = [0,0];
               for (var j = 0; j < situacionesyVeces.length; j++) {
                  if (situacionesyVeces[j] != masfrecuente1[1] &&
                      situacionesyVeces[j] != masfrecuente2[1] &&
                      situacionesyVeces[j] != masfrecuente3[1] && 
                      situacionesyVeces[j] > masfrecuente4[1] ) {
                     masfrecuente4 = [j+1,situacionesyVeces[j]];
                  }
               }

               situacionesMasFrecuentes.push([id,
                                             masfrecuente1,
                                             masfrecuente2,
                                             masfrecuente3,
                                             masfrecuente4]);
               switch (frecuSitu) {
                  case "1<sup>as</sup>": var masfrecuente = masfrecuente1; break;
                  case "2<sup>as</sup>": var masfrecuente = masfrecuente2; break;
                  case "3<sup>as</sup>": var masfrecuente = masfrecuente3; break;
                  case "4<sup>as</sup>": var masfrecuente = masfrecuente4; break;
               }
               var desc;
               switch (masfrecuente[0]) {
                  case 1: color = colorSitu1; desc = descSituaciones[0] ;break;
                  case 2: color = colorSitu2; desc = descSituaciones[1] ;break;
                  case 2: color = colorSitu3; desc = descSituaciones[2] ;break;
                  case 4: color = colorSitu4; desc = descSituaciones[3] ;break;
                  case 5: color = colorSitu5; desc = descSituaciones[4] ;break;
                  case 6: color = colorSitu6; desc = descSituaciones[5] ;break;
                  case 7: color = colorSitu7; desc = descSituaciones[6] ;break;
                  case 8: color = colorSitu8; desc = descSituaciones[7] ;break;
                  case 9: color = colorSitu9; desc = descSituaciones[8] ;break;
                  case 10: color = colorSitu10; desc = descSituaciones[9] ;break;
               }
            
               dibujaEntidades("",
                               id,
                               "",
                               desUdMinima,
                               "",
                               polis,
                               "",
                               paraInforme,
                               color,
                               desc);
            }
            
            // Ajustamos los límites del mapa
            map.fitBounds(bounds);
               
            // Y construimos la leyenda correspondiente
            construyeLeyenda("",paraInforme,"","","");  
             
         }
         
      });// fin descargaUrl()
      
      // Ya las hemos dibujado, activamos el checkbox de consultas y leyenda de consultas
      document.getElementById("capaConsultas").checked = true;
      document.getElementById("capaLeyenda").checked = true;   
      
      }// if (ejecutarConsulta) 1
      
   }// else de if (areasEstudioSel.length == 0)
   
}// fin consultaBD()

