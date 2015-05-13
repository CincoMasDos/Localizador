<?php  

require("phpsql_dbinfo.php"); 


// Tomamos de la URL el parámetro que nos indica el tipo de elemento a generar
$tipo = $_GET["tipo"];


// Iniciamos el archivo XML y creamos el nodo padre

$dom = new DOMDocument("1.0");
if ($tipo=="parroquias") {
	$nodo = $dom->createElement("parroquias");
}
elseif ($tipo=="arciprestazgos") {
	$nodo = $dom->createElement("arciprestazgos");
}
elseif ($tipo=="vicarias") {
	$nodo = $dom->createElement("vicarias");
}
elseif ($tipo=="comarcas") {
	$nodo = $dom->createElement("comarcas");
}
$nodo_padre = $dom->appendChild($nodo); 


// Abrimos la conexión con el servidor MySQL

$conexion = mysql_connect ($host, $username, $password);
if (!$conexion) {  die('No se ha conectado: ' . mysql_error());} 


// Establecemos la base de datos a utilizar

$db_selected = mysql_select_db($database, $conexion);
if (!$db_selected) {
  die ('No se puede usar la base de datos: ' . mysql_error());
} 


// Realizamos la consulta a la base de datos para generar los resultados 
// desde los que construiremos el XML

if ($tipo=="parroquias") {
	// En este caso, será content_type_parroquias añadiéndole algunos campos de la tabla
	// content_type_parroquias_geo.
	// Pero de todos los registros posibles, sólo nos interesarán los que tengan las coordenadas
	// de su demarcación (esto es, las que se pueden usar en el localizador, menos la sede diocesana)
	$query = "SELECT
							field_prq_id_value,
							field_prq_nombre_value,
							field_prq_geo_lat_value,
							field_prq_geo_lng_value,
							field_prq_geo_coordenadas_value
				 FROM content_type_parroquias 
				 LEFT OUTER JOIN (
				 	SELECT field_prq_geo_id_value,field_prq_geo_lat_value,field_prq_geo_lng_value,field_prq_geo_coordenadas_value
					FROM content_type_parroquias_geo
				 ) AS geo_parroquias
				 ON content_type_parroquias.field_prq_id_value = geo_parroquias.field_prq_geo_id_value 
				 WHERE field_prq_localizador_value = 1 AND field_prq_id_value <> 1";
}
elseif ($tipo=="arciprestazgos") {
	$query = "SELECT * FROM geo_arciprestazgos WHERE 1";
}
elseif ($tipo=="vicarias") {
	$query = "SELECT * FROM geo_vicarias WHERE 1";
}
elseif ($tipo=="comarcas") {
	$query = "SELECT * FROM geo_comarcas WHERE 1";
}


// Recogemos los resultados de la consulta

$resultados = mysql_query($query);
if (!$resultados) {  
  die('Error en la consulta a la base de datos: ' . mysql_error());
} 

header("Content-type: text/xml"); 


// Iteramos a través de cada registro, añadiendo para cada uno los correspondientes nodos XML

if ($tipo=="parroquias") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodoprq = $dom->createElement("parroquia");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodoprq);  
		$nuevo_nodo->setAttribute("id_parroquia",$row['field_prq_id_value']);
		$nuevo_nodo->setAttribute("nombre",utf8_encode($row['field_prq_nombre_value']));
		$nuevo_nodo->setAttribute("lat",$row['field_prq_geo_lat_value']);					
		$nuevo_nodo->setAttribute("lng",$row['field_prq_geo_lng_value']);
		$nuevo_nodo->setAttribute("coordenadas",$row['field_prq_geo_coordenadas_value']);
	} 
}
elseif ($tipo=="arciprestazgos") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodoarcip = $dom->createElement("arcip");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodoarcip);
	  	$nuevo_nodo->setAttribute("id",$row['id']);
	  	$nuevo_nodo->setAttribute("nombre",utf8_encode($row['nombre_arcip']));
	  	$nuevo_nodo->setAttribute("id_arcip",$row['id_arcip']);
	  	$nuevo_nodo->setAttribute("lat_etiqueta",$row['lat_etiqueta']);
	  	$nuevo_nodo->setAttribute("lng_etiqueta",$row['lng_etiqueta']);
	  	$nuevo_nodo->setAttribute("tipo_poli",$row['tipo_poli']);
	  	$nuevo_nodo->setAttribute("n_polis",$row['n_polis']);
	  	$nuevo_nodo->setAttribute("n_hijos",$row['n_hijos']);
	  	$nuevo_nodo->setAttribute("poli_padre",$row['poli_padre']);
		$nuevo_nodo->setAttribute("coordenadas",$row['coordinates']);
	} 
}
elseif ($tipo=="vicarias") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodovic = $dom->createElement("vicaria");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodovic);
	  	$nuevo_nodo->setAttribute("id",$row['id']);
	  	$nuevo_nodo->setAttribute("nombre",utf8_encode($row['nombre_vicaria']));
	  	$nuevo_nodo->setAttribute("id_vicaria",$row['id_vicaria']);
	  	$nuevo_nodo->setAttribute("lat_etiqueta",$row['lat_etiqueta']);
	  	$nuevo_nodo->setAttribute("lng_etiqueta",$row['lng_etiqueta']);
	  	$nuevo_nodo->setAttribute("tipo_poli",$row['tipo_poli']);
	  	$nuevo_nodo->setAttribute("n_polis",$row['n_polis']);
	  	$nuevo_nodo->setAttribute("n_hijos",$row['n_hijos']);
	  	$nuevo_nodo->setAttribute("poli_padre",$row['poli_padre']);
	  	$nuevo_nodo->setAttribute("coordenadas",$row['coordinates']);
	} 
}
elseif ($tipo=="comarcas") {
	while ($row = @mysql_fetch_assoc($resultados)){  
	  $nodocom = $dom->createElement("comarca");  
	  $nuevo_nodo = $nodo_padre->appendChild($nodocom);
	  	$nuevo_nodo->setAttribute("id",$row['id']);
	  	$nuevo_nodo->setAttribute("id_comarca",$row['id_comarca']);
	  	$nuevo_nodo->setAttribute("lat_etiqueta",$row['lat_etiqueta']);
	  	$nuevo_nodo->setAttribute("lng_etiqueta",$row['lng_etiqueta']);
	  	$nuevo_nodo->setAttribute("nombre",utf8_encode($row['nombre_comarca']));
	  	$nuevo_nodo->setAttribute("tipo_poli",$row['tipo_poli']);
	  	$nuevo_nodo->setAttribute("n_polis",$row['n_polis']);
	  	$nuevo_nodo->setAttribute("n_hijos",$row['n_hijos']);
	  	$nuevo_nodo->setAttribute("poli_padre",$row['poli_padre']);
		$nuevo_nodo->setAttribute("coordenadas",$row['coordinates']);
	} 
}


echo $dom->saveXML();

?>
