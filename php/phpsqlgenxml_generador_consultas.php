<?php  

require("phpsql_dbinfo.php"); 

// Tomamos de la URL los parámetros que determinarán la consulta
$udMinima = $_GET["udMinima"];
$listaArea = $_GET["area"];
   $area = explode(",", $listaArea);
   if(floatval($area[0])>=0 && floatval($area[0])<100) {
      $idArea = "field_prq_id_comarca_value";
      $resta = 0;
   }
   elseif(floatval($area[0])>=100 && floatval($area[0])<200) {
      $idArea = "field_prq_id_vicaria_value";
      $resta = 100;
   }
   elseif(floatval($area[0])>=200 && floatval($area[0])<300) {
      $idArea = "field_prq_id_arcip_value";
      $resta = 200;
   }
   
   for($i=0; $i<=COUNT($area)-1 ; $i=$i+1){
      if($i==0) {
         $valorIdArea = floatval($area[$i])-$resta;
         $condArea = $idArea." = ".$valorIdArea;
      }
      else {
         $valorIdArea = floatval($area[$i])-$resta;
         $condArea = $condArea." OR ".$idArea." = ".$valorIdArea;
      }
   }
$tipoDato = $_GET["tipoDato"];   
$variable = $_GET["variable"];
$operador = $_GET["operador"];
if ($operador == "[,]") {
   $valoresIntervalo = explode("-", $_GET["valor"]);
   $valor1 = $valoresIntervalo[0];
   $valor2 = $valoresIntervalo[1];
}
else {
$valor = $_GET["valor"];
}

$varMadre = "";
$varMadreA = "";
$varMadreB = "";

if($tipoDato=="4" || $tipoDato=="5") {
   $varMadre1 = "field_prq_est01_value";  //Total de voluntarios
   $varMadre2 = "field_prq_est27_value";  //Total de Ingresos
   $varMadre3 = "field_prq_est39_value";  //Total de gastos
   $varMadre4A = "field_prq_est10_value"; //Total de personas atendidas HOMBRES
   $varMadre4B = "field_prq_est11_value"; //Total de personas atendidas MUJERES
   $varMadre5A = "field_prq_est12_value"; //Total de personas atendidas EXTRANJEROS
   $varMadre5B = "field_prq_est13_value"; //Total de personas atendidas ESPAÑOLES      
   

   if($variable=="field_prq_est02_value" || 
      $variable=="field_prq_est03_value" || 
      $variable=="field_prq_est04_value" || 
      $variable=="field_prq_est05_value" || 
      $variable=="field_prq_est06_value" ) {$varMadre=$varMadre1;}
   
   elseif($variable=="field_prq_est28_value" ||
      $variable=="field_prq_est29_value" ||
      $variable=="field_prq_est30_value" ||
      $variable=="field_prq_est31_value" ||
      $variable=="field_prq_est32_value" ||
      $variable=="field_prq_est33_value" ||
      $variable=="field_prq_est59_value" ||
      $variable=="field_prq_est34_value" ||
      $variable=="field_prq_est35_value" ||
      $variable=="field_prq_est36_value" ||
      $variable=="field_prq_est37_value" ||
      $variable=="field_prq_est38_value" ) {$varMadre=$varMadre2;}
   
   elseif($variable=="field_prq_est40_value" ||
      $variable=="field_prq_est41_value" ||
      $variable=="field_prq_est44_value" ||
      $variable=="field_prq_est42_value" ||
      $variable=="field_prq_est43_value" ||
      $variable=="field_prq_est45_value" ||
      $variable=="field_prq_est46_value" ||
      $variable=="field_prq_est48_value" ||
      $variable=="field_prq_est49_value" ||
      $variable=="field_prq_est50_value" ||
      $variable=="field_prq_est51_value" ||
      $variable=="field_prq_est52_value" ||
      $variable=="field_prq_est53_value" ||
      $variable=="field_prq_est54_value" ||
      $variable=="field_prq_est47_value" ) {$varMadre=$varMadre3;}
      
   elseif($variable=="field_prq_est10_value" ||
      $variable=="field_prq_est11_value" ) {$varMadreA=$varMadre4A;
                                            $varMadreB=$varMadre4B;}   
      
   elseif($variable=="field_prq_est12_value" ||
      $variable=="field_prq_est13_value" ) {$varMadreA=$varMadre5A;
                                            $varMadreB=$varMadre5B;}   
}



