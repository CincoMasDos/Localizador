// ************************************************************************************************
// ****************************       Funciones:         ******************************************
// ****************************   esEntero(contenido)    ******************************************
// ****************************  validaInput(contenido)  ******************************************
// ****************************       redondea(n)        ******************************************
// ****************************        fnum(num)         ******************************************
// ************************************************************************************************
//
// Descripción: Funciones de apoyo a la función consultaBD que validan la entrada de datos y dan
//              formato a los valores de la consulta.//              
// Llamadas por: 
//    función consultaBD()
// Invocan a:
//    nada
// Variables globales:
//    - ejecutarConsulta


// Función que comprueba si el "contenido" recibido es un número entero o no

function esEntero(contenido) {
   if (isNaN(parseInt(contenido))) { // NO es un numero
      return false;
   }
   else { // SÍ es un número
      if (parseInt(contenido)-parseFloat(contenido) !=0) { // No es entero (tiene decimales)
         return false;
      }
      else { // es entero
         return true;         
      }
   }
}



// Función que valida el valor introducido en el input textual

function validaInput(contenido) {
   if (operador == "[,]") {
      partes = contenido.split("-");
      if (partes.length != 2) {
         ejecutarConsulta = false;            
      }
      else { // partes.length != 2
         if (esEntero(partes[0]) && esEntero(partes[1])) {
            return contenido;
         }
         else {
            ejecutarConsulta = false;
         }
      }
      
      if (!ejecutarConsulta) {
         alert('El valor a introducir ha de ser un par '+
               'de números enteros separados por un guión.\n\nEjemplo: 100-200');
      }
      
   }
   else {
      if (esEntero(contenido)) {
         return parseInt(contenido);
      }
      else {
         ejecutarConsulta = false;
         alert('El valor a introducir ha de ser un número entero');
      }
   }
}



// Función que convierte en entero un número decimal "n"
// y lo redondea segun su parte decimal sea mayor a 0.5 o no

function redondea(n) {
   var dec = n-parseInt(n)
   if (dec > 0.5)
      n = parseInt(n)+1;
   else if (dec <= 0.5)
      n = parseInt(n);
   return n;   
}



// Función que convierte los datos numéricos y les da formato
// según trabajemos con enteros o con %

function fnum(num) {
   if (tipoDato == "2" || tipoDato == "3" || tipoDato == "4" || tipoDato == "5" ) {
      num = num.toFixed(1)+"";
      num = parseFloat(num);
   }
   return num;
}

