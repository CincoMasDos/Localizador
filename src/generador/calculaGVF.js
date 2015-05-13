// ************************************************************************************************
// *********************      Función calculaGVF(datos,grupos)      *******************************
// ************************************************************************************************
//
// Descripción: Calcula la bondad del ajuste de la varianza (GVF, Goodness of Variance Fit) en 
//              la clasificación por cortes naturales (Jenks)//              
// Llamada por: 
//    función consultaBD()
// Invoca a:
//    nada
// Recibe: 
//    datos  : vector con el valor de la variable de estudio en cada entidad clasificada
//    grupos : vector con los límites mínimo (incluyente) y máximo (exclutyente) de cada intervalo
//             de clasificación
// Devuelve: 
//    GVF    
// Variables globales:
//    ninguna

function calculaGVF(datos,grupos) {

   //******************************
   //***** Cálculo de la GVF ******
   //******************************

   // Calculamos la media de todos los valores
   var suma = 0;
   for (var i=0; i<datos.length; i++) {
      suma = suma + datos[i];
   }
   var media = suma/datos.length;
   
   // Calculamos SDAM (sumatorio de la varianzas de cada valor con respecto a la media)
   var SDAM = 0; 
   for (var i=0; i<datos.length; i++) {
      SDAM = SDAM + (datos[i]-media)*(datos[i]-media);
   }
   
   // Calculamos SDMC
   var SDMC = 0;

      
   // Para cada grupo
   
   for (var i=0; i<grupos.length; i++) {
   
      var suma = 0;
      var k = 0;
      var texto ="";
      
      //Calculamos la media del grupo i
      for (j = 0; j < datos.length-1; j++) {
         if (datos[j] >= grupos[i][0] && datos[j] < grupos[i][1] ) {
            suma = suma + datos[j];
            k++;
         }
      }
      
      if (i == grupos.length-1) {
         suma = suma + datos[datos.length-1];
         k++;
      }
         
      var media = suma/k;
      
      // Calculamos el sumatorio de la varianza de cada valor del grupo i 
      // con respecto a la media de este grupo i
      
      var sumaVar = 0;
      
      for (j = 0; j < datos.length-1; j++) {
         if (datos[j] >= grupos[i][0] && datos[j] < grupos[i][1] ) {
            sumaVar = sumaVar + (datos[j]-media)*(datos[j]-media);
         }
      }
      
      if (i == grupos.length-1) {
         sumaVar = sumaVar + (datos[datos.length-1]-media)*(datos[datos.length-1]-media);
      }   
      
      SDMC = SDMC + sumaVar;
      
   }
   
   
   // Cálculo de la GVF
   var GVF = 1-(SDMC/SDAM);
   
   return GVF;
   

}