// Iniciamos el archivo XML y creamos el nodo padre
$dom = new DOMDocument("1.0");
$nodo = $dom->createElement("resultados");
$nodo_padre = $dom->appendChild($nodo); 

// Abrimos la conexión con el servidor MySQL
$conexion = mysql_connect ($host, $username, $password);
if (!$conexion) {  die('No se ha conectado: ' . mysql_error());} 

// Establecemos la base de datos a utilizar
$db_selected = mysql_select_db($database, $conexion);
if (!$db_selected) {
  die ("No se puede usar la base de datos: " . mysql_error());
}


// ********* Construimos la consulta a realizar ********************

if ($operador == "[,]") {

   if ($tipoDato=="1") { // Nº
   
      $query = sprintf("SELECT %s,
                               %s,
                               SUM(%s) AS TotalVariable 
                        FROM content_type_parroquias 
                        GROUP BY %s 
                        HAVING (%s) AND (TotalVariable >= %s AND TotalVariable <= %s)
                        ORDER BY
                           TotalVariable ASC, %s ASC, %s ASC",
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($valor1),
         mysql_real_escape_string($valor2),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($udMinima));
         
   }
   
   elseif ($tipoDato=="2") { // % (en el Área de estudio)
   
      $query = sprintf("SELECT %s, 
                               %s,
                               SUM(%s)*100/(
                                  (
                                     SELECT SUM(%s) 
                                    FROM content_type_parroquias 
                                    WHERE (%s)
                                 )
                               ) AS TotalVariable
                        FROM content_type_parroquias 
                        GROUP BY %s 
                        HAVING (%s) AND (TotalVariable >= %s AND TotalVariable <= %s)
                        ORDER BY
                           TotalVariable ASC, %s ASC, %s ASC",
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($valor1),
         mysql_real_escape_string($valor2),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($udMinima));
         
   }
   
   elseif ($tipoDato=="3") { // % (en toda la Diócesis)
   
      $query = sprintf("SELECT %s,
                               %s,
                               SUM(%s)*100/ (
                                  SELECT SUM(%s)
                                  FROM content_type_parroquias
                               ) AS TotalVariable 
                        FROM content_type_parroquias 
                        GROUP BY %s 
                        HAVING (%s) AND (TotalVariable >= %s AND TotalVariable < %s)",
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($valor1),
         mysql_real_escape_string($valor2));
         
   }
   
   elseif ($tipoDato=="4") { // % del TOTAL padre (en el Área de estudio)
   
      if ($varMadre=="field_prq_est01_value" ||
          $varMadre=="field_prq_est27_value" ||
          $varMadre=="field_prq_est39_value" ) {
          
         $query = sprintf("SELECT %s, 
                                  %s,
                                  SUM(%s)*100/(
                                     (
                                        SELECT SUM(%s) 
                                       FROM content_type_parroquias 
                                       WHERE (%s)
                                    )
                                  ) AS TotalVariable
                           FROM content_type_parroquias 
                           GROUP BY %s 
                           HAVING (%s) AND (TotalVariable >= %s AND TotalVariable <= %s)
                           ORDER BY
                              TotalVariable ASC, %s ASC, %s ASC",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadre),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($valor1),
            mysql_real_escape_string($valor2),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($udMinima));
            
         }
         
         else {
         
            $query = sprintf("SELECT %s, 
                                  %s,
                                  SUM(%s)*100/(
                                     (
                                        SELECT (SUM(%s)+SUM(%s))
                                       FROM content_type_parroquias 
                                       WHERE (%s)
                                    )
                                  ) AS TotalVariable
                             FROM content_type_parroquias 
                             GROUP BY %s 
                             HAVING (%s) AND (TotalVariable >= %s AND TotalVariable <= %s)
                             ORDER BY
                                TotalVariable ASC, %s ASC, %s ASC",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadreA),
            mysql_real_escape_string($varMadreB),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($valor1),
            mysql_real_escape_string($valor2),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($udMinima));
            
         }
   
   }
   
   elseif ($tipoDato=="5") { // % del TOTAL padre (en toda la Diócesis)
   
      if ($varMadre=="field_prq_est01_value" ||
          $varMadre=="field_prq_est27_value" ||
          $varMadre=="field_prq_est39_value" ) {
          
         $query = sprintf("SELECT %s,
                                  %s,
                                  SUM(%s)*100/ (
                                     SELECT SUM(%s)
                                     FROM content_type_parroquias
                                  ) AS TotalVariable 
                           FROM content_type_parroquias 
                           GROUP BY %s 
                           HAVING (%s) AND (TotalVariable >= %s AND TotalVariable < %s)",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadre),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($valor1),
            mysql_real_escape_string($valor2));
            
      }
      
      else {
      
         $query = sprintf("SELECT %s,
                                  %s,
                                  SUM(%s)*100/ (
                                     SELECT (SUM(%s)+SUM(%s))
                                     FROM content_type_parroquias
                                  ) AS TotalVariable 
                           FROM content_type_parroquias 
                           GROUP BY %s 
                           HAVING (%s) AND (TotalVariable >= %s AND TotalVariable < %s)",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadreA),
            mysql_real_escape_string($varMadreB),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($valor1),
            mysql_real_escape_string($valor2));
      
      }
      
   }

}//if ($operador == "[,]")

