// ************************************************************************************************
// *******************      Función cambiaUnidadMinima()     **************************************
// ************************************************************************************************
//
// Descripción: Al cambiar la unidad mínima, se actaliza el selector de Áreas de estudio,
//              mostrando sólo aquéllos que corresponden a la nueva unidad mínima.
// Llamada por: 
//    onchangue del select "selectUnidadMinima"
// Invoca a:
//    nada
// Recibe: 
//    nada
// Devuelve: 
//    nada    
// Variables globales:
//    - comarcas
//    - vicarias
//    - arciprestazgos


function cambiaUnidadMinima() {
   var i;
   var j;
   var select = document.getElementById("selectAreaDeEstudio");
   switch (document.getElementById("selectUnidadMinima").value) {
     case "field_prq_id_comarca_value":
        select.options.length = 0;
        for (i=0; i<comarcas.length; i++) {
           select.options[i] = new Option(""+comarcas[i][1]+"",""+comarcas[i][0]+"");
        }
        break;
     case "field_prq_id_vicaria_value":
        select.options.length = 0;
        for (i=0; i<vicarias.length; i++) {
           select.options[i] = new Option(""+vicarias[i][1]+"",""+vicarias[i][0]+"");
        }
        break;
     case "field_prq_id_arcip_value":
        select.options.length = 0;
        for (i=0; i<vicarias.length; i++) {
          select.options[i] = new Option(""+vicarias[i][1]+"",""+vicarias[i][0]+"");
        }
        j=i;
        for (i=0; i<arciprestazgos.length; i++) {
          select.options[j+i] = new Option(""+arciprestazgos[i][1]+"",""+arciprestazgos[i][0]+"");
        }
        break;
     case "field_prq_id_value": //parroquia
        select.options.length = 0;
        //for (i=0; i<vicarias.length; i++) {
        for (i=2; i<4; i++) {
          select.options[i-2] = new Option(""+vicarias[i][1]+"",""+vicarias[i][0]+"");
        }
        j=i-2;
        //for (i=0; i<arciprestazgos.length; i++) {
        for (i=2; i<11; i++) {
          select.options[j+i-2]=new Option(""+arciprestazgos[i][1]+"",""+arciprestazgos[i][0]+"");
        }
        select.options[j+i-2]=new Option(""+arciprestazgos[17][1]+"",""+arciprestazgos[17][0]+""); //Incluido Arcip.16 Sants de la Pedra
        select.options[j+i-2+1]=new Option(""+arciprestazgos[29][1]+"",""+arciprestazgos[29][0]+""); //Incluido Arcip.28 Mare de Déu dels Lliris
        //j=j+i;
        //for (i=0; i<comarcas.length; i++) {
        //   select.options[j+i] = new Option(""+comarcas[i][1]+"",""+comarcas[i][0]+"");
        //}
        //break;
   }
}
