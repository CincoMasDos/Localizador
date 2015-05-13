// ************************************************************************************************
// *************      Función ponEtiquetaAux(punto,etiqueta,estilo)     ***************************
// ************************************************************************************************
//
// Descripción: Configura el contenido de las etiquetas puestas a las entidades dibujadas tras la 
//              consulta, dependiendo de los elementos que han de componerlas. También determina
//              el estilo de estas etiquetas dependiendo del color y tamaño elegidos.
// Llamada por: 
//    función capaEtiquetasConsultas() 
// Invoca a:
//    nada
// Recibe: 
//    id,nombre,TotalVariable
// Devuelve: 
//    [mensaEtiq,estilo]    
// Variables globales:
//    ninguna

function ponEtiquetaAux(id,nombre,TotalVariable) {
   var mensaEtiq = "";
   var idEtiq = document.getElementById("idEtiquetasConsultas");
   var nombreEtiq = document.getElementById("nombreEtiquetasConsultas");
   var valorEtiq = document.getElementById("valorEtiquetasConsultas");
   if (idEtiq.checked) {
      if (nombreEtiq.checked || valorEtiq.checked) {
         mensaEtiq = mensaEtiq+id+": ";
      }
      else {
         mensaEtiq = mensaEtiq+id;
      }
   }
   if (nombreEtiq.checked) {
      mensaEtiq = mensaEtiq+nombre+"<br>";
   }
   if (valorEtiq.checked) {
      TotalVariable = separadorMiles(TotalVariable);
      mensaEtiq = mensaEtiq+"<b>"+TotalVariable+"</b>";
   }
   
   var sizeEtiq = document.getElementById("sizeEtiq").value;
   var colorEtiq = document.getElementById("colorEtiq").value;
   
   var estilo;
   if (sizeEtiq == "" && colorEtiq == "#000000") estilo = etiqb;
   else if (sizeEtiq == "1" && colorEtiq == "#000000") estilo = "etiq1b";
   else if (sizeEtiq == "2" && colorEtiq == "#000000") estilo = "etiq2b";
   else if (sizeEtiq == "3" && colorEtiq == "#000000") estilo = "etiq3b";
   else if (sizeEtiq == "4" && colorEtiq == "#000000") estilo = "etiq4b";
   else if (sizeEtiq == "5" && colorEtiq == "#000000") estilo = "etiq5b";
   else if (sizeEtiq == "6" && colorEtiq == "#000000") estilo = "etiq6b";
   else if (sizeEtiq == "7" && colorEtiq == "#000000") estilo = "etiq7b";
   else if (sizeEtiq == "8" && colorEtiq == "#000000") estilo = "etiq8b";
   else if (sizeEtiq == "9" && colorEtiq == "#000000") estilo = "etiq9b";
   else if (sizeEtiq == "10" && colorEtiq == "#000000") estilo = "etiq10b";
   else if (sizeEtiq == "1" && colorEtiq == "#ffffff") estilo = "etiq1w";
   else if (sizeEtiq == "2" && colorEtiq == "#ffffff") estilo = "etiq2w";
   else if (sizeEtiq == "3" && colorEtiq == "#ffffff") estilo = "etiq3w";
   else if (sizeEtiq == "4" && colorEtiq == "#ffffff") estilo = "etiq4w";
   else if (sizeEtiq == "5" && colorEtiq == "#ffffff") estilo = "etiq5w";
   else if (sizeEtiq == "6" && colorEtiq == "#ffffff") estilo = "etiq6w";
   else if (sizeEtiq == "7" && colorEtiq == "#ffffff") estilo = "etiq7w";
   else if (sizeEtiq == "8" && colorEtiq == "#ffffff") estilo = "etiq8w";
   else if (sizeEtiq == "9" && colorEtiq == "#ffffff") estilo = "etiq9w";
   else if (sizeEtiq == "10" && colorEtiq == "#ffffff") estilo = "etiq10w";
   
return [mensaEtiq,estilo];

}
