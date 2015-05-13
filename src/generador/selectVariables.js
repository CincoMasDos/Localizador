// ***********************************************************************************************
// ***************************       Funciones:         ******************************************
// *************************** rellenaSelectVar(select) ******************************************
// ***************************    selectVariables()     ******************************************
// ***********************************************************************************************
//
// Descripción: 
//    Funciones que rellenan los select "variableEnBloque" y "variableIndividual" con los
//    valores de la lista global "variables".            
// Llamadas por: 
//    función load()
// Invocan a:
//    nada
// Variables globales:
//    - variables

// ********* Variable global **************

var variables = [
/* 0 */    ["field_prq_est01_value","TOTAL DE VOLUNTARIOS"],
/* 1 */    ["field_prq_est03_value","Voluntarios mujeres"],
/* 2 */    ["field_prq_est02_value","Voluntarios hombres"],
/* 3 */    ["field_prq_est04_value","Voluntarios extranjeros"],
/* 4 */    ["field_prq_est05_value","Voluntarios religiosos"],
/* 5 */    ["field_prq_est06_value","Voluntarios nuevos"],
           /*["field_prq_est07_value","Voluntarios edad de 51 a 65 años"],*/
           /*["field_prq_est08_value","Voluntarios edad más de 65 años"],*/
/* 6 */    ["field_prq_est09_value","TOTAL DE BENEFICIARIOS"],
/* 7 */    ["field_prq_est10_value","Hombres atendidos"],
/* 8 */    ["field_prq_est11_value","Mujeres atendidas"],
/* 9 */    ["field_prq_est12_value","Extranjeros atendidos"],
/* 10 */   ["field_prq_est13_value","Españoles atendidos"],
/* 11 */   ["field_prq_est14_value","Atendidos que han acudido por vez primera"],
/* 12 */   ["field_prq_est15_value","Menores beneficiarios"],
/* 13 */   ["field_prq_est16_value","Personas ayudadas a encontrar trabajo"],
   /*["field_prq_est73_value","Edad mayoritaria personas atendidas: hasta 40 años"],*/
   /*["field_prq_est74_value","Edad mayoritaria personas atendidas: de 41 a 64 años"],*/
   /*["field_prq_est75_value","Edad mayoritaria personas atendidas: de 65 en adelante"],*/
/* 14 */   ["field_prq_est27_value","TOTAL INGRESOS"],
/* 15 */   ["field_prq_est28_value","Ing. Colectas mensuales Segundo Domingo"],
/* 16 */   ["field_prq_est29_value","Ing. Cuotas de socios de las CC.PP."],
/* 17 */   ["field_prq_est30_value","Ing. Donativos"],
/* 18 */   ["field_prq_est31_value","Ing. Campaña Día de Caridad"],
/* 19 */   ["field_prq_est32_value","Ing. Campaña de Emergencias"],
/* 20 */   ["field_prq_est33_value","Ing. Aportación de Cáritas Diocesana por solicitudes "+
                            "de ayuda a casos"],
/* 21 */   ["field_prq_est59_value","Ing. Aportación de FAOG"],
/* 22 */   ["field_prq_est34_value","Ing. Aportación de Cáritas Diocesana por solicitudes "+
                            "de ayuda a Proyectos"],
/* 23 */   ["field_prq_est35_value","Ing. Subvenciones de Ayuntamiento"],
/* 24 */   ["field_prq_est36_value","Ing. Subvenciones de otras entidades"],
/* 25 */   ["field_prq_est37_value","Ing. Otros conceptos"],
/* 26 */   ["field_prq_est38_value","Ing. Subvención de bancos y cajas"],
/* 27 */   ["field_prq_est39_value","TOTAL GASTOS"],
/* 28 */   ["field_prq_est40_value","Gast. Alquiler desahucio recibos"],
/* 29 */   ["field_prq_est41_value","Gast. Atención Primaria Alimentación: vales bolsas de comida"],
/* 30 */   ["field_prq_est44_value","Gast. Atención Primaria: Economato"],
/* 31 */   ["field_prq_est42_value","Gast. Atención Primaria medicamentos y ayudas de farmacia"],
/* 32 */   ["field_prq_est43_value","Gast. Atención Primaria Otros"],
/* 33 */   ["field_prq_est45_value","Gast. Ayuda educativa"],
/* 34 */   ["field_prq_est46_value","Gast. Proyectos Arciprestales e interparroquiales"],
/* 35 */   ["field_prq_est48_value","Gast. Animación y formación"],
/* 36 */   ["field_prq_est49_value","Gast. Gestión de la Cáritas Parroquial"],
/* 37 */   ["field_prq_est50_value","Gast. Aportación a Cáritas Diocesana por el Día de Caridad"],
/* 38 */   ["field_prq_est51_value","Gast. Aportacióna Cáritas Diocesana por Campañas de emergencias"],
/* 39 */   ["field_prq_est52_value","Gast. Aportación a Cáritas Diocesana por otros conceptos o "+
                            "Campañas"],
/* 40 */   ["field_prq_est53_value","Gast. Aportaciones a otras instituciones de dentro y fuera "+
                            "de la Iglesia"],
/* 41 */   ["field_prq_est54_value","Gast. Aportación directa a Proyectos en países del Sur"],
/* 42 */   ["field_prq_est47_value","Gast. Otros gastos"],
/* 43 */   ["field_prq_est55_value","Participación directa en algún proyecto con países del Sur"],
/* 44 */   ["field_prq_est60_value","Participación en comisiones, plataformas o grupos de trabajo con otras entidades"],
/* 45 */   ["field_prq_est56_value","Participación en la semana de movilizaciones de Pobreza Cero"],
/* 46 */   ["field_prq_est57_value","Tiene personas dedicadas a la animación"],
/* 47 */   ["field_prq_est58_value","Se utiliza el 2º domingo para sensibilizar a la comunidad parroquial"]  
];

      
// *************** Funciones *********************

function rellenaSelectVar(select){
   select.options.length = 0;
   for (var i=0; i<variables.length; i++) {
      select.options[i] = new Option(""+variables[i][1]+"",""+variables[i][0]+"");
   }
}

function selectVariables() {
   var select = document.getElementById("variableIndividual");
   rellenaSelectVar(select);
   var select = document.getElementById("variableEnBloque");
   rellenaSelectVar(select);
}