else {

   if ($tipoDato=="1") { // Nº
   
      $query = sprintf("SELECT %s,
                               %s,
                               SUM(%s) AS TotalVariable 
                        FROM content_type_parroquias 
                           GROUP BY %s 
                        HAVING (%s) AND TotalVariable %s %s
                        ORDER BY
                           TotalVariable ASC, %s ASC, %s ASC",
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($operador),
         mysql_real_escape_string($valor),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($udMinima));
         
   }
   
   elseif ($tipoDato=="2") { // % (en el Área de estudio)
   
      $query = sprintf("SELECT %s, 
                               %s,
                               SUM(%s)*100/(
                                  (
                                     SELECT SUM(%s) 
                                    FROM content_type_parroquias 
                                    WHERE (%s)
                                 )
                               ) AS TotalVariable
                        FROM content_type_parroquias 
                        GROUP BY %s 
                        HAVING (%s) AND TotalVariable %s %s
                        ORDER BY
                           TotalVariable ASC, %s ASC, %s ASC",
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($operador),
         mysql_real_escape_string($valor),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($udMinima));
         
   }
   
   elseif ($tipoDato=="3") { // % (en toda la Diócesis)
   
      $query = sprintf("SELECT %s,
                               %s,
                               SUM(%s)*100/ (
                                  SELECT SUM(%s)
                                  FROM content_type_parroquias
                               ) AS TotalVariable 
                        FROM content_type_parroquias 
                        GROUP BY %s 
                        HAVING (%s) AND TotalVariable %s %s",
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($variable),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($operador),
         mysql_real_escape_string($valor));
         
   }
   
   elseif ($tipoDato=="4") { // % del TOTAL padre (en el Área de estudio)
   
      if ($varMadre=="field_prq_est01_value" ||
          $varMadre=="field_prq_est27_value" ||
          $varMadre=="field_prq_est39_value" ) {
          
         $query = sprintf("SELECT %s, 
                                  %s,
                                  SUM(%s)*100/(
                                     (
                                        SELECT SUM(%s) 
                                       FROM content_type_parroquias 
                                       WHERE (%s)
                                    )
                                  ) AS TotalVariable
                           FROM content_type_parroquias 
                           GROUP BY %s 
                           HAVING (%s) AND TotalVariable %s %s
                           ORDER BY
                              TotalVariable ASC, %s ASC, %s ASC",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadre),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($operador),
            mysql_real_escape_string($valor),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($udMinima));
            
      }
      
      else {
      
         $query = sprintf("SELECT %s, 
                                  %s,
                                  SUM(%s)*100/(
                                     (
                                        SELECT (SUM(%s)+SUM(%s)) 
                                       FROM content_type_parroquias 
                                       WHERE (%s)
                                    )
                                  ) AS TotalVariable
                           FROM content_type_parroquias 
                           GROUP BY %s 
                           HAVING (%s) AND TotalVariable %s %s
                           ORDER BY
                              TotalVariable ASC, %s ASC, %s ASC",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadreA),
            mysql_real_escape_string($varMadreB),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($operador),
            mysql_real_escape_string($valor),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($udMinima));
            
      }
      
   }
   
   elseif ($tipoDato=="5") { // % del TOTAL padre (en toda la Diócesis)
   
      if ($varMadre=="field_prq_est01_value" ||
          $varMadre=="field_prq_est27_value" ||
          $varMadre=="field_prq_est39_value" ) {
          
         $query = sprintf("SELECT %s,
                                  %s,
                                  SUM(%s)*100/ (
                                     SELECT SUM(%s)
                                     FROM content_type_parroquias
                                  ) AS TotalVariable 
                           FROM content_type_parroquias 
                           GROUP BY %s 
                           HAVING (%s) AND TotalVariable %s %s
                           ORDER BY
                              TotalVariable ASC, %s ASC, %s ASC",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadre),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($operador),
            mysql_real_escape_string($valor),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($udMinima));
      }
      
      else {
      
         $query = sprintf("SELECT %s,
                                  %s,
                                  SUM(%s)*100/ (
                                     SELECT (SUM(%s)+SUM(%s))
                                     FROM content_type_parroquias
                                  ) AS TotalVariable 
                           FROM content_type_parroquias 
                           GROUP BY %s 
                           HAVING (%s) AND TotalVariable %s %s
                           ORDER BY
                              TotalVariable ASC, %s ASC, %s ASC",
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($variable),
            mysql_real_escape_string($varMadreA),
            mysql_real_escape_string($varMadreB),
            mysql_real_escape_string($udMinima),
            mysql_real_escape_string($condArea),
            mysql_real_escape_string($operador),
            mysql_real_escape_string($valor),
            mysql_real_escape_string($idArea),
            mysql_real_escape_string($udMinima));
      
      }
      
   }
   
   elseif ($tipoDato=="6") {
   
      $query = sprintf("SELECT %s, %s,
                           SUM(field_prq_est17_value) AS Situacion1,
                           SUM(field_prq_est18_value) AS Situacion2,
                           SUM(field_prq_est19_value) AS Situacion3,
                           SUM(field_prq_est20_value) AS Situacion4,
                           SUM(field_prq_est21_value) AS Situacion5,
                           SUM(field_prq_est22_value) AS Situacion6,
                           SUM(field_prq_est23_value) AS Situacion7,
                           SUM(field_prq_est24_value) AS Situacion8,
                           SUM(field_prq_est25_value) AS Situacion9,
                           SUM(field_prq_est26_value) AS Situacion10
                        FROM content_type_parroquias 
                        GROUP BY %s
                        HAVING (%s) AND %s >= 0
                        ORDER BY
                            %s ASC, %s ASC", // "%s >= 0" para evitar los valores NULL
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($condArea),
         mysql_real_escape_string($udMinima),
         mysql_real_escape_string($idArea),
         mysql_real_escape_string($udMinima));
         
   }
   
}

