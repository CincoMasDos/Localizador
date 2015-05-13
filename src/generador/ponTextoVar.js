// ***********************************************************************************************
// *******************      Función ponTextoVar(idvar,textovar)     ******************************
// ***********************************************************************************************
//
// Descripción: Devuelve una cadena de texto descriptiva del tipo de consulta realizada:
//              variable, % con respecto a qué... 
// Llamada por: 
//    función construyeLeyenda(...) 
// Invoca a:
//    nada
// Recibe: 
//    idvar,textovar
// Devuelve: 
//    textovar    
// Variables globales:
//    tipoDato

function ponTextoVar(idvar,textovar) {

   var textoVarMadre;

   if(idvar=="field_prq_est02_value" || 
      idvar=="field_prq_est03_value" || 
      idvar=="field_prq_est04_value" || 
      idvar=="field_prq_est05_value" || 
      idvar=="field_prq_est06_value" ) {textoVarMadre = "del total de voluntarios";}
   
   else if(idvar=="field_prq_est28_value" ||
      idvar=="field_prq_est29_value" ||
      idvar=="field_prq_est30_value" ||
      idvar=="field_prq_est31_value" ||
      idvar=="field_prq_est32_value" ||
      idvar=="field_prq_est33_value" ||
      idvar=="field_prq_est59_value" ||
      idvar=="field_prq_est34_value" ||
      idvar=="field_prq_est35_value" ||
      idvar=="field_prq_est36_value" ||
      idvar=="field_prq_est37_value" ||
      idvar=="field_prq_est38_value" ) {textoVarMadre = "del total de ingresos";}
   
   else if(idvar=="field_prq_est40_value" ||
      idvar=="field_prq_est41_value" ||
      idvar=="field_prq_est44_value" ||
      idvar=="field_prq_est42_value" ||
      idvar=="field_prq_est43_value" ||
      idvar=="field_prq_est45_value" ||
      idvar=="field_prq_est46_value" ||
      idvar=="field_prq_est48_value" ||
      idvar=="field_prq_est49_value" ||
      idvar=="field_prq_est50_value" ||
      idvar=="field_prq_est51_value" ||
      idvar=="field_prq_est52_value" ||
      idvar=="field_prq_est53_value" ||
      idvar=="field_prq_est54_value" ||
      idvar=="field_prq_est47_value" ) {textoVarMadre= "del total de gastos";}
      
   else if(idvar=="field_prq_est10_value" ||
      idvar=="field_prq_est11_value" ) {textoVarMadre= "del total de mujeres y hombres atendidos";}   
      
   else if(idvar=="field_prq_est12_value" ||
      idvar=="field_prq_est13_value" ) {textoVarMadre= "del total de españoles y extranjeros atendidos";}      

   switch (tipoDato) {
      case "2": textovar = "% "+textovar+" (del total en el área de estudio)"; break;
      case "3": textovar = "% "+textovar+" (del total en toda la Diócesis)"; break;
      case "4": textovar = "% "+textovar+" ("+textoVarMadre+" en el área de estudio)"; break;
      case "5": textovar = "% "+textovar+" ("+textoVarMadre+" en toda la Diócesis)"; break;
   }

   return textovar;
}
