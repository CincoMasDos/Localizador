// ************************************************************************************************
// *********************      Función cambiaTipoDato()     ****************************************
// ************************************************************************************************
//
// Descripción: Al cambiar el tipo de dato, si el nuevo tipo es el 4 (% del TOTAL padre -en el
//              Área de estudio-) o el 5 (% del TOTAL padre -en toda la Diócesis-), actualiza
//              el contenido del selector de variables mostrando sólo las variables que se
//              pueden consultar con estos tipos de datos. En el caso de elegir otro tipo de 
//              dato, vuelve a colocar la lista completa de variables.
// Llamada por: 
//    onchangue de los select "tipoDatoIndividual" y  "tipoDatoEnBloque"
// Invoca a:
//    nada
// Recibe: 
//    nada
// Devuelve: 
//    nada    
// Variables globales:
//    - variables

function cambiaTipoDato() {

   var i;
   var j;
   
   var listaVarReducida = false;
   
   if (modoConsulta == "bloque") {
      tipoDato = document.getElementById("tipoDatoEnBloque").value;
      var selectVar = document.getElementById("variableEnBloque");
   }
   else if (modoConsulta == "individual") {
      tipoDato = document.getElementById("tipoDatoIndividual").value;
      var selectVar = document.getElementById("variableIndividual");
   }
   
   switch (tipoDato) {
      case "4":
         listaVarReducida = true;
         break;
      case "5":
         listaVarReducida = true;
         break;
      default:
         listaVarReducida = false;
         break;      
   }
   
   if(listaVarReducida) {
      selectVar.options.length = 0;
      j=0;
      for (i=1; i<=5; i++) {
         selectVar.options[j] = new Option(""+variables[i][1]+"",""+variables[i][0]+"");
         j++;
      }
      for (i=7; i<=10; i++) {
         selectVar.options[j] = new Option(""+variables[i][1]+"",""+variables[i][0]+"");
         j++;
      }
      for (i=15; i<=26; i++) {
         selectVar.options[j] = new Option(""+variables[i][1]+"",""+variables[i][0]+"");
         j++;
      }
      for (i=28; i<=42; i++) {
         selectVar.options[j] = new Option(""+variables[i][1]+"",""+variables[i][0]+"");
         j++;
      }
      
   }
   else {
      selectVar.options.length = 0;
      for (i=0; i<variables.length; i++) {
         selectVar.options[i] = new Option(""+variables[i][1]+"",""+variables[i][0]+"");
      }
   
   }      

   
}