// Recogemos los resultados de la consulta
$resultados = mysql_query($query);

if (!$resultados) {
  die("Error en la consulta a la base de datos: " . mysql_error());
}

header("Content-type: text/xml");

// Iteramos a través de cada registro de resultados, 
// añadiendo, para cada uno, los correspondientes nodos XML

if ($tipoDato=="1" || $tipoDato=="2" || $tipoDato=="3" || $tipoDato=="4" || $tipoDato=="5") {
   while ($row = @mysql_fetch_assoc($resultados)){
     $nodo = $dom->createElement("resultado");
     $nuevo_nodo = $nodo_padre->appendChild($nodo);
     $nuevo_nodo->setAttribute("id", $row[$udMinima]);
     $nuevo_nodo->setAttribute("id_area", $row[$idArea]);
     $nuevo_nodo->setAttribute("TotalVariable", $row['TotalVariable']);      
   }
}
elseif ($tipoDato=="6") {
   while ($row = @mysql_fetch_assoc($resultados)){ 
     $nodo = $dom->createElement("resultado");  
     $nuevo_nodo = $nodo_padre->appendChild($nodo);  
      $nuevo_nodo->setAttribute("id", $row[$udMinima]);
      $nuevo_nodo->setAttribute("id_area", $row[$idArea]);
      $nuevo_nodo->setAttribute("situacion1",$row['Situacion1']);
      $nuevo_nodo->setAttribute("situacion2",$row['Situacion2']);
      $nuevo_nodo->setAttribute("situacion3",$row['Situacion3']);
      $nuevo_nodo->setAttribute("situacion4",$row['Situacion4']);
      $nuevo_nodo->setAttribute("situacion5",$row['Situacion5']);
      $nuevo_nodo->setAttribute("situacion6",$row['Situacion6']);
      $nuevo_nodo->setAttribute("situacion7",$row['Situacion7']);
      $nuevo_nodo->setAttribute("situacion8",$row['Situacion8']);
      $nuevo_nodo->setAttribute("situacion9",$row['Situacion9']);
      $nuevo_nodo->setAttribute("situacion10",$row['Situacion10']);               
   }
}

echo $dom->saveXML();
?>


